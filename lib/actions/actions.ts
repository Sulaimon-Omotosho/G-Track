'use server'

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
