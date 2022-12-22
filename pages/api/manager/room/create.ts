// This API is used for the Room  creation page
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { number, floorId, typeId, hotelId } = req.body;

  try {
    // then we simply insert the new room to the DB
    const room = await prisma.room.create({
      data: {
        number: number,
        floorId: floorId,
        typeId: typeId,
        hotelId: hotelId,
      },
    });

    res.status(200).json(room);
  } catch (error) {
    // if there's an error, log it.
    console.log("Room Creation Failed");
  }
}
