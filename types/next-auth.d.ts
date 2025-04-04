import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role:
        | 'ADMIN'
        | 'USER'
        | 'DISTRICT'
        | 'COMMUNITY'
        | 'ZONAL'
        | 'CELL'
        | 'LEADER' // Ensure role is included
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role:
      | 'ADMIN'
      | 'USER'
      | 'DISTRICT'
      | 'COMMUNITY'
      | 'ZONAL'
      | 'CELL'
      | 'LEADER' // Add role to User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role:
      | 'ADMIN'
      | 'USER'
      | 'DISTRICT'
      | 'COMMUNITY'
      | 'ZONAL'
      | 'CELL'
      | 'LEADER' // Extend JWT to include role
  }
}
