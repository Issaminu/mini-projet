"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function Proiders({ children }) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
