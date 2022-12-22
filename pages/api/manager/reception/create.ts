import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, phoneNumber, cin, hotelId } = req.body;

  try {
    const user = await prisma.user.create({
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
    console.log("User Creation Failed");
  }
}
