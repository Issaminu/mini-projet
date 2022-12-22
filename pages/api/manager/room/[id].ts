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
        const room = await prisma.room.findUnique({
          where: { id: Number(roomId) },
        });
        res.json(room);
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
            number,
            floorId,
            typeId,
            hotelId,
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
