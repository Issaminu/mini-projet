import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Mini Projet | ENSET Mohammedia</title>
      </Head>
      <RecoilRoot>
        <Component className={inter.className} {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
