// This API is used to display, update and delete a room type based on the id given in the URL(aka dynamic route)
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the id of the roomType
  const roomTypeId = req.query.id;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // we get the roomType with the specified id
        const roomType = await prisma.roomType.findFirst({
          where: { id: Number(roomTypeId) },
        });

        // finaly we send the roomType
        res.status(200).json(roomType);
      } catch (error) {
        console.log("Room type could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the data coming from the form
        const { name, price, hotelId } = req.body;

        // update the roomType concerned
        const roomType = await prisma.roomType.update({
          where: { id: Number(roomTypeId) },
          data: {
            name: name,
            price: price,
            hotelId: hotelId,
          },
        });

        res.status(200).json(roomType);
      } catch (error) {
        console.log("Room type could not be updated");
      }
      break;

    // if the method is DELETE
    case "DELETE":
      try {
        // delete the roomType concerned
        const roomType = await prisma.roomType.delete({
          where: { id: Number(roomTypeId) },
        });

        res.json(roomType);
      } catch (error) {
        console.log("Room type could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
