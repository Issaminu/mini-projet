import UpdateHotel from "../../../../components/Hotels/UpdateHotel";
import prisma from "../../../../prisma/prisma";
import { Floor, Hotel, RoomType } from "@prisma/client";

export type sendableHotelType = Partial<Hotel> & {
  Floor: Partial<Floor[]>;
  RoomType: Partial<RoomType[]>;
};
const getHotel = async (hotelId) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
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
    },
  });
  return hotel;
};
const UpdateHotels = async ({ params }) => {
  const hotelId = parseInt(params.hotelId);
  const hotel = await getHotel(hotelId);
  let roomTypes = [] as string[];
  hotel.RoomType.forEach((roomType) => {
    roomTypes.push(roomType.name);
  });
  return (
    <div className="flex justify-center w-screen h-full bg-gray-100 lg:justify-start">
      <UpdateHotel hotel={hotel as sendableHotelType} roomTypes={roomTypes} />
    </div>
  );
};

export default UpdateHotels;
