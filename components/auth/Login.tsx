"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
  

const Login = () => {

    const handleGoogleLogin = async () => {
        signIn("google",{
            callbackUrl: "/dashboard",
            redirect: true
        })
    };
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button variant="outline" className='ml-4'>Login / Sign up</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Login/Signup</DialogTitle>
      </DialogHeader>
      <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Flucks
          </h1>
        </div>
        <Button variant="outline" onClick={handleGoogleLogin}>
          <Image
            src="/google.png"
            className=" mr-4"
            width={25}
            height={25}
            alt="google"
          />
                Continue with Google
            </Button>
    </DialogContent>
  </Dialog>
  
  )
}

export default Login
