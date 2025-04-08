import { auth, authOptions } from '@/lib/auth'
import React from 'react'
import Image from 'next/image'
import Logout from './LogoutButton'
import { getServerSession } from 'next-auth'

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <nav className='flex items-center justify-between p-4 h-16'>
      {/* SEARCH BAR  */}
      {/* <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <Image src='/icons/search.png' alt='search' width={14} height={14} />
        <input
          type='text'
          placeholder='Search...'
          className='w-[200px] p-2 bg-transparent outline-none'
        />
      </div> */}

      {/* ICONS AND USER  */}
      <div className='flex items-center gap-6 justify-end w-full'>
        {/* <Logout /> */}
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src='/icons/message.png' alt='icon' width={20} height={20} />
        </div>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image
            src='/icons/announcement.png'
            alt='icon'
            width={20}
            height={20}
          />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>
            3
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>
            {session?.user.name}
          </span>
          <span className='text-[10px] text-gray-500 dark:text-gray-300 text-right'>
            {session?.user?.role}
          </span>
        </div>
        <Image
          src={session?.user.image ? session?.user.image : '/icons/avatar.png'}
          alt='avatar'
          width={36}
          height={36}
          className='rounded-full'
        />
      </div>
    </nav>
  )
}

export default Navbar
