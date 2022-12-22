import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hotelId } = req.body;

  try {
    const users = await prisma.user.findMany({
      where: {
        hotelId: hotelId,
        role: Role.RECEPTION,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("Users could not be found");
  }
}
