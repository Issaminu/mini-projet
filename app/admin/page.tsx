import React from "react";
import prisma from "../../prisma/prisma";
import HotelList from "../../components/Hotels/HotelList";
import { Floor, Hotel, Room, RoomType } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export type SendableHotelType = Hotel & {
  Room: Partial<Room[]>;
  Floor: Partial<Floor[]>;
  RoomType: Partial<RoomType[]>;
  updateTime: string;
  createTime: string;
};

export async function getHotels() {
  const hotels = await prisma.hotel.findMany({
    select: {
      id: true,
      address: true,
      stars: true,
      name: true,
      Floor: {
        select: {
          id: true,
          number: true,
        },
      },
      RoomType: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
      create_time: true,
      update_time: true,
    },
  });
  for (const hotel of hotels) {
    //@ts-ignore
    hotel.Room = await prisma.room.findMany({
      where: {
        hotelId: hotel.id,
      },
      select: {
        id: true,
        typeId: true,
      },
    });
  }

  //The logic below is needed to pass data of type Date to the HotelList component, which is not currently possible in Next.js.
  //Meaning that we need to convert the Date type to a string type, and then convert it back to a Date type in the HotelList component.
  let returnedHotels: Array<SendableHotelType> = [];
  let length: number;
  hotels.map((hotel) => {
    length = returnedHotels.push(hotel as unknown as SendableHotelType); //Note: the push method returns the new length of the array
    returnedHotels[length - 1].createTime = new Date(
      hotel.create_time
    ).toDateString();
    delete returnedHotels[length - 1].create_time;
    returnedHotels[length - 1].updateTime = new Date(
      hotel.update_time
    ).toDateString();
    delete returnedHotels[length - 1].update_time;
  });
  return returnedHotels;
}

export default async function Hotels() {
  const session = await unstable_getServerSession(authOptions);
  const hotels = await getHotels();
  return (
    <>
      <HotelList hotels={hotels} />
    </>
  );
}
