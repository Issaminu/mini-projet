// This API is used for the Room  creation page
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';
const bcrypt = require('bcrypt');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { name, email, password, phoneNumber, cin, address } =
    req.body;
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  try {
    // then we simply insert the new receptionist to the DB
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
    // if there's an error, log it.
    console.log(error);

    console.log('User Creation Failed');
  }
}
