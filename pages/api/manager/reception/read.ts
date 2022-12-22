// This API is used to display all the Receptionists of a hotel
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const { hotelId } = req.body;

  try {
    // then we use the hotel id, to get all the Receptionists that belongs to it
    const users = await prisma.user.findMany({
      where: {
        hotelId: Number(hotelId),
        role: Role.RECEPTION,
      },
    });

    // then we send the Receptionists as an array of objects
    res.status(200).json(users);
  } catch (error) {
    console.log("Users could not be found");
  }
}
