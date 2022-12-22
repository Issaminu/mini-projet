import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hotelId } = req.body;

  try {
    const rooms = await prisma.room.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });

    res.status(200).json(rooms);
  } catch (error) {
    console.log("Rooms could not be found");
  }
}
