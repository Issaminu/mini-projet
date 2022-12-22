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
        res.json(hotel);
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
