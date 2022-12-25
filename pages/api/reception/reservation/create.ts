// This API is used for the reservation creation page
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { clientId, userId, roomId, hotelId, checkIn, checkOut } = req.body;

  try {
    // then we simply insert the new reservation to the DB
    if (!clientId || !userId || !roomId || !hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing data" });
    }
    const reservation = await prisma.reservation.create({
      data: {
        clientId: Number(clientId),
        userId: Number(userId),
        roomId: Number(roomId),
        hotelId: Number(hotelId),
        checkIn: checkIn,
        checkOut: checkOut,
      },
    });

    res.status(200).json(reservation);
  } catch (error) {
    // if there's an error, log it.
    console.log(error);
    console.log("Reservation Creation Failed");
  }
}
