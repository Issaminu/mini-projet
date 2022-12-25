// This API is used for the Manager's profile page, which will combine the display of data as well as the ability to update it
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // this const stores the logged in user's id which comes from react

  const token = await getToken({ req });
  const userId = token.user.id;

  try {
    // get the user
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    // then we send the Receptionist
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    console.log("User could not be found");
  }
}
