// This API is used to display, update and delete a receptionist based on the id given in the URL(aka dynamic route)
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the id of the Receptionists
  const userId = req.query.id;

  console.log(`Receptionist with id ${userId} is being ${req.method}ed`);

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // we get the Receptionist with the specified id
        const user = await prisma.user.findFirst({
          where: { id: Number(userId) },
        });

        // then we get all the reservations made by this Receptionist
        const reservations = await prisma.reservation.findMany({
          where: { userId: Number(userId) },
        });

        // finaly we send the Receptionist, and an array of all the reservations made by it
        res.status(200).json([user, reservations]);
      } catch (error) {
        console.log(error);

        console.log("User could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the data coming from the form
        const { name, email, password, phoneNumber, cin, hotelId } = req.body;

        // update the Receptionist concerned
        const user = await prisma.user.update({
          where: {
            id: Number(userId),
          },
          data: {
            name: name,
            email: email,
            password: await bcrypt.hash(password, 10),
            phoneNumber: phoneNumber,
            cin: cin,
            role: Role.RECEPTION,
            hotelId: hotelId,
            isReady: true,
          },
        });

        res.status(200).json(user);
      } catch (error) {
        console.log("User could not be updated");
      }
      break;

    // if the method is DELETE
    case "DELETE":
      try {
        // delete the Receptionist concerned
        const user = await prisma.user.delete({
          where: {
            id: Number(userId),
          },
        });

        res.status(200).json(user);
      } catch (error) {
        console.log("User could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
