'use client'

import { deleteUser } from '@/lib/actions/actions'
import { FormModalProps } from '@/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from 'react'
// import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const deleteActionMap = {
  user: deleteUser,
}

const UsersForm = dynamic(() => import('./forms/UsersForm'), {
  loading: () => <h1>Loading...</h1>,
})
// const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
//   loading: () => <h1>Loading...</h1>,
// })
// const AnnouncementForm = dynamic(() => import('./forms/AnnouncementForm'))
// const AssignmentForm = dynamic(() => import('./forms/AssignmentForm'))
// const AttendanceForm = dynamic(() => import('./forms/AttendanceForm'))
// const ClassForm = dynamic(() => import('./forms/ClassForm'))
// const EventForm = dynamic(() => import('./forms/EventForm'))
// const ExamForm = dynamic(() => import('./forms/ExamForm'))
// const LessonForm = dynamic(() => import('./forms/LessonForm'))
// const ParentForm = dynamic(() => import('./forms/ParentForm'))
// const ResultForm = dynamic(() => import('./forms/ResultForm'))
// const SubjectForm = dynamic(() => import('./forms/SubjectForm'))

const forms: {
  [key: string]: (
    type: 'create' | 'update',
    setOpen: Dispatch<SetStateAction<boolean>>,
    data: any,
    relatedData?: any
  ) => JSX.Element
} = {
  user: (type, data, setOpen, relatedData) => (
    <UsersForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  // announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  // assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  // attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  // class: (type, data) => <ClassForm type={type} data={data} />,
  // event: (type, data) => <EventForm type={type} data={data} />,
  // exam: (type, data) => <ExamForm type={type} data={data} />,
  // lesson: (type, data) => <LessonForm type={type} data={data} />,
  // parent: (type, data) => <ParentForm type={type} data={data} />,
  // result: (type, data) => <ResultForm type={type} data={data} />,
  // subject: (type, data) => <SubjectForm type={type} data={data} />,
}

const FormModal: React.FC<FormModalProps> = ({
  table,
  type,
  data,
  id,
  relatedData,
}) => {
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
  const bgColor =
    type === 'create'
      ? 'bg-[#FAE27C]'
      : type === 'update'
      ? 'bg-[#C3EBFA]'
      : 'bg-[#CFCEFF]'

  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const Form = () => {
    const [state, formAction] = useActionState(
      (state: any, formData: FormData) =>
        deleteActionMap[table](state, formData),
      {
        success: false,
        error: false,
      }
    )

    useEffect(() => {
      if (state?.success) {
        toast.success(`Data has been deleted!`)
        setOpen(false)
        router.refresh()
      }
      if (state?.error) {
        toast.error(`Failed to delete ${table}.`)
      }
    }, [state, router])

    if (type === 'delete' && id) {
      return (
        <form
          action={formAction}
          className='p-4 flex flex-col
      gap-4 '
        >
          <input type='hidden' name='id' defaultValue={id} />
          <span className='text-center font-medium'>
            Are you sure you want to delete all data of {table}?
          </span>
          <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>
            Delete
          </button>
        </form>
      )
    }
    const RenderedForm = forms[table]
    if (type === 'create' || type === 'update') {
      return RenderedForm ? (
        RenderedForm(type, data, setOpen, relatedData)
      ) : (
        <div className='text-center py-4'>Form not found!</div>
      )
    }

    return <div className='text-center py-4'>Invalid form type!</div>
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full cursor-pointer`}
      >
        <Image src={`/icons/${type}.png`} alt='icon' width={16} height={16} />
      </button>
      {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center '>
          <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            <Form />
            <div
              className='absolute top-4 right-4 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <Image
                src='/icons/close.png'
                alt='close'
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal
