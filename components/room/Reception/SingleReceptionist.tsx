import { Fragment, useState, useEffect, useCallback } from "react";

import axios from "axios";
import { signOut } from "next-auth/react";
import { RoomType, Room } from "@prisma/client";
type Receptiontype = {
  id: number;
  name: string;
  email: string;
  cin: string;
  phoneNumber: string;
  isReady: boolean;
};

const singleRoom = (props: { user: [Receptiontype] }) => {
  return (
    <Fragment>
      <tr key={props.user[0].id}>
        <td className="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {props.user[0].name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
          <div className="text-gray-900">{props.user[0].cin}</div>
        </td>

        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
          {props.user[0].phoneNumber}
        </td>
        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
            {props.user[0].isReady ? "Ready" : "Active"}
          </span>
        </td>
        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
          <a
            href={`/manager/reservation/${props.user[0].id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            See Details
            <span className="sr-only">{/* ,{props.room[0].type.name} */}</span>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};
export default singleRoom;
