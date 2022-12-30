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
  const { id, number, floorId, typeId } = req.body;
  const user = (await (await getToken({ req })).user) as User;
  const hotelId = user.hotelId;
  console.log('jfankfajfbausjk');
  console.log(number, floorId, typeId, hotelId);

  try {
    // then we simply insert the new room to the DB
    if (!number || !floorId || !typeId || !hotelId) {
      return res.status(400).json({ message: 'Missing data' });
    }

    //TO DO: check if the room number already exists in the hotel
    const ExistingRomms = await prisma.room.findFirst({
      where: {
        number: Number(number),
        floorId: Number(floorId),
        hotelId: Number(hotelId),
      },
    });

    if (ExistingRomms) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    //TO DO: check if the floor exists in the hotel

    const room = await prisma.room
      .update({
        where: {
          id: Number(id),
        },
        data: {
          number: Number(number),
          floorId: Number(floorId),
          typeId: Number(typeId),
          hotelId: Number(hotelId),
        },
      })
      .then((room) => {
        console.log(room);
        console.log('Room updated');
      });

    res.status(200).json(room);
  } catch (error) {
    // if there's an error, log it.
    console.log(error);
    console.log('Room Update Failed');
  }
}
