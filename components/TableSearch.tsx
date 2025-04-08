'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TableSearch = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 3) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('search', search)
        params.set('page', '1')
        router.push(`?${params.toString()}`)
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [search, searchParams, router])

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value)
  // }

  return (
    <div className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
      <Image src='/icons/search.png' alt='search' width={14} height={14} />
      <input
        type='text'
        placeholder='Search...'
        value={search}
        // onChange={handleSearchChange}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[200px] p-2 bg-transparent outline-none'
      />
    </div>
  )
}

export default TableSearch
