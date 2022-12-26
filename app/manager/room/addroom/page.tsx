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
import { User } from '@prisma/client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

//i need to finish this page tomorrow
export default function page() {
  const [user, setUser] = useRecoilState(userState);
  const [hotelData, setHotelData] = useState(null);
  const [roomQuery, setroomQuery] = useState('');
  const [floorQuery, setFloorQuery] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState();
  const [selectedFloor, setSelectedFloor] = useState();
  const [roomTypes, setroomTypes] = useState([]);
  const [floors, setFloors] = useState([]);
  const roomName = useRef(null);
  const roomNumber = useRef(null);
  const roomType = useRef(null);
  const roomFloor = useRef(null);

  const filteredroomTypes = useMemo(() => {
    return roomQuery === ''
      ? roomTypes
      : roomTypes.filter((RoomType) => {
          return RoomType.name
            .toLowerCase()
            .includes(roomQuery.toLowerCase());
        });
  }, [roomQuery]);
  const filteredFloors = useMemo(() => {
    return floorQuery === ''
      ? floors
      : floors.filter((floor) => {
          return floor.name
            .toLowerCase()
            .includes(floorQuery.toLowerCase());
        });
  }, [floorQuery]);
  const createRoom = useCallback(async () => {
    axios
      .post('/api/manager/room/create', {
        number: roomNumber.current.value,
        floorId: roomFloor.current.value,
        typeId: roomType.current.value,
        hotelId: user.hotelId,
      })
      .then((res) => {
        console.log('Succefully created');
        console.log(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);
  useEffect(() => {
    axios
      .get('/api/manager/room/readtypes')
      .then((res) => {
        setroomTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('/api/manager/room/readfloors')
      .then((res) => {
        setFloors(
          res.data.map((floor) => {
            if (floor.number === 1) {
              return {
                name: floor.number + 'st',
                number: floor.number,
              };
            } else if (floor.number === 2) {
              return {
                name: floor.number + 'nd',
                number: floor.number,
              };
            }
            return {
              name: floor.number + 'th',
              number: floor.number,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
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
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number
                </label>
                <div className="mt-1">
                  <input
                    name="roomNumber"
                    type="text"
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
                  Room Floor
                </label>
                <Combobox
                  as="div"
                  value={selectedFloor}
                  onChange={setSelectedFloor}
                >
                  <div className="relative mt-1">
                    <Combobox.Input
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) =>
                        setFloorQuery(event.target.value)
                      }
                      displayValue={(Floor) => Floor.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    {filteredFloors.length > 0 && (
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredFloors.map((Floor) => (
                          <Combobox.Option
                            key={Floor.id}
                            value={Floor}
                            className={({ active }) =>
                              classNames(
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900'
                              )
                            }
                          >
                            {({ active, selected }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(
                                      'ml-3 truncate',
                                      selected && 'font-semibold'
                                    )}
                                  >
                                    {Floor.name}Floor
                                  </span>
                                </div>

                                {selected && (
                                  <span
                                    className={classNames(
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                      active
                                        ? 'text-white'
                                        : 'text-indigo-600'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}
                  </div>
                </Combobox>
              </div>
              <div>
                <label
                  htmlFor="roomType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Type{' '}
                </label>
                <Combobox
                  as="div"
                  value={selectedRoomType}
                  onChange={(value) => {
                    setSelectedRoomType(value);
                  }}
                >
                  <div className="relative mt-1">
                    <Combobox.Input
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) =>
                        setroomQuery(event.target.value)
                      }
                      displayValue={(RoomType) => RoomType.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    {filteredroomTypes.length > 0 && (
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredroomTypes.map((RoomType) => (
                          <Combobox.Option
                            key={RoomType.id}
                            value={RoomType}
                            className={({ active }) =>
                              classNames(
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900'
                              )
                            }
                          >
                            {({ active, selected }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                                      RoomType.online
                                        ? 'bg-green-400'
                                        : 'bg-gray-200'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(
                                      'ml-3 truncate',
                                      selected && 'font-semibold'
                                    )}
                                  >
                                    {RoomType.name}
                                    <span className="sr-only">
                                      {' '}
                                      is{' '}
                                      {RoomType.online
                                        ? 'online'
                                        : 'offline'}
                                    </span>
                                  </span>
                                </div>

                                {selected && (
                                  <span
                                    className={classNames(
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                      active
                                        ? 'text-white'
                                        : 'text-indigo-600'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}
                  </div>
                </Combobox>
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
