"use client";
import { ChevronLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { SendableHotelType } from "../../app/admin/page";
import Table from "./Table";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hotel = (props) => {
  const router = useRouter();
  const hotel: SendableHotelType = props.hotel;
  console.log(hotel);
  return (
    <div className="min-h-screen">
      <nav
        onClick={props.handleShowHotelList}
        className="flex items-start px-4 py-3 mt-4 cursor-pointer lg:mt-0 sm:px-6 lg:px-8 xl:hidden"
        aria-label="Breadcrumb"
      >
        <a className="inline-flex items-center space-x-3 font-medium text-gray-900 text-md">
          <ChevronLeftIcon
            className="w-5 h-5 -ml-2 text-gray-400"
            aria-hidden="true"
          />
          <span>Directory</span>
        </a>
      </nav>
      <div>
        <div>
          {/* Profile header */}
          <div className="pb-6 mb-12 bg-cyan-800 rounded-b-3xl md:rounded-b-xl">
            <div className="sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-end sm:space-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible h-3 text-white sm:h-12 mb-7 sm:visible sm:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="flex-1 min-w-0 mt-6 2xl:block">
                    <div className="flex flex-row">
                      <h1 className="flex flex-row ml-4 text-5xl font-bold text-gray-100">
                        {hotel.name}
                      </h1>
                      <span className="flex items-center ml-3 text-xl wrap">
                        {Array.from(Array(hotel.stars), () => {
                          return <>⭐</>;
                        })}
                      </span>
                    </div>
                    <span className="ml-4 text-xl font-bold text-gray-100">
                      {hotel.address}
                    </span>
                  </div>
                  <div className="flex flex-col mx-6 mt-4 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4 md:mx-0 md:mt-0">
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/admin/update-hotel/" + hotel.id);
                      }}
                      className="inline-flex justify-center px-4 py-2 font-medium text-white border border-green-500 rounded-md shadow-sm text-md active:bg-green-800"
                      style={{ backgroundColor: "#17C964" }}
                    >
                      <PencilIcon
                        className="w-5 h-5 mr-2 -ml-1 text-white"
                        aria-hidden="true"
                      />
                      <span>Modify</span>
                    </button>
                    <button
                      style={{
                        backgroundColor: "#F31260",
                      }}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 font-medium text-white border rounded-md shadow-sm text-md border-rose-600"
                    >
                      <TrashIcon
                        className="w-5 h-5 mr-2 -ml-1 text-white"
                        aria-hidden="true"
                      />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Description list */}
          <div className="max-w-5xl px-4 mx-auto lg:mt-24 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 ml-12 xl:ml-36 gap-x-4 lg:gap-x-2 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Name of hotel
                </dt>
                <dd className="mt-1 text-gray-900 text-md">{hotel.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">Address</dt>
                <dd className="mt-1 text-gray-900 text-md">{hotel.address}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Number of stars
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {hotel.stars} stars
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Number of floors
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {hotel.Floor.length} floors
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Number of room types
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {hotel.RoomType.length} types of rooms
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Lowest price per night
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {Math.min(...hotel.RoomType.map((room) => room.price))} DH
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Creation time
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {hotel.createTime}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-md text-cyan-700">
                  Last update
                </dt>
                <dd className="mt-1 text-gray-900 text-md">
                  {hotel.updateTime}
                </dd>
              </div>
            </dl>
          </div>
          <div className="max-w-5xl px-4 mx-auto mt-24 mb-6 sm:px-6 lg:px-8">
            <p className="ml-12 font-medium xl:ml-36 text-md text-cyan-700">
              Room Types
            </p>
            <div className="flex justify-center">
              <Table hotel={hotel} />
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
