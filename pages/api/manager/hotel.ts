import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, address, stars } = req.body;

  switch (req.method) {
    case "GET":
      try {
        const hotel = await prisma.hotel.findUnique({
          where: { id: Number(id) },
        });

        const totalRooms = await prisma.room.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });

        const totalFloors = await prisma.floor.aggregate({
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

        res.json([hotel, totalRooms, totalFloors, roomTypes]);
      } catch (error) {
        console.log("hotel could not be found");
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

        res.json(hotel);
      } catch (error) {
        console.log("hotel could not be updated");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
