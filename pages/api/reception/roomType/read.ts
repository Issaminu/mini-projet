// This API is used to display all the room types of an hotel
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const { hotelId } = req.body;

  try {
    // then we use the hotel id, to get all the room types that belongs to it
    const roomTypes = await prisma.roomType.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });

    // then we send the room types as an array of objects
    res.status(200).json(roomTypes);
  } catch (error) {
    console.log("Room types could not be found");
  }
}
