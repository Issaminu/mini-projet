// This API is used to display all the Floors of an hotel
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // here we store the hotel id
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  try {
    // then we use the hotel id, to get all the floors that belongs to it
    const floors = await prisma.floor.findMany({
      where: {
        hotelId: Number(hotelId),
      },
      select: {
        id: true,
        number: true,
        create_time: true,
      },
    });
    console.log('Floors found');

    console.log(floors);

    // then we send the floors as an array of objects
    res.status(200).json(floors);
  } catch (error) {
    console.log('Floors could not be found');
  }
}
