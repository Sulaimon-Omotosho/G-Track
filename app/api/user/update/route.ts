import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

interface UpdateUserData {
  // id?: string
  name: string
  email: string
  phone: string
  maritalStatus: string
  birthDate: Date
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

async function updateUserInDatabase(userData: UpdateUserData, id: string) {
  try {
    const birthDate = new Date(userData.birthDate)

    // Check if the date is invalid
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid date format for this dob')
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...userData, // Spread the rest of the properties
        birthDate: new Date(userData.birthDate), // Ensure dob is a Date object
        updatedAt: new Date(),
      },
    })
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    throw error // Re-throw the error for handling in the API route
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    // console.log(id)

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const userData: UpdateUserData = await req.json()

    const updatedUser = await updateUserInDatabase(userData, id)

    return NextResponse.json(
      { message: 'User updated successfully', updatedUser },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
