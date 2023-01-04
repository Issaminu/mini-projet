import { Floor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../prisma/prisma";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function hotelsAPI(
  req: NextApiRequest & NextRequestWithAuth,
  res: NextApiResponse
) {
  const user = (await getToken({ req })).user;
  if (!user) {
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
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            hotelId: hotel.id,
            isReady: true,
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
        for (const floor of floors) {
          let rooms = [];
          for (const roomType of tempRoomTypes) {
            if (roomType.name === floor.roomType) {
              floor.roomTypeId = roomType.id;
              break;
            }
          }
          for (let i = 0; i < parseInt(roomCount); i++) {
            rooms.push({
              number:
                (parseInt(floor.name) - 1) * parseInt(roomCount) + (i + 1),
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
    case "PATCH":
      try {
        const {
          hotelId,
          name,
          address,
          starCount,
          roomTypes,
          floors,
          roomCount,
        } = req.body;
        const hotel = await prisma.hotel.update({
          where: {
            id: hotelId,
          },
          data: {
            name: name,
            address: address,
            stars: parseInt(starCount),
          },
        });
        let tempRoomType = {};
        let tempRoomTypes = [];

        for (const roomType of roomTypes) {
          tempRoomType = await prisma.roomType.updateMany({
            where: {
              hotelId: hotelId,
              id: roomType.id,
            },
            data: {
              name: roomType.name,
              price: parseFloat(roomType.price),
            },
          });
          tempRoomTypes.push(tempRoomType);
        }

        let tempFloor;
        for (const floor of floors) {
          tempFloor = await prisma.floor.updateMany({
            where: {
              id: floor.id,
              hotelId: hotelId,
            },
            data: {
              number: parseInt(floor.number),
            },
          });
          floor.savedRoomId = tempFloor.id;
        }
        for (const floor of floors) {
          let rooms = [];
          for (const roomType of tempRoomTypes) {
            if (roomType.name === floor.roomType) {
              floor.roomTypeId = roomType.id;
              break;
            }
          }
          for (let i = 0; i < parseInt(roomCount); i++) {
            rooms.push({
              number:
                (parseInt(floor.name) - 1) * parseInt(roomCount) + (i + 1),
              floorId: parseInt(floor.savedRoomId),
              typeId: parseInt(floor.roomTypeId),
              hotelId: hotel.id,
            });
          }
        }
        res.status(200).send({ message: "Hotel updated successfully." });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "Hotel could not be updated.", error: error });
      }
      break;
    default:
      res
        .status(500)
        .send({ message: `Error: Invalid method (${req.method})` });
  }
}
