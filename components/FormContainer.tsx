import React from 'react'
import FormModal from './FormModal'
import { db } from '@/lib/db'
// import { getUserData } from '@/lib/utils'
import { FormModalProps } from '@/types'

const FormContainer = async ({ table, type, data, id }: FormModalProps) => {
  let relatedData = {}

  if (type !== 'delete') {
    switch (table) {
      case 'cell':
        const cell = await db.cell.findMany({
          select: { id: true, name: true },
        })
        relatedData = { cell: cell }
        break
      // case 'user':
      //   const teacherSubjects = await db.subject.findMany({
      //     select: { id: true, name: true },
      //   })
      //   relatedData = { subjects: teacherSubjects }
      //   break
      // case 'class':
      //   const classGrades = await db.grade.findMany({
      //     select: { id: true, level: true },
      //   })
      //   const classTeachers = await db.teacher.findMany({
      //     select: { id: true, name: true, surname: true },
      //   })
      //   relatedData = { teachers: classTeachers, grades: classGrades }
      //   break
      // case 'student':
      //   const studentGrades = await db.grade.findMany({
      //     select: { id: true, level: true },
      //   })
      //   const studentClasses = await db.class.findMany({
      //     include: { _count: { select: { students: true } } },
      //   })
      //   relatedData = { grades: studentGrades, classes: studentClasses }
      //   break
      // case 'exam':
      // const { role, userId } = await getUserData()

      // const examLessons = await db.lesson.findMany({
      //   where: {
      //     ...(role === 'teacher'
      //       ? { teacher: { is: { clerkId: userId! } } }
      //       : {}),
      //   },
      // select: { id: true, name: true },
      // })
      // relatedData = { lessons: examLessons }
      // break
      default:
        break
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  )
}

export default FormContainer
