// This API is used to display all the Rooms of an hotel
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const { hotelId } = req.body;

  try {
    // then we use the hotel id, to get all the rooms that belongs to it
    const rooms = await prisma.room.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });

    // then we send the rooms as an array of objects
    res.status(200).json(rooms);
  } catch (error) {
    console.log("Rooms could not be found");
  }
}
