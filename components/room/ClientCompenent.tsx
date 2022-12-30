'use client';
import React from 'react';
import UpdateRoom from './UpdateRoom';
import { Room, Floor } from '@prisma/client';

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

type floorType = {
  id: number;
  number: number;
};

type roomTypeType = {
  id: number;
  name: string;
};

type propRoomtype = {
  room: roomTypeICreated;
};

const ClientCompenent = (props: { roomProps: propRoomtype }) => {
  return (
    <div>
      <UpdateRoom roomProps={props.roomProps} />
    </div>
  );
};

export default ClientCompenent;
