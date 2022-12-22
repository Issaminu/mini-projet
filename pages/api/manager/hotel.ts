import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, address, stars, totalFloors, totalRoomTypes } = req.body;

  switch (req.method) {
    case "GET":
      try {
        const hotel = await prisma.hotel.findFirst({
          where: { id: Number(id) },
        });

        const numberRooms = await prisma.room.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });

        const numberFloors = await prisma.floor.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });

        const roomTypes = await prisma.roomType.findMany({
          where: {
            hotelId: Number(id),
          },
        });

        res.json([hotel, numberRooms, numberFloors, roomTypes]);
      } catch (error) {
        console.log("Hotel could not be found");
      }
      break;

    case "POST":
      try {
        const hotel = await prisma.hotel.update({
          where: { id: Number(id) },
          data: {
            name,
            address,
            stars,
          },
        });

        const numberFloors = await prisma.floor.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });
        for (let i = Number(numberFloors) + 1; i <= Number(totalFloors); i++) {
          await prisma.floor.create({
            data: {
              number: i,
              hotelId: id,
            },
          });
        }

        totalRoomTypes.array.forEach((roomType) => {
          if (!!prisma.roomType.findFirst({ where: { id: roomType.id } })) {
            prisma.roomType.update({
              where: {
                id: Number(roomType.id),
              },
              data: {
                name: roomType.name,
                price: roomType.price,
                hotelId: roomType.hotelId,
              },
            });
          } else {
            prisma.roomType.create({
              data: {
                name: roomType.name,
                price: roomType.price,
                hotelId: roomType.hotelId,
              },
            });
          }
        });

        res.status(200).json(hotel);
      } catch (error) {
        console.log("Hotel could not be updated");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
