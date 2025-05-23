'use client'

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending || isLoading}
      className={className ?? 'bg-green-600 text-white w-full'}
    >
      {pending || isLoading ? (
        <div className='flex items-center gap-4'>
          <Image
            src='/icons/loader.svg'
            alt='loader'
            width={24}
            height={24}
            className='animate-spin'
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
