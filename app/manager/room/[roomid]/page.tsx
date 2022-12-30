import React, { Fragment } from 'react';
import prisma from '../../../../prisma/prisma';
import { Room, RoomType } from '@prisma/client';
import ClientCompenent from '../../../../components/room/ClientCompenent';
// import { userState } from '../../../../store/atoms';
// import { useRecoilValue } from 'recoil';

const getRoomData = async (roomId: Number) => {
  const rooms = await prisma.room
    .findUnique({
      where: {
        id: Number(roomId),
      },
      select: {
        id: true,
        number: true,
        floor: {
          select: {
            id: true,
            number: true,
          },
        },
        type: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
  return rooms;
};

// this is dosent work beacause "recoil works only in client "
// const getFloors = async (hotelId: number) => {
//   const floors = await prisma.floor.findMany({
//     where: {
//       hotelId: hotelId,
//     },
//     select: {
//       id: true,
//       number: true,
//     },
//   });
//   return floors;
// };

// const getRoomTypes = async (hotelId: number) => {
//   const roomTypes = await prisma.roomType.findMany({
//     where: {
//       hotelId: hotelId,
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   return roomTypes;
// };

interface roomType extends Room {
  type: RoomType;
}

//this is a type that a created ,beacause there is another type that extends Room and RoomType
type roomTypeICreated = {
  number: number;
  id: number;
  type: {
    name: string;
    id: number;
  };
  floor: {
    id: number;
    number: number;
  };
};

// this is dosent work beacause "recoil works only in client "
// type floorType = {
//   id: number;
//   number: number;
// };

// type roomTypeType = {
//   id: number;
//   name: string;
// };

type propRoom = {
  room: roomTypeICreated;
};

const RoomId = async ({ params }: { params: { roomid: string } }) => {
  // const user = useRecoilValue(userState);

  const room: roomTypeICreated = await getRoomData(
    Number(params.roomid)
  );
  // const floors: floorType[] = await getFloors(Number(1));
  // const roomTypes: roomTypeType[] = await getRoomTypes(Number(1));

  const roomProps: propRoom = {
    room: room,
  };

  return (
    <Fragment>
      <ClientCompenent roomProps={roomProps} />
    </Fragment>
  );
};

export default RoomId;
