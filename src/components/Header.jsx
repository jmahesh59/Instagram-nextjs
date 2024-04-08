/* eslint-disable @next/next/no-img-element */
"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { IoAddCircleOutline } from "react-icons/io5";
import { HiCamera } from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai'

function Header() {
  const {data :session} = useSession();
  // console.log(session);

  const [isOpen , setIsOpen] = useState(false);

  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href='/' className='hidden lg:inline-flex'>
          <Image src={'/Instagram_logo_black.webp'} alt='logo' width={96} height={96}/>
        </Link>
        <Link href='/' className='lg:hidden '>
          <Image src={'/800px-Instagram_logo_2016.webp'} alt='logo' width={40} height={40}/>
        </Link>

        <input type="text" placeholder='Search...' className='bg-gray-50  border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]' />


        {
          session ? (
            <div className='flex gap-3 items-center justify-center'>
            <IoAddCircleOutline className='text-2xl  text-black cursor-pointer hover:scale-125 transitoon duration-300 hover:text-red-600' 
            onClick={()=> setIsOpen(true)}
            />
            <img src={session.user.image} alt={session.user.name} className='w-10 h-10 rounded-full text-sm cursor-pointer' onClick={signOut}/>
            </div>
          ):(  <button className='text-sm font-semibold text-blue-500 ' onClick={()=>signIn()}>Log in</button>)
        }
      
      </div>
      {
        isOpen && (
          <Modal isOpen={isOpen} className={'max-w-lg w-[90%] absolute p-6 top-56   translate-x-[-50%] left-[50%] bg-white border-2 rounded-md  shadow-md'}
           onRequestClose={()=>setIsOpen(false)}
           ariaHideApp={false}
          >
            <div className="flex flex-col justify-center items-center h-[100%]">
             <HiCamera 
               className='text-5xl cursor-pointer text-gray-400  '
             />
            </div>
            <input type="text" maxLength={'150'}  placeholder='Please enter your captions'
            className='m-4 border-none text-center w-full outline-none focus:ring-0 '
            />
            <button className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Upload Post</button>
            <AiOutlineClose 
            className='absolute top-3 right-3 cursor-pointer hover:text-red-600 transition duration-300' 
            onClick={()=>setIsOpen(false)}
            />
          </Modal>
        )
      }
    </div>
  )
}

export default Header
