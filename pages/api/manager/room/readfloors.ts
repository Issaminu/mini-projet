import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';
import { User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;

  switch (req.method) {
    case 'GET':
      try {
        const floors = await prisma.floor.findMany({
          where: {
            hotelId: Number(hotelId),
          },
        });
        console.log(floors);

        res.status(200).json(floors);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Error accured' });
        console.log('Room Types could not be found');
      }

      break;

    default:
      res.status(404).json({ message: 'Not Found' });
      break;
  }
}
