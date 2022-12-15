import React from "react";
import prisma from "../../../prisma/prisma";
import HotelList from "../../../components/Hotels/HotelList";
export async function getRooms(starCount: number) {
  const rooms = await prisma.hotel.findMany({
    where: {
      stars: starCount,
    },
    select: {
      id: true,
      name: true,
      stars: true,
    },
  });
  return rooms;
}
export default async function Hotels() {
  const myRooms = await getRooms(5);

  return (
    <>
      <HotelList myRooms={myRooms} />
    </>
  );
}
