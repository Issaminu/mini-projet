'use client';
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';
import axios from 'axios';
import { userState } from '../../../../store/atoms';
import { useRecoilState } from 'recoil';
import { Floor, RoomType } from '@prisma/client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Room from '../../../../components/Hotels/Hotel';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface floorType extends Floor {
  name: string;
}
const page = () => {
  const [areInputsValid, setAreInputsValid] = useState(true);

  const user = useRef({
    name: '',
    email: '',
    phone: '',
    cin: '',
    phoneNumber: '',
    address: '',
  });
  const name = useRef(null);
  const email = useRef(null);
  const cin = useRef(null);
  const password = useRef(null);
  const verifypassword = useRef(null);
  const phoneNumber = useRef(null);
  const address = useRef(null);
  const updateProfileInfo = useCallback(async () => {
    setAreInputsValid(false);
    if (password.current.value != verifypassword.current.value) {
      alert('passwords are not the same');
      return;
    }
    await axios
      .post('/api/manager/reception/create', {
        name: name.current.value,
        email: email.current.value,
        cin: cin.current.value,
        password: password.current.value,
        phoneNumber: phoneNumber.current.value,
      })
      .then((res) => {
        setAreInputsValid(true);
      })
      .catch((err) => {
        console.log(err);
        setAreInputsValid(true);
      });
  }, []);

  return (
    <>
      <section aria-labelledby="payment-details-heading">
        <div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div>
                <h2
                  id="payment-details-heading"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Profile details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add new receptionist to your hotel
                </p>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-6">
                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    ref={name}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="off"
                    ref={email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    ref={password}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="verify-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verify Password
                  </label>
                  <input
                    type="password"
                    name="verify-password"
                    id="verify-password"
                    autoComplete="off"
                    ref={verifypassword}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>

                <div className="col-span-4 sm:col-span-1">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="off"
                    ref={phoneNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    placeholder="0615839642"
                  />
                </div>

                <div className="col-span-4 sm:col-span-1">
                  <label
                    htmlFor="cin"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <span>CIN</span>
                  </label>
                  <input
                    type="text"
                    name="cin"
                    id="cin"
                    autoComplete="off"
                    ref={cin}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={updateProfileInfo}
                className={
                  areInputsValid
                    ? 'ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600'
                    : 'disabled ml-3 inline-flex w-full md:w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-100'
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default page;
