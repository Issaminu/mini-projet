// This API is used for the Floor  creation page
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { number, hotelId } = req.body;

  try {
    // then we simply insert the new floor to the DB
    const floor = await prisma.floor.create({
      data: {
        number: number,
        hotelId: hotelId,
      },
    });

    res.status(200).json(floor);
  } catch (error) {
    // if there's an error, log it.
    console.log("Floor Creation Failed");
  }
}
