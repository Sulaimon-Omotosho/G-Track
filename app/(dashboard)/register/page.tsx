import RegisterForm from '@/components/forms/RegisterForm'
import { ModeToggle } from '@/components/ModeToggle'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className='flex h-screen max-h-screen'>
      <div className='absolute top-4 right-4'>
        <ModeToggle />
      </div>
      <section className='remove-scrollbar container '>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <div className='flex gap-4 items-center mb-12'>
            <Image
              src='/images/logo-hicc.jpeg'
              height={1000}
              width={1000}
              alt='logo'
              className='h-14 w-fit rounded-full ring-1 ring-black'
            />
            <h1 className=' text-lg font-bold'>Growth Tracker</h1>
          </div>

          <RegisterForm userId={userId} session={session} />

          <p className='copyright py-12'>© 2024 Growth Tracker</p>
        </div>
      </section>

      <Image
        src='/images/Growthtrack-img1.jpg'
        height={1000}
        width={1000}
        alt='Patient'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register
