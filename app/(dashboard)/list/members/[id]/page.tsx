import Announcement from '@/components/dashboard/Announcement'
import BigCalendar from '@/components/dashboard/BigCalendar'
import { PerformanceChart } from '@/components/dashboard/PerformanceChart'
import { VenusAndMars } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleMemberPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        {/* TOP  */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD  */}
          <div className='bg-[#C3EBFA] py-6 px-4 rounded-md flex-1 flex gap-4'>
            <div className='w-1/3'>
              <Image
                src='https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200'
                alt='teacher'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>Peter Riley</h1>
              <p className='text-sm text-gray-500'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                quas voluptatum quidem?
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <VenusAndMars className='w-5 h-5' />
                  <span>Male</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image
                    src='/icons/date.png'
                    alt='icon'
                    width={14}
                    height={14}
                  />
                  <span>August 2024</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image
                    src='/icons/mail.png'
                    alt='icon'
                    width={14}
                    height={14}
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image
                    src='/icons/phone.png'
                    alt='icon'
                    width={14}
                    height={14}
                  />
                  <span>+1 234 567 8901</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleAttendance.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className=' text-sm text-gray-400'>Attendance</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleBranch.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>6th</h1>
                <span className=' text-sm text-gray-400'>Grade</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleLesson.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>16</h1>
                <span className=' text-sm text-gray-400'>Lessons</span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/icons/singleClass.png'
                alt='icon'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>5B</h1>
                <span className=' text-sm text-gray-400'>Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className='mt-4 bg-white dark:bg-black rounded-md p-4 h-[800px]'>
          <h1 className=''>Member&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white dark:bg-black rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
            <Link href='/' className='p-3 rounded-md bg-[#EDF9FD]'>
              Member&apos;s Lessons
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#F1F0FF]'>
              Member&apos;s Leaders
            </Link>
            <Link href='/' className='p-3 rounded-md bg-pink-50'>
              Member&apos;s Exams
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#EDF9FD]'>
              Member&apos;s Assignments
            </Link>
            <Link href='/' className='p-3 rounded-md bg-[#FEFCE8]'>
              Member&apos;s Results
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcement />
      </div>
    </div>
  )
}

export default SingleMemberPage
