'use client';
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';
import axios from 'axios';
import { userState } from '../../../../store/atoms';
import { useRecoilState } from 'recoil';
import { Floor, RoomType } from '@prisma/client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Room from '../../../../components/Hotels/Hotel';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface floorType extends Floor {
  name: string;
}

//i need to finish this page tomorrow
export default function page() {
  const [hotelData, setHotelData] = useState(null);
  const [roomQuery, setroomQuery] = useState('');
  const [floorQuery, setFloorQuery] = useState('');
  const [selectedRoomType, setSelectedRoomType] =
    useState<RoomType>();
  const [selectedFloor, setSelectedFloor] = useState<floorType>();
  const [areInputsValid, setAreInputsValid] = useState(true);
  const name = useRef(null);
  const price = useRef(null);

  const createFloor = useCallback(async () => {
    setAreInputsValid(false);

    axios
      .post('/api/manager/roomType/create', {
        name: name.current.value,
        price: price.current.value,
      })
      .then((res) => {
        setAreInputsValid(true);
      })
      .catch((err) => {
        setAreInputsValid(true);
        return err;
      });
  }, [selectedFloor, selectedRoomType]);

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new Room type
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    name="roomNumber"
                    type="text"
                    ref={name}
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
                  Price
                </label>
                <div className="mt-1">
                  <input
                    name="roomNumber"
                    type="text"
                    ref={price}
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
                  Discription
                </label>
                <div className="mt-1">
                  <input
                    name="roomNumber"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={createFloor}
                  className={
                    areInputsValid
                      ? 'ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600'
                      : 'disabled ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-100'
                  }
                >
                  Add Room Type
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
