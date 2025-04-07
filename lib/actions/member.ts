'use server'

import { db } from '../db'

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  maritalStatus: string
  birthDate: string // The date in string format
  gender: string
  address: string
  occupation: string
  newConvert: string
  formerReligion: string
  notes: string
  contactConsent: boolean
  disclosureConsent: boolean
  privacyConsent: boolean
}

export async function updateUser(userData: UserData) {
  try {
    console.log(userData.id)

    const response = await fetch(`/api/user/update?id=${userData}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update user')
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

export async function getUser(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

// export async function getUserByEmail(email: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: { email: email },
//     })

//     if (!user) {
//       throw new Error('User not found')
//     }

//     return user
//   } catch (error) {
//     console.error('Error fetching user:', error)
//     throw error
//   }
// }
