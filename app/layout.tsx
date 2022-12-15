import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title> Mini Projet - ENSET Mohammmedia</title>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
