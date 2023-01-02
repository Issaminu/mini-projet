// This API is used for the room type  creation page
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { name, price } = req.body;
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  try {
    // then we simply insert the new room type to the DB
    const roomType = await prisma.roomType.create({
      data: {
        name: name,
        price: Number(price),
        hotelId: hotelId,
      },
    });
    console.log('roomType created successfully');

    res.status(200).json(roomType);
  } catch (error) {
    // if there's an error, log it.
    console.log(error);

    console.log('Room type Creation Failed');
  }
}
