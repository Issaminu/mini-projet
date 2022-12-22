import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const roomId = req.query.id;

  switch (req.method) {
    case "GET":
      try {
        const room = await prisma.room.findFirst({
          where: { id: Number(roomId) },
        });

        const reservations = await prisma.reservation.findMany({
          where: { roomId: Number(roomId) },
        });

        res.status(200).json([room, reservations]);
      } catch (error) {
        console.log("Room could not be found");
      }
      break;

    case "POST":
      try {
        const { number, floorId, typeId, hotelId } = req.body;

        const room = await prisma.room.update({
          where: { id: Number(roomId) },
          data: {
            number: number,
            floorId: floorId,
            typeId: typeId,
            hotelId: hotelId,
          },
        });

        res.json(room);
      } catch (error) {
        console.log("Room could not be updated");
      }
      break;

    case "DELETE":
      try {
        const room = await prisma.room.delete({
          where: { id: Number(roomId) },
        });

        res.json(room);
      } catch (error) {
        console.log("Room could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
