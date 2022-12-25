import { Fragment, useState, useCallback } from "react";

import axios from "axios";
import { signOut } from "next-auth/react";
import roomId from "../../app/manager/room/[roomId]";

const singleRoom = (props) => {
  return (
    <Fragment>
      <tr key={props.room.number}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {props.room.number}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{props.room.floorId}</div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {props.room.typeId}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {props.room.roomState ? props.room.roomState : "Free"}
          </span>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a href="" className="text-indigo-600 hover:text-indigo-900">
            See Details
            <span className="sr-only">, {props.room.type}</span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};
export default singleRoom;
