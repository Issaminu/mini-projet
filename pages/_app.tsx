import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Inter } from "@next/font/google";

//USAGE OF THE /PAGES FOLDER IS NOW DEPRECATED, PLEASE USE THE /APP FOLDER FROM NOW ON.

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
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}
