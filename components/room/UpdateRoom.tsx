'use client';
import React, { useCallback } from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
import axios from 'axios';
// import { userState } from '../../../../store/atoms';
import { Floor, RoomType } from '@prisma/client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

//types
type roomTypeICreated = {
  number: number;
  id: number;
  type: {
    name: string;
    id: number;
  };
  floor: {
    id: number;
    number: number;
  };
};

type floorType = {
  id: number;
  number: number;
  name: string;
};

type roomTypeType = {
  id: number;
  name: string;
};

type propRoomtype = {
  room: roomTypeICreated;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

//i need to finish this page tomorrow
export default function page(props: {
  roomProps: {
    room: roomTypeICreated;
  };
}) {
  const roomNumber = useRef<HTMLInputElement>(null);
  const [selectedFloor, setSelectedFloor] = useState<floorType>();
  const [floorQuery, setFloorQuery] = useState('');
  const [roomQuery, setroomQuery] = useState('');
  const [roomTypes, setroomTypes] = useState<roomTypeType[]>([]);
  const [floors, setFloors] = useState<floorType[]>([]);
  const [selectedRoomType, setSelectedRoomType] =
    useState<roomTypeType>();

  const [buttonClickable, setbuttonClickable] = useState(true); //this is used fro the to be disabled when its clicked

  const [filteredFloors, setFilteredFloors] = useState([
    {
      id: props.roomProps.room.floor.id,
      number: props.roomProps.room.floor.number,
    },
  ]);

  useEffect(() => {
    setFilteredFloors(() => {
      return floorQuery === ''
        ? floors
        : floors.filter((floor) => {
            return String(floor.number)
              .toLowerCase()
              .includes(floorQuery.toLowerCase());
          });
    });
  }, [floorQuery]);

  const [filteredroomTypes, setFilteredroomTypes] = useState([
    {
      id: props.roomProps.room.type.id,
      name: props.roomProps.room.type.name,
    },
  ]);

  useEffect(() => {
    setFilteredroomTypes(() => {
      return roomQuery === ''
        ? roomTypes
        : roomTypes.filter((RoomType) => {
            return RoomType.name
              .toLowerCase()
              .includes(roomQuery.toLowerCase());
          });
    });
  }, [roomQuery]);

  useEffect(() => {
    setSelectedFloor({
      id: props.roomProps.room.floor.id,
      number: props.roomProps.room.floor.number,
      name: props.roomProps.room.floor.number + 'th',
    });
    setSelectedRoomType({
      id: props.roomProps.room.type.id,
      name: props.roomProps.room.type.name,
    });
  }, []);

  //this is the function that handles the update of the room
  const updateRoom = useCallback(async () => {
    setbuttonClickable(false);
    console.log(selectedFloor);

    if (
      roomNumber.current.value !== '' &&
      selectedFloor !== undefined &&
      selectedRoomType !== undefined
    ) {
      const room = {
        number: roomNumber.current.value,
        floorId: selectedFloor.id,
        typeId: selectedRoomType.id,
        id: props.roomProps.room.id,
      };
      axios
        .post('/api/manager/room/update/', room)
        .then((res) => {
          console.log(res.data);
          setbuttonClickable(true);
        })
        .catch((err) => {
          console.log(err);
          setbuttonClickable(true);
        });
    } else {
      setbuttonClickable(true);
    }
  }, [selectedFloor, selectedRoomType]);
  useEffect(() => {
    console.log(props.roomProps.room);
    //get room types when the page first renders
    axios
      .get('/api/manager/room/readtypes')
      .then((res) => {
        setroomTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //get floors when the page first renders
    axios
      .get('/api/manager/room/readfloors')
      .then((res) => {
        setFloors(
          res.data.map((floor) => {
            //just added a name property to the floor object
            if (floor.number === 1) {
              return {
                name: floor.number + 'st',
                number: floor.number,
                id: floor.id,
              };
            } else if (floor.number === 2) {
              return {
                name: floor.number + 'nd',
                number: floor.number,
                id: floor.id,
              };
            }
            return {
              name: floor.number + 'th',
              number: floor.number,
              id: floor.id,
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
            Update Room
          </h2>
        </div>
        <div>
          <p>
            Initail Values : Number : {props.roomProps.room.number} ,{' '}
          </p>
          <p>Floor {props.roomProps.room.floor.number} </p>
          <p>, Type{props.roomProps.room.type.name}</p>
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
                      displayValue={(Floor: floorType) =>
                        String(Floor.name)
                      }
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
                                    {Floor.number}Floor
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
                      displayValue={(RoomType: RoomType) =>
                        RoomType.name
                      }
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
                                      'ml-3 truncate',
                                      selected && 'font-semibold'
                                    )}
                                  >
                                    {RoomType.name}
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
                  onClick={updateRoom}
                  className={
                    buttonClickable
                      ? 'ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600'
                      : 'disabled ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-100'
                  }
                >
                  Update Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*
this page contains a lot of problems , like initail values dont show up

i will use useState to fix this problem instead of using useMemo

*/
