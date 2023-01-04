"use client";
import prisma from "../../../prisma/prisma";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atoms";
import { useEffect, useRef, useCallback, useState } from "react";
import axios from "axios";
import manager from "../page";
import SingleRoom from "../../../components/room/SingleRoom";

export default function Example() {
  const [user, setUser] = useRecoilState(userState);
  const [hotelData, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([
    // {
    //   id: null,
    //   number: null,
    //   floorId: null,
    //   typeId: null,
    // }
  ]);
  const hotelId = useRef(null);
  const getHotelInfo = useCallback(async () => {
    await axios
      .post("/api/manager/room/read", { hotelId: user.hotelId })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    getHotelInfo();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Rooms</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Rooms in the hotel and their state.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a
            type="button"
            href="/manager/room/addroom"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Room
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Floor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="x-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span>Last Update</span>
                    </th>
                    <th
                      scope="col"
                      className="x-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span>Creation Date</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room) => {
                    return <SingleRoom room={[room]} key={room.id} />;
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
