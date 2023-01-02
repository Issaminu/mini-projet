// This API is used for the Floor  creation page
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in this const we store the data coming from the form
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  try {
    let lastFloor = await prisma.floor.findFirst({
      where: {
        hotelId: Number(hotelId),
      },
      orderBy: {
        number: 'desc',
      },
      select: {
        number: true,
      },
    });
    if (!lastFloor) {
      lastFloor = {
        number: 0,
      };
    }
    const floor = await prisma.floor.create({
      data: {
        number: Number(lastFloor.number) + 1,
        hotelId: hotelId,
      },
    });

    res.status(200).json({ floor: floor, message: 'Floor Created' });
  } catch (error) {
    // if there's an error, log it.
    console.log(error);

    console.log('Floor Creation Failed');
  }
}
