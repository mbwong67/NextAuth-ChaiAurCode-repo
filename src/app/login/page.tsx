'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {toast} from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onLogin = async() => {
    setLoading(true);
    try{
      const response = await axios.post('/api/users/login', user);
      console.log("Login Successful", response);
      router.push('/profile');
      
    }catch(err: any){
      console.log("Login Failed");
      toast.error(err.message);
    }
    setLoading(false);
  }
  
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  }, [user]);



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-white'>
        {loading ? "Loading" : "Login"}
      </h1>

      <hr />

      <label htmlFor='email'>Email</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='Email'
        type='email'
      />

      <label htmlFor='password'>Password</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='Password'
        type='text'
      />

      <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
        {
          buttonDisabled ? 'Please Fill up The Form' : "Login"
        }
      </button>

      <Link href={'/signup'}>Signup</Link>

    </div>
  )
}