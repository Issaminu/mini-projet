// This API is used to display, update and delete a room based on the id given in the URL(aka dynamic route)
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the id of the room
  const roomId = req.query.id;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // we get the room with the specified id
        const room = await prisma.room.findFirst({
          where: { id: Number(roomId) },
        });

        // then we get all the reservations history of this room
        const reservations = await prisma.reservation.findMany({
          where: { roomId: Number(roomId) },
        });

        // finaly we send the room, and an array of all the reservations of it
        res.status(200).json([room, reservations]);
      } catch (error) {
        console.log("Room could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the data coming from the form
        const { number, floorId, typeId, hotelId } = req.body;

        // update the room concerned
        const room = await prisma.room.update({
          where: { id: Number(roomId) },
          data: {
            number: number,
            floorId: floorId,
            typeId: typeId,
            hotelId: hotelId,
          },
        });

        res.status(200).json(room);
      } catch (error) {
        console.log("Room could not be updated");
      }
      break;

    // if the method is DELETE
    case "DELETE":
      try {
        // delete the room concerned
        const room = await prisma.room.delete({
          where: { id: Number(roomId) },
        });

        res.status(200).json(room);
      } catch (error) {
        console.log("Room could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
