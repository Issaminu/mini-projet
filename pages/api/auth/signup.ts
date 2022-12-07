import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { Role } from "@prisma/client";
const bcrypt = require("bcrypt");

const signupAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { name, email, password } = req.body;
        const regexName = /^[a-zA-Z][a-zA-Z ]*$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regexName.test(name) == false) {
          throw { meta: { target: "name_not_alphabet" } };
        }
        if (name.length < 3 || name.length > 30) {
          throw { meta: { target: "name_length" } };
        }
        if (regexEmail.test(email) == false) {
          throw { meta: { target: "email_not_valid" } };
        }
        if (password.length < 8) {
          throw { meta: { target: "password_length" } };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
            phoneNumber: "TEMP",
            cin: "TEMP",
            role: Role.MANAGER,
            isReady: false,
            hotelId: 0,
          },
        });
        res.status(200).json({});
      } catch (error) {
        let errorMessage = "An error has occurred, please try again later";
        switch (error.meta.target) {
          case "name_not_alphabet":
            errorMessage = "The entered name is invalid";
            break;
          case "name_length":
            errorMessage = "Name must be >= 3 and <=30 characters";
            break;
          case "User_email_key":
            errorMessage = "This email is already in use";
            break;
          case "email_not_valid":
            errorMessage = "The entered email address is not valid";
            break;
          case "password_length":
            errorMessage = "The password must be >= 8 characters";
            break;
        }
        res.status(400).json({
          error: errorMessage,
          errorType: error.meta.target,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default signupAPI;
