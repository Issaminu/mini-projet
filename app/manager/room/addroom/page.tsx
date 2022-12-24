'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import { userState } from '../../../../store/atoms';
import { useRecoilState } from 'recoil';
export default function page() {
  const [user, setUser] = useRecoilState(userState);
  const [hotelData, setHotelData] = useState(null);
  const roomName = useRef(null);
  const roomNumber = useRef(null);
  const roomType = useRef(null);
  const roomFloor = useRef(null);
  const createRoom = useCallback(async () => {
    axios
      .post('/api/manager/room/create', {
        hotelId: user.hotelId,
        floorId: roomFloor.current.value,
        number: roomNumber.current.value,
        typeId: roomType.current.value,
      })
      .then((res) => {
        console.log('succefully created');
        console.log(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new Room
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="roomNmae"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    name="roomName"
                    type="text"
                    ref={roomName}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Number
                </label>
                <div className="mt-1">
                  <input
                    name="roomNumber"
                    type="number"
                    ref={roomNumber}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="roomFloor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Floor{' '}
                </label>
                <div className="mt-1">
                  <input
                    name="roomFloor"
                    type="number"
                    ref={roomFloor}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="roomType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Type{' '}
                </label>
                <div className="mt-1">
                  <input
                    name="roomType"
                    type="text"
                    ref={roomType}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={createRoom}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
