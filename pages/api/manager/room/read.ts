// This API is used to display all the Rooms of an hotel
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
    // then we use the hotel id, to get all the rooms that belongs to it
    // const rooms = await prisma.room.findMany({
    //   where: {
    //     hotelId: Number(hotelId),
    //   },
    // });
    //i want left join room with room type

    const rooms = await prisma.room.findMany({
      where: {
        hotelId: Number(hotelId),
      },
      select: {
        id: true,
        number: true,
        type: {
          select: {
            id: true,
            name: true,
          },
        },
        floorId: true,
      },
    });

    // then we send the rooms as an array of objects
    if (rooms.length === 0) {
      console.log(rooms);

      return res.status(400).json({ message: 'No rooms found' });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    console.log('Rooms could not be found');
  }
}
