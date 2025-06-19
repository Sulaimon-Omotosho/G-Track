'use server'

import { Announcement } from '@prisma/client'
import { db } from '../db'

export type CurrentState = { success: boolean; error: boolean }

// USER ACTIONS
export const deleteUser = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string

  if (id) {
    try {
      await db.user.delete({
        where: {
          id,
        },
      })

      return { success: true, error: false }
    } catch (error) {
      console.log(error)
      return { success: false, error: true }
    }
  }
}

// CREATE ANNOUNCEMENT
export const createAnnouncement = async (
  currentState: CurrentState,
  data: Announcement
) => {
  try {
    await db.announcement.create({
      data: {
        title: data.title,
        from: data.from,
        desc: data.desc,
        img: data.img?.[0] ?? null,
        districtId: data.districtId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.error(error)
    return { success: false, error: true }
  }
}

// UPDATE ANNOUNCEMENT
export const updateAnnouncement = async (
  currentState: CurrentState,
  data: Announcement
) => {
  try {
    await db.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        from: data.from,
        desc: data.desc,
        img: data.img?.[0] ?? null,
        districtId: data.districtId,
      },
    })

    return { success: true, error: false }
  } catch (error) {
    console.error(error)
    return { success: false, error: true }
  }
}

// DELETE ANNOUNCEMENT ACTIONS
export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string

  if (id) {
    try {
      await db.announcement.delete({
        where: {
          id,
        },
      })

      return { success: true, error: false }
    } catch (error) {
      console.log(error)
      return { success: false, error: true }
    }
  }
}
