// This API is used to display all the Reservations of an hotel
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const { hotelId } = req.body;

  try {
    // then we use the hotel id, to get all the reservations that belongs to it
    const reservations = await prisma.reservation.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });

    // then we send the floors as an array of objects
    if (reservations.length === 0) {
      return res.status(400).json({ message: "No reservations found" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.log("Floors could not be found");
  }
}
