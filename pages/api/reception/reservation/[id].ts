// This API is used to display, update and delete a reservation based on the id given in the URL(aka dynamic route)
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the id of the reservation
  const reservationId = req.query.id;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // we get the reservation with the specified id
        const reservation = await prisma.reservation.findFirst({
          where: { id: Number(reservationId) },
        });

        // finaly we send the reservation
        res.status(200).json(reservation);
      } catch (error) {
        console.log("Reservation could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the data coming from the form
        const { clientId, userId, roomId, hotelId, checkIn, checkOut } =
          req.body;

        // update the reservation concerned
        const reservation = await prisma.reservation.update({
          where: { id: Number(reservationId) },
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
        console.log("Reservation could not be updated");
      }
      break;

    // if the method is DELETE
    case "DELETE":
      try {
        // delete the reservation concerned
        const reservation = await prisma.reservation.delete({
          where: {
            id: Number(reservationId),
          },
        });

        res.status(200).json(reservation);
      } catch (error) {
        console.log("Reservation could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
