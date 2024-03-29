import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../prisma/prisma";

const bcrypt = require("bcryptjs");
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              phoneNumber: true,
              cin: true,
              role: true,
              hotelId: true,
              isReady: true,
            },
          });
          if (user) {
            const match = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (match) {
              delete user.password;
              return user;
            }
          } else {
            const user = await prisma.admin.findUnique({
              where: {
                email: credentials.email,
              },
              select: {
                id: true,
                email: true,
                name: true,
                password: true,
                role: true,
              },
            });
            if (user) {
              const match = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (match) {
                delete user.password;
                return user;
              }
            }
          }
          return null;
        } catch (err: any) {
          console.log(err);
          throw new Error(err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          user: user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
};

export default NextAuth(authOptions);
