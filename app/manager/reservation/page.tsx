"use client";
import prisma from "../../../prisma/prisma";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atoms";
import { useEffect, useRef, useCallback, useState } from "react";
import axios from "axios";
import manager from "../page";
import SingleReceptionist from "../../../components/room/Reception/SingleReceptionist";
type receptiontype = {
  id: number;
  email: string;
  name: string;
  role: string;
  hotelId: number;
  cin: string;
  phoneNumber: string;
  isReady: boolean;
};

export default function Page() {
  const [user, setUser] = useRecoilState(userState);
  const [hotelData, setHotelData] = useState(null);
  const [users, setusers] = useState<[receptiontype]>([
    {
      id: 0,
      email: "",
      name: "",
      role: "",
      hotelId: 0,
      cin: "",
      phoneNumber: "",
      isReady: false,
    },
  ]);
  const hotelId = useRef(null);
  const getHotelInfo = useCallback(async () => {
    await axios
      .post("/api/manager/reception/read", { hotelId: user.hotelId })
      .then((res) => {
        setusers(res.data);
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
          <h1 className="text-xl font-semibold text-gray-900">Reception</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all Receptions in your hotel
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a
            type="button"
            href="/manager/reservation/addreception"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Receptionist
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CIN
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone Number
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => {
                    return <SingleReceptionist user={[user]} key={user.id} />;
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
