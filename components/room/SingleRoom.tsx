import { Fragment, useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { signOut } from 'next-auth/react';
import { Floor, RoomType, Room } from '@prisma/client';
interface roomType extends Room {
  type: RoomType;
}

const singleRoom = (props: any) => {
  return (
    <Fragment>
      <tr key={props.room[0].id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {props.room[0].number}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{props.room[0].floorId}</div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {props.room[0].type.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {props.room[0].roomState
              ? props.room[0].roomState
              : 'Free'}
          </span>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a
            href={`/manager/room?roomId=${props.room[0].id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            See Details
            <span className="sr-only">
              ,{props.room[0].type.name}
            </span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};
export default singleRoom;
