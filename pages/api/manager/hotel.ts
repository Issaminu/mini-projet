// This API is used for the Hotel's profile page, which will combine the display of data as well as the ability to update it
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, address, stars } = req.body;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // Store the info of the requested "hotel" in a const using the id
        const hotel = await prisma.hotel.findFirst({
          where: { id: Number(id) },
        });

        res.status(200).json(hotel);
      } catch (error) {
        console.log("Hotel could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // update the row of this hotel with the info sent by the form
        const hotel = await prisma.hotel.update({
          where: { id: Number(id) },
          data: {
            name,
            address,
            stars,
          },
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
