'use client';
import prisma from '../../../prisma/prisma';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/atoms';
import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import manager from '../page';
import SingleFloor from '../../../components/room/floor/SingleFloor';
type floortype = {
  id: number;
  number: number;
  create_time: string;
};

export default function Page() {
  const [areInputsValid, setAreInputsValid] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [floors, setfloors] = useState<[floortype]>([
    {
      id: 0,
      number: 0,
      create_time: '200/20002',
    },
  ]);
  const hotelId = useRef(null);
  const getHotelInfo = useCallback(async () => {
    await axios
      .post('/api/manager/floor/read')
      .then((res) => {
        setfloors(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const addfloor = useCallback(async () => {
    setAreInputsValid(false);
    await axios
      .post('/api/manager/floor/create')
      .then((res) => {
        console.log(res.data);
        setAreInputsValid(true);
      })
      .catch((err) => {
        setAreInputsValid(true);
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
            Reception
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all Receptions in your hotel
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className={
              areInputsValid
                ? 'ml-3 mt-3 inline-flex w-full md:w-32 justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600'
                : 'disabled ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-100'
            }
            onClick={addfloor}
          >
            Add Floor
          </button>
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
                      id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      created time
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
                  {floors.map((floor) => {
                    return <SingleFloor floor={floor} />;
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
