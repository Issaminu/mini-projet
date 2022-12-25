import { Floor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../prisma/prisma";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function hotelsAPI(
  req: NextApiRequest & NextRequestWithAuth,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token.user.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  switch (req.method) {
    case "PUT":
      try {
        const { name, address, starCount, roomTypes, floors, roomCount } =
          req.body;
        const hotel = await prisma.hotel.create({
          data: {
            name: name,
            address: address,
            stars: parseInt(starCount),
          },
        });
        let tempRoomType = {};
        let tempRoomTypes = [];

        for (const roomType of roomTypes) {
          tempRoomType = await prisma.roomType.create({
            data: {
              name: roomType.name,
              price: parseFloat(roomType.price),
              hotelId: hotel.id,
            },
          });
          tempRoomTypes.push(tempRoomType);
        }

        let tempFloor: Floor;
        for (const floor of floors) {
          tempFloor = await prisma.floor.create({
            data: {
              number: parseInt(floor.name),
              hotelId: hotel.id,
            },
          });
          floor.savedRoomId = tempFloor.id;
        }
        let rooms = [];
        for (const floor of floors) {
          for (const roomType of tempRoomTypes) {
            if (roomType.name === floor.roomType) {
              floor.roomTypeId = roomType.id;
              break;
            }
          }
          for (let i = 0; i < parseInt(roomCount); i++) {
            rooms.push({
              number: (parseInt(floor.name) - 1) * roomCount + (i + 1),
              floorId: parseInt(floor.savedRoomId),
              typeId: parseInt(floor.roomTypeId),
              hotelId: hotel.id,
            });
          }
          await prisma.room.createMany({
            data: rooms,
          });
        }
        res.status(200).send({ message: "Hotel created successfully." });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "Hotel could not be added.", error: error });
      }
      break;

    default:
      res
        .status(500)
        .send({ message: `Error: Invalid method (${req.method})` });
  }
}
