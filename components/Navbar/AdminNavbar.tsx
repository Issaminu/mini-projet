import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import tempLogo from "../../public/enset.png";
import smTempLogo from "../../public/enset-sm.jpg";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atoms";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Hotels", href: "/admin/hotels", icon: HomeIcon, current: true },
  { name: "Managers", href: "#", icon: UserGroupIcon, current: false },
];
const secondaryNavigation = [
  { name: "Profile", href: "#", icon: UserIcon, current: false },
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(user.name);
  }, []);
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
          className="fixed inset-0 z-40 flex lg:hidden"
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
            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-cyan-700 focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 mt-1 ml-2">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="z-50 flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Image
                    className="w-auto h-8"
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
                    className="my-5 border-t border-cyan-900"
                    aria-hidden="true"
                  />
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-2 py-2 text-base font-medium text-white rounded-md hover:bg-cyan-800 hover:text-white group"
                      >
                        <item.icon
                          className="flex-shrink-0 w-6 h-6 mr-4 text-white group-hover:text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4 border-t cursor-pointer border-cyan-900">
                <a
                  onClick={(e) => logout(e)}
                  className="flex-shrink-0 block group"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-semibold text-gray-100 group-hover:text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm font-semibold text-cyan-900">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="fixed hidden h-screen lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 border-r bg-cyan-700">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4">
                <Image
                  className="w-auto h-8"
                  src={tempLogo}
                  alt="ENSET Hotels"
                />
              </div>
              <nav className="flex-1 mt-5" aria-label="Sidebar">
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
                  className="my-5 border-t border-cyan-800"
                  aria-hidden="true"
                />
                <div className="flex-1 px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-cyan-800 hover:text-white group"
                    >
                      <item.icon
                        className="flex-shrink-0 w-6 h-6 mr-3 text-white group-hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t cursor-pointer border-cyan-800">
              <a
                onClick={(e) => logout(e)}
                className="flex-shrink-0 block w-full group"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block rounded-full h-9 w-9"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs font-semibold text-cyan-900 group-hover:text-gray-800">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed flex flex-col flex-1 w-full overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <Image
                className="w-auto h-8"
                src={smTempLogo}
                alt="ENSET Hotels"
              />
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
