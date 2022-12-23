// This API is used for the room type  creation page
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { name, price, hotelId } = req.body;

  try {
    // then we simply insert the new room type to the DB
    const roomType = await prisma.roomType.create({
      data: {
        name: name,
        price: price,
        hotelId: hotelId,
      },
    });

    res.status(200).json(roomType);
  } catch (error) {
    // if there's an error, log it.
    console.log("Room type Creation Failed");
  }
}
