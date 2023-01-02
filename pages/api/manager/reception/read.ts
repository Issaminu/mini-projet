// This API is used to display all the Receptionists of a hotel
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  console.log('hotelid in reservation', hotelId);

  try {
    // then we use the hotel id, to get all the Receptionists that belongs to it
    const users = await prisma.user.findMany({
      where: {
        hotelId: Number(hotelId),
        role: Role.RECEPTION,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        hotelId: true,
        cin: true,
        phoneNumber: true,
      },
    });

    // then we send the Receptionists as an array of objects
    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    console.log('Users could not be found');
  }
}
