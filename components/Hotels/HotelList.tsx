"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Navbar from "../Navbar/AdminNavbar";
import Hotel from "./Hotel";
import Link from "next/link";
const directory = [
  {
    id: 1,
    name: "Leslie Abbott",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Hector Adams",
    role: "VP, Marketing",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Blake Alexander",
    role: "Account Coordinator",
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Fabricio Andrews",
    role: "Senior Art Director",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Angela Beaver",
    role: "Chief Strategy Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Yvette Blanchard",
    role: "Studio Artist",
    imageUrl:
      "https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Lawrence Brooks",
    role: "Content Specialist",
    imageUrl:
      "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Jeffrey Clark",
    role: "Senior Art Director",
    imageUrl:
      "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Kathryn Cooper",
    role: "Associate Creative Director",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Alicia Edwards",
    role: "Junior Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 11,
    name: "Benjamin Emerson",
    role: "Director, Print Operations",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 12,
    name: "Jillian Erics",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 13,
    name: "Chelsea Evans",
    role: "Human Resources Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 14,
    name: "Michael Gillard",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 15,
    name: "Dries Giuessepe",
    role: "Manager, Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 16,
    name: "Jenny Harrison",
    role: "Studio Artist",
    imageUrl:
      "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 17,
    name: "Lindsay Hatley",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 18,
    name: "Anna Hill",
    role: "Partner, Creative",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 19,
    name: "Courtney Samuels",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 20,
    name: "Tom Simpson",
    role: "Director, Product Development",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 21,
    name: "Floyd Thompson",
    role: "Principal Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 22,
    name: "Leonard Timmons",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 23,
    name: "Whitney Trudeau",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 24,
    name: "Kristin Watson",
    role: "VP, Human Resources",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 25,
    name: "Emily Wilson",
    role: "VP, User Experience",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 26,
    name: "Emma Young",
    role: "Senior Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Hotels = (props) => {
  const [roomListOpen, setRoomListOpen] = useState(true);
  const [roomOpen, setRoomOpen] = useState(false);
  const [rooms, setRooms] = useState([...directory]);
  const handleShowRoom = useCallback(() => {
    setRoomOpen(!roomOpen);
    setRoomListOpen(false);
  }, [roomOpen, roomListOpen]);
  const handleShowRoomList = useCallback(() => {
    setRoomListOpen(true);
    setRoomOpen(false);
  }, [roomOpen, roomListOpen]);
  console.log("heere is a list of hotels: ");
  console.log(props.myRooms);
  const handleSearch = useCallback(
    (e) => {
      const query = e.target.value;
      if (query.length == 0) setRooms([...directory]);
      let filteredRooms = directory.filter((room) => {
        let isMatch = room.name.toLowerCase().includes(query.toLowerCase());
        if (isMatch) return room;
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

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <aside
            className={classNames(
              roomListOpen
                ? "w-full xl:order-first xl:flex xl:flex-col flex-shrink-0 xl:w-96 border-r border-gray-200"
                : "hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200"
            )}
          >
            <div className="px-6 pt-6 pb-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-lg font-medium text-gray-900">Directory</h2>
                <button
                  type="button"
                  className="inline-flex items-center border border-transparent text-xs font-medium rounded shadow-sm text-white bg-cyan-700 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <Link href="/admin/hotels/add-hotel">
                    <div className="flex flex-row px-2.5 py-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
              <form className="mt-6 flex space-x-4" action="#">
                <div className="flex-1 min-w-0">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
            <nav
              className="flex-1 min-h-0 overflow-y-auto"
              aria-label="Directory"
            >
              <div className="relative">
                <ul
                  role="list"
                  className="relative z-0 divide-y divide-gray-200"
                >
                  {rooms.map((person) => (
                    <li key={person.id} onClick={handleShowRoom}>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              {person.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {person.role}
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {roomOpen ? (
              <Hotel rooms={rooms} handleShowRoomList={handleShowRoomList} />
            ) : (
              <div className="h-screen bg-gray-100 flex justify-center content-center flex-wrap flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 mx-auto"
                  viewBox="0 0 20 20"
                  fill="#4b5563"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>

                <p className="text-gray-600 font-semibold">Select a hotel</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Hotels;
