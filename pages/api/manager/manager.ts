import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  switch (req.method) {
    case "GET":
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        });

        res.status(200).json(user);
      } catch (error) {
        console.log("User could not be found");
      }
      break;

    case "POST":
      try {
        const { name, email, password, phoneNumber, cin, hotelId } = req.body;

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
        console.log("User could not be updated");
      }
      break;

    default:
      console.log();
  }
}
