// This API is used for the Hotel's profile page, which will combine the display of data as well as the ability to update it
// And at the same time display & update the floors and room types
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // store the comming data from the form in this const object
  // totalFloors: is the number of floors in the hotel
  // totalRoomTypes: is an object array containing all the room types
  const { id, name, address, stars, totalFloors, totalRoomTypes } = req.body;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        // Store the info of the requested user in the "hotel" const using the id
        const hotel = await prisma.hotel.findFirst({
          where: { id: Number(id) },
        });

        // get the number of rooms using the count function in sql
        const numberRooms = await prisma.room.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });

        // get the number of floors using the count function in sql
        const numberFloors = await prisma.floor.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });

        // fetch the room Types that the hotel provides
        const roomTypes = await prisma.roomType.findMany({
          where: {
            hotelId: Number(id),
          },
        });
        // send the hotel data, number of rooms, number of floors, and the room types to react
        res.json([hotel, numberRooms, numberFloors, roomTypes]);
      } catch (error) {
        console.log("Hotel could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // update the row of this hotel with the info sent by the form
        const hotel = await prisma.hotel.update({
          where: { id: Number(id) },
          data: {
            name,
            address,
            stars,
          },
        });

        // this function gets the number of floors of the hotel already in the DB
        const numberFloors = await prisma.floor.aggregate({
          _count: {
            id: true,
          },
          where: {
            hotelId: Number(id),
          },
        });
        // then we use that number to add the new floors that came from the form, and continue numbering in order
        for (let i = Number(numberFloors) + 1; i <= Number(totalFloors); i++) {
          await prisma.floor.create({
            data: {
              number: i,
              hotelId: id,
            },
          });
        }

        // in here we iterate over the room types that came as an array of objects
        totalRoomTypes.array.forEach((roomType) => {
          // then for each one test if the room type already exist in the DB
          if (!!prisma.roomType.findFirst({ where: { id: roomType.id } })) {
            // if yes, then it's going to be an update
            prisma.roomType.update({
              where: {
                id: Number(roomType.id),
              },
              data: {
                name: roomType.name,
                price: roomType.price,
                hotelId: roomType.hotelId,
              },
            });
            // if no, then we create the new room type
          } else {
            prisma.roomType.create({
              data: {
                name: roomType.name,
                price: roomType.price,
                hotelId: roomType.hotelId,
              },
            });
          }
        });

        res.status(200).json(hotel);
      } catch (error) {
        console.log("Hotel could not be updated");
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
