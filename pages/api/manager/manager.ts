// This API is used for the Manager's profile page, which will combine the display of data as well as the ability to update it
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // this const stores the logged in user's id which comes from react
  const { userId, name, email, password, phoneNumber, cin, hotelId } = req.body;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // Store the info of the requested user in the "user" const using the id
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        });
        // then send the fetched user object to react
        res.status(200).json(user);
      } catch (error) {
        // in case of an error, log it
        console.log("User could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // then update the row of this user with the info
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
            role: Role.MANAGER,
            hotelId: hotelId,
            isReady: true,
          },
        });

        res.status(200).json(user);
      } catch (error) {
        // in case of an error, log it
        console.log("User could not be updated");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
