'use server'

import AuthError from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '../db'
import { signIn, signOut } from 'next-auth/react'
import { saltAndHashPassword } from '@/utils/helper'
import { getSession } from 'next-auth/react'
import { auth } from '../auth'

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

// LOGIN
export const login = async () => {
  revalidatePath('/redirect')
}

// LOGOUT
export const logout = async () => {
  revalidatePath('/')
}

// LOGIN WITH EMAIL
export const loginWithEmail = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'User not found' }
  }

  const loginData = {
    email,
    password,
    role: existingUser.role,
    redirectTo: '/redirect',
  }

  try {
    await signIn('credentials', loginData)
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Wrong Password' }
      }
    }
    throw error
  }
  revalidatePath('/redirect')
}

export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'User already exists' }
  }

  try {
    const hash = saltAndHashPassword(password)
    const newUser = await db.user.create({
      data: {
        email,
        hashedPassword: hash,
        role: 'USER',
      },
    })

    const loginData = {
      email: newUser.email,
      password,
      redirectTo: `/member/${newUser.id}/register`,
    }

    await signIn('credentials', loginData)

    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { error: 'Something went wrong during signup' }
    }
    // else {
    //   console.error('Unexpected error:', error)
    //   return { error: 'An unexpected error occurred' }
    // }
    throw error
  }
}

// GET USER ID
export const getUserFromSession = async () => {
  const session = await auth()
  return session?.user?.id || null
}
