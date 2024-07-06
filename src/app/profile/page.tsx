'use client';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from "react-hot-toast";
import { useRouter } from 'next/navigation';


export default function ProfilePage() {

  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async() => {
    try{
      const response = await axios.post("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);

    }catch(err: any){
      console.log(err.message);
      toast.error(err.message);
    }
  }


  const logout = async() => {
    try{
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");

      router.push('/login');
    }catch(err:any){
      console.log(err.message);
      toast.error(err.message);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1 className='text-4xl text-black'>Profile Page</h1>
      <h2>
        {
          data === "nothing" ? "No Data For Display" : <Link href={`/profile/${data}`}>{data}</Link>
        }
      </h2>
      <hr />

      <button 
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
        onClick={logout}>
          Logout
      </button>

      <button 
        className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' 
        onClick={getUserDetails}>
          Get User Details
      </button>
    </div>
  )
}