import { Fragment, useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { signOut } from 'next-auth/react';
import { RoomType, Room } from '@prisma/client';
type roomtypetype = {
  id: number;
  name: string;
  price: string;
};

const singleRoom = (props: { roomtype: roomtypetype }) => {
  return (
    <Fragment>
      <tr key={props.roomtype.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {props.roomtype.name}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{props.roomtype.price}</div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {props.roomtype.price}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {props.roomtype.price ? 'Ready' : 'Not yet'}
          </span>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a
            href={`/manager/reservation/${props.roomtype.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            See Details
            <span className="sr-only">
              {/* ,{props.room[0].type.name} */}
            </span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};
export default singleRoom;
