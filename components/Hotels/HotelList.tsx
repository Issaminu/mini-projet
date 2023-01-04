"use client";

import { useCallback, useEffect, useState } from "react";
import { FilterIcon, SearchIcon } from "@heroicons/react/solid";
import Hotel from "./Hotel";
import Link from "next/link";
import { SendableHotelType } from "../../app/admin/page";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hotels = (props) => {
  const directory: SendableHotelType[] = props.hotels;
  const [hotelListOpen, setHotelListOpen] = useState(true);
  const [roomOpen, setRoomOpen] = useState(false);
  const [rooms, setRooms] = useState([...directory]);
  const [passableHotel, setPassableHotel] = useState<SendableHotelType>();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);
  console.log(props.hotels);
  const handleShowRoom = (hotelId: number) => {
    const room = rooms.find((room) => room.id === hotelId);
    setPassableHotel(room);
    if (hotelId === passableHotel?.id) setRoomOpen(!roomOpen);
    else setRoomOpen(true);
    setHotelListOpen(false);
  };

  const handleShowHotelList = useCallback(() => {
    setHotelListOpen(true);
    setRoomOpen(false);
  }, [roomOpen, hotelListOpen]);

  const handleSearch = useCallback(
    (e) => {
      const query: string = e.target.value;
      if (query.length == 0) setRooms([...directory]);
      let filteredRooms = directory.filter((hotel) => {
        let isMatch = String(hotel.name.toLowerCase()).includes(
          query.toLowerCase()
        );
        if (isMatch) return hotel;
      });
      setRooms(filteredRooms);
    },
    [rooms]
  );
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.innerWidth > 1280) {
        e.preventDefault();
        setRoomOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  });
  if (status == "loading") return <></>;
  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-1 bg-gray-100">
          <aside
            className={classNames(
              hotelListOpen
                ? "w-full sticky xl:fixed  xl:min-h-screen xl:max-h-screen xl:order-first xl:flex xl:flex-col flex-shrink-0 xl:w-96 border-r border-gray-200"
                : "hidden sticky xl:fixed xl:min-h-screen xl:max-h-screen xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200"
            )}
          >
            <div className="px-6 pt-6 pb-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-lg font-medium text-gray-900">Directory</h2>
                <button
                  type="button"
                  className="inline-flex items-center text-xs font-medium text-white border border-transparent rounded shadow-sm bg-cyan-700 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <Link href={"/admin/create-hotel"}>
                    <div className="flex flex-row px-2.5 py-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <p>Add Hotel</p>
                    </div>
                  </Link>
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                You are managing {directory.length} hotels.
              </p>
              <div className="flex flex-row mt-2 space-x-5">
                <div className="flex-1 min-w-0">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchIcon
                        onClick={() => {}}
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      className="block w-full pl-10 border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Search"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <FilterIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
            <nav
              className="flex-1 min-h-0 overflow-y-auto"
              aria-label="Directory"
            >
              <div className="">
                <ul
                  role="list"
                  className="relative z-0 divide-y divide-gray-200"
                >
                  {rooms.map((hotel) => (
                    <li
                      key={hotel.id}
                      onClick={() => handleShowRoom(hotel.id)}
                      className="cursor-pointer"
                    >
                      <div className="relative flex items-center px-6 py-5 space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-row justify-between">
                            <p
                              className={
                                "text-sm font-bold text-gray-900" +
                                classNames(
                                  "EMPTY" == "EMPTY"
                                    ? " text-emerald-600"
                                    : "text-red-600"
                                )
                              }
                            >
                              {hotel.name}
                            </p>
                            <div className="flex flex-col justify-end">
                              <p className="text-sm text-gray-500 truncate ">
                                <button
                                  type="button"
                                  className="inline-flex items-center p-1 text-xs font-medium text-white border-transparent rounded shadow-sm bg-emerald-600"
                                >
                                  {Math.min(
                                    ...hotel.RoomType.map((room) => room.price)
                                  )}{" "}
                                  DH / Night
                                </button>
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {hotel.Room.length} Rooms - {hotel.Floor.length}{" "}
                            Floors
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>
          <main className="flex-grow xl:ml-96">
            {roomOpen ? (
              <Hotel
                hotel={passableHotel}
                handleShowHotelList={handleShowHotelList}
              />
            ) : (
              <div className="flex flex-col flex-wrap content-center justify-center h-screen bg-gray-100 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-14 w-14"
                  viewBox="0 0 20 20"
                  fill="#4b5563"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>

                <p className="font-semibold text-gray-600">Select a room</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Hotels;
