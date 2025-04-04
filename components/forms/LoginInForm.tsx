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
import { signIn } from 'next-auth/react'
import { getUserByEmail } from '@/lib/actions/auth'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      setError('User not found')
      return
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/redirect',
    })

    if (res?.error) {
      setError(res.error)
    } else {
      router.push(res?.url || '/')
    }
  }

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password'
      case 'Incorrect Password':
        return 'Wrong password — please try again'
      case 'User not found':
        return 'No account found for that email'
      default:
        return 'Something went wrong. Please try again.'
    }
  }

  return (
    <Form {...form}>
      <form
        //  action={loginWithEmail}
        onSubmit={handleSubmit}
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
            <p className='text-red-500 text-center absolute pl-10'>
              {getErrorMessage(error)}
            </p>
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
