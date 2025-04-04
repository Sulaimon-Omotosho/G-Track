'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'input',
}

const LoginInForm = () => {
  const router = useRouter()
  // const { error } = useSWR(loginWithEmail, data)
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const onSubmit = async (data: any) => {
    // const response = await loginWithEmail(data)
    // if (response?.error) {
    //   setError(response.error)
    // } else {
    //   router.push('/redirect')
    // }
  }

  return (
    <Form {...form}>
      <form
        //  action={loginWithEmail}
        action={onSubmit}
        className='space-y-6 flex-1 bg-transparent'
      >
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Email'
            placeholder='JohnDoe@email.com'
            iconSrc='/icons/email.svg'
            iconAlt='email'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name='password'
          label='Password'
          placeholder='Password'
          iconSrc='/icons/user.svg'
          iconAlt='user'
        />

        <div className=''>
          <SubmitButton>Log In</SubmitButton>
          <p className='text-sm pt-2'>
            No Account?{' '}
            <Link
              href='/signup'
              className='underline text-blue-500 hover:text-blue-800 pl-2'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default LoginInForm
