import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { number, floorId, typeId, hotelId } = req.body;

  try {
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
    console.log("Room Creation Failed");
  }
}
