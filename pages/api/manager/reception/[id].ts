import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  switch (req.method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: { id: Number(userId) },
        });
        res.json(user);
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
            role: Role.RECEPTION,
            hotelId: hotelId,
            isReady: true,
          },
        });
        res.json(user);
      } catch (error) {
        console.log("User could not be updated");
      }
      break;

    case "DELETE":
      try {
        const user = await prisma.user.delete({
          where: {
            id: Number(userId),
          },
        });
        res.json(user);
      } catch (error) {
        console.log("User could not be deleted");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
