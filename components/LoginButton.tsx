'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const LoginButton = ({ provider }: { provider: string }) => {
  const handleLogin = async () => {
    await signIn(provider, { callbackUrl: '/redirect' })
  }
  return <Button onClick={handleLogin}>Sign in with {provider}</Button>
}

export default LoginButton
