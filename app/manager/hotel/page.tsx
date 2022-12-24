"use client";
import React from 'react'
import prisma from '../../../prisma/prisma'
import { useSession } from "next-auth/react";
import { userState } from '../../../store/atoms';
import { useRecoilState } from "recoil";

const getHotel = async() => {
  const [user, setUser] = useRecoilState(userState);
  prisma.user.findMany({
    where: {id: user.id}}).then((res) => {
    console.log(res); 
  }).catch((err) => {
    console.log(err);
  })
}


const page = () => {
  const [user, setUser] = useRecoilState(userState);
   console.log(user);
   
  
  return (
    <div>
        this is the profile page of the manager,it is not yet implemented
        
         </div>
  )
}

export default page