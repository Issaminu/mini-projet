import { Fragment, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  UserIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import tempLogo from "../../public/enset.png";
import smTempLogo from "../../public/enset-sm.jpg";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const user = {
  name: "Tom Cook",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Rooms", href: "/manager/romms", icon: HomeIcon, current: true },
  { name: "Managers", href: "#", icon: UserGroupIcon, current: false },
  {name:"Reservations",href:"/manager/reservations",icon:CalendarIcon,current:false},
    {name:"Hotel",href:"/manager/hotel",icon:ViewGridAddIcon,current:false},
];
const secondaryNavigation = [
  { name: "Profile", href: "#", icon: UserIcon, current: false },
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logout = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem("recoil-persist");
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div className="z-40">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-cyan-700 focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 ml-2 mt-1 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon
                      className="h-6 w-6 text-gray-800"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 z-50 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Image
                    className="h-8 w-auto"
                    src={tempLogo}
                    alt="ENSET Hotels"
                  />
                </div>
                <nav aria-label="Sidebar" className="mt-5">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        onClick={() => setSidebarOpen(false)}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-cyan-900 text-white"
                            : "text-white hover:bg-cyan-800 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-white group-hover:text-white",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <hr
                    className="border-t border-cyan-900 my-5"
                    aria-hidden="true"
                  />
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-white hover:bg-cyan-800 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      >
                        <item.icon
                          className="text-white group-hover:text-white mr-4 flex-shrink-0 h-6 w-6"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden fixed h-screen lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r  bg-cyan-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4">
                <Image
                  className="h-8 w-auto"
                  src={tempLogo}
                  alt="ENSET Hotels"
                />
              </div>
              <nav className="mt-5 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-cyan-900 text-white"
                          : "text-white hover:bg-cyan-800",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-white group-hover:text-white",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <hr
                  className="border-t border-cyan-800 my-5"
                  aria-hidden="true"
                />
                <div className="flex-1 px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:bg-cyan-800 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      <item.icon
                        className="text-white group-hover:text-white mr-3 flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
           
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full flex-1 fixed overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <Image
                className="h-8 w-auto"
                src={smTempLogo}
                alt="ENSET Hotels"
              />
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
