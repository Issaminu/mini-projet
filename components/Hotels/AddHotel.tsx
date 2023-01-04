"use client";
import HotelHeading from "./HotelHeading";
import { useCallback, useEffect, useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atoms";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const stars = [0, 1, 2, 3, 4, 5];
const starterFloors = [
  { name: 1, roomType: "Normal" },
  { name: 2, roomType: "Normal" },
  { name: 3, roomType: "Normal" },
  { name: 4, roomType: "Normal" },
  { name: 5, roomType: "Normal" },
];
const starterRoomTypePrices = [
  { name: "Normal", price: 1 },
  { name: "Premium", price: 1 },
  { name: "Presidential", price: 1 },
];
const starterRoomTypes = ["Normal", "Premium", "Presidential"];

export default function AddRoom() {
  const router = useRouter();
  const [starCount, setStarCount] = useState(0);
  const [floors, setFloors] = useState(starterFloors);
  const [floorCount, setFloorCount] = useState(5);
  const [selected, setSelected] = useState(starterRoomTypes);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [roomTypePrice, setRoomTypePrice] = useState(starterRoomTypePrices);
  const [areInputsValid, setAreInputsValid] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const ref = useRef(null);

  useEffect(() => {
    if (
      name.length > 0 &&
      floorCount > 0 &&
      roomTypePrice.length > 0 &&
      address.length > 0 &&
      roomCount > 0 &&
      (starCount >= 0 || starCount <= 5)
    ) {
      setAreInputsValid(true);
    } else {
      setAreInputsValid(false);
    }
  }, [name, address, floors, roomTypePrice, roomCount, starCount]);
  const handleFloorsChange = useCallback(
    (e) => {
      e.target.value = parseInt(e.target.value);
      if (e.target.value < 1) e.target.value = 1;
      if (e.target.value > 100) e.target.value = 100;
      setFloorCount(parseInt(e.target.value));
      let tempFloors = [...floors];
      for (let i = 0; i < e.target.value; i++) {
        if (!tempFloors[i])
          tempFloors[i] = {
            name: i + 1,
            roomType: "Normal",
          };
      }
      tempFloors = tempFloors.slice(0, e.target.value);
      setFloors(tempFloors);
    },
    [floors, floorCount]
  );

  const handleChangePrice = useCallback(
    (e, index) => {
      e.target.value = parseFloat(e.target.value).toFixed(2);
      if (e.target.value < 1) e.target.value = 1;
      let tempPrice = e.target.value;
      let tempRoomTypePrice = [...roomTypePrice];
      for (let i = 0; i < selected.length; i++) {
        if (!tempRoomTypePrice[index]) {
          tempRoomTypePrice[index] = {
            name: selected[index],
            price: 0,
          };
        }
      }
      tempRoomTypePrice[index].price = e.target.value;
      setRoomTypePrice(tempRoomTypePrice);
    },
    [selected, roomTypePrice]
  );

  const handleChangeFloorType = useCallback(
    (e, index) => {
      let tempFloors = [...floors];
      tempFloors[index].roomType = e.target.value;
      setFloors(tempFloors);
    },
    [floors]
  );

  const handleRoomCountChange = useCallback(
    (e) => {
      e.target.value = parseInt(e.target.value);
      if (e.target.value < 1) e.target.value = 1;
      if (e.target.value > 100) e.target.value = 100;
      setRoomCount(e.target.value);
    },
    [roomCount]
  );
  const handleSubmit = async () => {
    ref.current.staticStart();
    let capitalizedName = name;
    capitalizedName =
      capitalizedName.charAt(0).toUpperCase() + capitalizedName.slice(1);
    let capitalizedAddress = address;
    capitalizedAddress =
      capitalizedAddress.charAt(0).toUpperCase() + capitalizedAddress.slice(1);
    let hotel = {
      name: capitalizedName,
      address: capitalizedAddress,
      starCount: starCount,
      roomCount: parseInt(String(roomCount)),
      roomTypes: roomTypePrice,
      floors: floors,
    };
    console.log(hotel);
    setAreInputsValid(false);
    await axios
      .put("/api/admin/hotel", hotel)
      .then(async (res) => {
        ref.current.complete();
        router.push("/admin");
      })
      .catch((err) => {
        setAreInputsValid(true);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col lg:ml-16 xl:ml-0">
      <LoadingBar height={3} color="#06b6d4" ref={ref} />
      <HotelHeading />
      <div className="p-8">
        <div>
          <div className="xl:grid xl:grid-cols-3 xl:gap-6">
            <div className="xl:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Hotel Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  General information on the hotel.
                </p>
              </div>
            </div>
            <div
              style={{ maxWidth: "64rem" }}
              className="mt-5 mr-6 2xl:ml-32 xl:mt-0 md:col-span-2 md:mr-0"
            >
              <div
                style={{ boxShadow: "0 4px 0px rgba(0, 0, 0, 0.04)" }}
                className="rounded-t-lg rounded-b-lg sm:overflow-hidden xl:rounded-b-none"
              >
                <div className="p-6 px-4 py-5 space-y-6 bg-white xl:pb-0">
                  <div className="flex flex-row gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hotel name
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="max-w-md px-2 w-fit sm:px-0">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of stars
                      </label>
                      <div id="starCount" className="mt-1">
                        <Tab.Group
                          onChange={(index) => {
                            setStarCount(index);
                          }}
                        >
                          <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded-md h-9">
                            {Object.keys(stars).map((star) => (
                              <Tab
                                key={star}
                                className={({ selected }) =>
                                  classNames(
                                    "w-8 rounded-md text-sm font-medium leading-5 text-gray-600",
                                    "w-8 ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
                                    selected
                                      ? "bg-white shadow"
                                      : "text-gray-500 hover:bg-gray-100"
                                  )
                                }
                              >
                                {star}
                              </Tab>
                            ))}
                          </Tab.List>
                        </Tab.Group>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="floorCount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of floors
                      </label>
                      <input
                        onBlur={(e) => handleFloorsChange(e)}
                        defaultValue={floorCount}
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        name="floorCount"
                        id="floorCount"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="roomCount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of rooms per floor
                      </label>
                      <input
                        onBlur={handleRoomCountChange}
                        defaultValue={roomCount}
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        name="roomCount"
                        id="roomCount"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      name="address"
                      id="address"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div style={{ width: "36rem" }}>
                    <label
                      htmlFor="roomTypes"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Room types
                    </label>
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="roomTypes"
                    />
                  </div>
                  <div className="hidden xl:block" aria-hidden="true">
                    <div className="py-5">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="xl:grid xl:grid-cols-3 xl:gap-6">
            <div className="xl:col-span-1">
              <div className="px-4 mt-6 xl:mt-0 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Floor types
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Select the type of rooms in each floor.
                </p>
              </div>
            </div>
            <div
              style={{ maxWidth: "64rem" }}
              className="mt-5 mr-6 2xl:ml-32 xl:mt-0 md:col-span-2 md:mr-0"
            >
              <div
                style={{ boxShadow: "0 4px 0px rgba(0, 0, 0, 0.04)" }}
                className="overflow-hidden rounded-t-lg rounded-b-lg xl:rounded-t-none xl:rounded-b-none"
              >
                <div className="px-4 pb-64 bg-white sm:p-6 lg:pt-3">
                  <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                    {Array.from(Array(floorCount), (floor, index) => {
                      return (
                        <div className="flex flex-col w-fit" key={index}>
                          <label
                            htmlFor="floor"
                            className="text-sm font-medium text-gray-700 "
                          >
                            {"Floor " + (index + 1)}
                          </label>
                          <select
                            onChange={(e) => handleChangeFloorType(e, index)}
                            className="text-sm border-gray-300 border-solid rounded-md shadow border-6"
                          >
                            {selected.map((roomType) => (
                              <option key={roomType} className="text-md">
                                {roomType.length > 14
                                  ? roomType.substring(0, 9) + "..."
                                  : roomType}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                  <div className="hidden xl:block" aria-hidden="true">
                    <div className="mt-12">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="xl:grid xl:grid-cols-3 xl:gap-6">
            <div className="xl:col-span-1">
              <div className="px-4 mt-6 xl:mt-0 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Room types
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fill in the price per night for each room type.
                </p>
              </div>
            </div>
            <div className="mt-5 mr-6 2xl:ml-32 xl:mt-0 md:col-span-2 md:mr-0">
              <div
                style={{ boxShadow: "0 4px 0px rgba(0, 0, 0, 0.04)" }}
                className="overflow-hidden rounded-t-lg rounded-b-lg xl:rounded-t-none"
              >
                <div className="px-4 pb-64 bg-white sm:p-6 lg:pt-3">
                  <div className="grid grid-cols-4 gap-y-8">
                    {selected.map((roomType, index) => {
                      return (
                        <div className="flex flex-col w-fit" key={index}>
                          <label
                            htmlFor="floor"
                            className="text-sm font-medium text-gray-700 "
                          >
                            {roomType.length > 14
                              ? roomType.substring(0, 12) + "..."
                              : roomType}
                          </label>
                          <input
                            onBlur={(e) => handleChangePrice(e, index)}
                            type="number"
                            min="1"
                            defaultValue="1"
                            max="100"
                            step="0.01"
                            name="roomCount"
                            id="roomCount"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="hidden md:block" aria-hidden="true">
                    <div className="mt-12">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="flex justify-between md:justify-end gap-x-4">
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className={
                          areInputsValid
                            ? "ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
                            : "disabled ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-100"
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
