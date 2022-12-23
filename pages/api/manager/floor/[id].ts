// This API is used to display, update and delete a floor based on the id given in the URL(aka dynamic route)
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the id of the floor
  const floorId = req.query.id;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // we get the floor with the specified id
        const floor = await prisma.floor.findFirst({
          where: { id: Number(floorId) },
        });

        // finaly we send the floor
        res.status(200).json(floor);
      } catch (error) {
        console.log("Floor could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the data coming from the form
        const { number, hotelId } = req.body;

        // update the floor concerned
        const floor = await prisma.floor.update({
          where: { id: Number(floorId) },
          data: {
            number: number,
            hotelId: hotelId,
          },
        });

        res.json(floor);
      } catch (error) {
        console.log("Floor could not be updated");
      }
      break;

    // if the method is DELETE
    case "DELETE":
      try {
        // delete the floor concerned
        const floor = await prisma.floor.delete({
          where: { id: Number(floorId) },
        });

        res.json(floor);
      } catch (error) {
        console.log("Floor could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
