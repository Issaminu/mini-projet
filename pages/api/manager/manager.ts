// This API is used for the Manager's profile page, which will combine the display of data as well as the ability to update it
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // this const stores the logged in user's id which comes from react

  const token = await getToken({ req });
  const userId = token.user.id;

  // instead of creating multiple pages for each method, we can use a switch case to do it in one
  switch (req.method) {
    // if the method is GET (display of data)
    case "GET":
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        });

        res.status(200).json({ user: user });
      } catch (error) {
        // in case of an error, log it
        console.log(error);

        res.status(404).json({ message: "User could not be found" });
        console.log("User could not be found");
      }
      break;

    // if the method is POST (updating data)
    case "POST":
      try {
        // store the comming data from the form in this const object
        const { name, email, password, phoneNumber, cin, hotelId } = req.body;
        // then update the row of this user with the info
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        });

        //only update the fields that changed

        if (name != user.name) {
          const regexName = /^[a-zA-Z][a-zA-Z ]*$/;

          if (regexName.test(name) == false) {
            return res
              .status(400)
              .json({ message: "The entered name is invalid" });
          }
          if (name.length < 3 || name.length > 30) {
            return res
              .status(400)
              .json({ message: "Name must be >= 3 and <=30 characters" });
          }
          await prisma.user
            .update({
              where: {
                id: Number(userId),
              },
              data: {
                name: name,
              },
            })
            .catch((err) => {
              console.log(err);
              res.status(404).json({ message: "Error accored" });
            });
        }

        //updating email
        if (email != user.email) {
          const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

          if (regexEmail.test(email) == false) {
            return res.status(400).json({
              message: 'Error":"The entered email address is not valid',
            });
          }

          await prisma.user
            .update({
              where: {
                id: Number(userId),
              },
              data: {
                email: email,
              },
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Error accored" });
            });
        }

        //updating password
        if (password != null || password != "" || password != undefined) {
          if (password.length < 8) {
            return res
              .status(400)
              .json({ message: 'Error":"The entered password is not valid' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);

          await prisma.user
            .update({
              where: {
                id: Number(userId),
              },
              data: {
                password: hashedPassword,
              },
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Error accored" });
            });
        }
        //updating phone number
        if (phoneNumber != user.phoneNumber) {
          await prisma.user
            .update({
              where: {
                id: Number(userId),
              },
              data: {
                phoneNumber: phoneNumber,
              },
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Error accored" });
            });
        }
        //updating cin
        if (cin != user.cin) {
          await prisma.user
            .update({
              where: {
                id: Number(userId),
              },
              data: {
                cin: cin,
              },
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Error accored" });
            });
        }

        res.status(200).json("User updated");
      } catch (error) {
        // in case of an error, log it
        console.log(error);
        console.log("User could not be updated");
        res.status(404).json({ message: "User could not be updated" });
      }
      break;

    default:
      console.log(`Error: Invalid method (${req.method})`);
  }
}
