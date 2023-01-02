'use client';
import prisma from '../../../prisma/prisma';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/atoms';
import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import manager from '../page';
import SingleRoomType from '../../../components/room/roomtype/SingleRoomType';
type roomtypetype = {
  id: number;
  name: string;
  price: string;
};

export default function Page() {
  const [user, setUser] = useRecoilState(userState);
  const [hotelData, setHotelData] = useState(null);
  const [roomtypes, setRoomTypes] = useState<[roomtypetype]>([
    {
      id: 0,

      name: 'Loading...',

      price: 'Loading...',
    },
  ]);
  const hotelId = useRef(null);
  const getHotelInfo = useCallback(async () => {
    await axios
      .post('/api/manager/roomType/read', { hotelId: user.hotelId })
      .then((res) => {
        setRoomTypes(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    getHotelInfo();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Room types
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all Room types in your hotel
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a
            type="button"
            href="/manager/type/addroomtype"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Room Type
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {roomtypes.map((roomtype) => {
                    return (
                      <SingleRoomType
                        key={roomtype.id}
                        roomtype={roomtype}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
