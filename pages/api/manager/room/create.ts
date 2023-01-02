// This API is used for the Room  creation page
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const { number, floorId, typeId } = req.body;
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;
  console.log(number, floorId, typeId, hotelId);

  try {
    // then we simply insert the new room to the DB
    if (!number || !floorId || !typeId) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const room = await prisma.room.create({
      data: {
        number: Number(number),
        floorId: Number(floorId),
        typeId: Number(typeId),
        hotelId: Number(hotelId),
      },
    });

    res.status(200).json(room);
  } catch (error) {
    // if there's an error, log it.
    console.log(error);
    console.log('Room Creation Failed');
  }
}
