import LogoutButton from '@/components/LogoutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const RedirectPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const role = session!.user!.role!.toLowerCase()
  // if (session?.user) {
  //   redirect(`/${role}`)
  // }

  console.log(session)

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='flex gap-4 flex-col'>
        <div className='flex flex-col items-center gap-x-2 text-sm'>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
          <p>{session?.user?.id}</p>
          <p>{session?.user?.role}</p>
          {session?.user?.image && (
            <Image
              className='rounded-full'
              width={30}
              height={30}
              alt='Avatar'
              src={session?.user?.image}
            />
          )}
        </div>
        <LogoutButton />
        {/* <h1 className='text-2xl font-extrabold'>Redirecting ...</h1> */}
      </div>
    </div>
  )
}

export default RedirectPage
