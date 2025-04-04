'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }
  return (
    <>
      <div onClick={handleLogout}>
        <div className='bg-gray-600 text-white text-sm py-2 px-4 rounded-md m-4 cursor-pointer'>
          Logout
        </div>
      </div>
    </>
  )
}

export default Logout
