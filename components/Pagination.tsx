'use client'

import { ITEMS_PER_PAGE } from '@/lib/settings'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

  // const [inputPage, setInputPage] = useState<number | string>(page)

  // useEffect(() => {
  //   if (inputPage !== page) {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set('page', inputPage.toString())
  //     router.push(`${window.location.pathname}?${params.toString()}`)
  //   }
  // }, [inputPage, page, searchParams, router])

  // const changePage = (newPage: number) => {
  //   if (newPage < 1 || newPage > totalPages) return
  //   setInputPage(newPage)
  // }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   if (value === '' || /^[0-9]+$/.test(value)) {
  //     setInputPage(value)
  //   }
  // }

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     const newPage = Math.min(Math.max(Number(inputPage), 1), totalPages)
  //     setInputPage(newPage)
  //     changePage(newPage)
  //   }
  // }

  // const handleInputBlur = () => {
  //   const newPage = Math.min(Math.max(Number(inputPage), 1), totalPages)
  //   setInputPage(newPage)
  //   changePage(newPage)
  // }

  const rangeStart = Math.max(page - 2, 1)
  const rangeEnd = Math.min(page + 3, totalPages)

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return // Don't allow out of bounds page
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString()) // Set the page query parameter
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className='p-4 flex justify-between items-center text-gray-500'>
      <button
        disabled={!hasPrev}
        // onClick={() => {
        //   changePage(page - 1)
        // }}
        className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Prev
      </button>
      <div className='flex items-center gap-2 text-sm'>
        {rangeStart > 1 && (
          <>
            <button onClick={() => changePage(1)} className='px-2 rounded-sm'>
              1
            </button>
            <span>...</span>
          </>
        )}
        {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => {
          const pageIndex = rangeStart + index
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                page === pageIndex ? 'bg-[#C3EBFA]' : ''
              }`}
              onClick={() => {
                changePage(pageIndex)
              }}
            >
              {pageIndex}
            </button>
          )
        })}
        {rangeEnd < totalPages && (
          <>
            <span>...</span>
            <button
              onClick={() => changePage(totalPages)}
              className='px-2 rounded-sm'
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      {/* <div className='flex items-center gap-2'>
        <input
          type='number'
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          min={1}
          max={totalPages}
          className='w-16 p-2 rounded-md border border-gray-300 text-xs'
        />
        <span className='text-xs'>of {totalPages}</span>
      </div> */}
      <button
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1)
        }}
        className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
