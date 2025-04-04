// import NextAuth from 'next-auth'
// import Github from 'next-auth/providers/github'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import Credentials from 'next-auth/providers/credentials'
// import bcrypt from 'bcryptjs'
// import { db } from './db'
// import Google from 'next-auth/providers/google'
// import { saltAndHashPassword } from '../utils/helper'
// import { User } from '@prisma/client'

// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'email@example.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null
//         }

//         const email = credentials.email as string
//         const hash = saltAndHashPassword(credentials.password)

//         let user: any = await db.user.findUnique({
//           where: {
//             email,
//           },
//         })

//         if (!user) {
//           user = await db.user.create({
//             data: {
//               email,
//               hashedPassword: hash,
//             },
//           })
//         } else {
//           const isMatch = bcrypt.compareSync(
//             credentials.password as string,
//             user.hashedPassword
//           )
//           if (!isMatch) {
//             throw new Error('Incorrect Password')
//           }
//         }

//         return user
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id!
//         token.role = user.role
//       } else if (!token.role) {
//         const dbUser = await db.user.findUnique({
//           where: { id: token.id as string },
//           select: { id: true, role: true },
//         })

//         if (dbUser) {
//           token.role = dbUser.role!
//         }
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//         session.user.role = token.role
//       }
//       return session
//     },
//   },
// })

import NextAuth, { NextAuthOptions } from 'next-auth'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'
import Google from 'next-auth/providers/google'
import { saltAndHashPassword } from '../utils/helper'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        const email = credentials.email as string
        const hash = saltAndHashPassword(credentials.password)

        let user = await db.user.findUnique({ where: { email } })

        if (!user) {
          user = await db.user.create({
            data: { email, hashedPassword: hash },
          })
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword as string
          )
          if (!isMatch) throw new Error('Incorrect Password')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      } else if (!token.role) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: { id: true, role: true },
        })
        if (dbUser) token.role = dbUser?.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
      }
      return session
    },
  },
}

export const auth = NextAuth(authOptions)
