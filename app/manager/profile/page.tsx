"use client"
import React, { useCallback, useEffect,useRef } from 'react'
import { Fragment ,useState} from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { SearchIcon ,QuestionMarkCircleIcon} from '@heroicons/react/solid'
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
import Email from 'next-auth/providers/email'
 

 

const page = () => {
  const user = useRef({
   name:"",
    email:"",
    phone:"",
    cin:"",
    phoneNumber:"",
  })
  const name = useRef(null)
  const email = useRef(null)
   const cin = useRef(null)
  const password = useRef(null)
  const verifypassword = useRef(null)
  const phoneNumber = useRef(null)
   const getProfileInfo = useCallback(async () => {
await axios.get('/api/manager/manager').then((res) => {
  user.current.name = res.data.user.name;
  user.current.email = res.data.user.email;
  user.current.phone = res.data.user.phone;
  user.current.cin = res.data.user.cin;
  user.current.phoneNumber = res.data.user.phoneNumber;
  name.current.value = user.current.name;
  email.current.value = user.current.email;
   cin.current.value = user.current.cin;
  phoneNumber.current.value = user.current.phoneNumber;
  
}).catch((err) => {
  console.log(err);
  
});
   }, []);
const updateProfileInfo = useCallback(async () => {
  if(password.current.value != verifypassword.current.value){
    alert("passwords are not the same")
    return
  }
  await axios.post('/api/manager/manager', {
    name:name.current.value,
    email:email.current.value,
    cin:cin.current.value,
    password:password.current.value,
    phoneNumber:phoneNumber.current.value,
  }).then((res) => {
    console.log(res.data);
    
  }).catch((err) => {
    console.log(err);
    
  });
}, []);
  useEffect(() => {
    console.count();
    getProfileInfo();
  }, []);
  return (
  <>
   <section aria-labelledby="payment-details-heading">
                <div >
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                         Profile details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your account information.  
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            ref={name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            ref={email}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
 
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            type="password"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            ref={password}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Verify Password
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            ref={verifypassword}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label htmlFor="phone number" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone number"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            ref={phoneNumber}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            placeholder="06488854"
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
                            id="security-code"
                            autoComplete="cc-csc"
                            ref={cin}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
 
                       
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        
                        onClick={updateProfileInfo}
                        className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </section></>
  )
}
export default page
