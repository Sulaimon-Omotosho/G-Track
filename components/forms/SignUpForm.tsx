'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { any, z } from 'zod'
import { Form } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUpWithEmail } from '@/lib/actions/auth'

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

const SignUpForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof UserFormValidation>) => {
    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await signUpWithEmail(formData)

    if (response?.error) {
      setError(response.error)
    } else {
      // router.push(`/member/${newUser.id}/register`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
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
          <SubmitButton>Sign Up</SubmitButton>
          <p className='text-sm pt-2'>
            Have an Account?{' '}
            <Link
              href='/login'
              className='underline text-blue-500 hover:text-blue-800 pl-2'
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm
