import { MaritalStatus } from '@/constants'
import { z } from 'zod'

export const UserFormValidation = z.object({
  password: z
    .string()
    .min(2, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  email: z.string().email('Invalid email address'),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
})

export const LoginFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
})

export const MemberFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  formerReligion: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['male', 'female']),
  newConvert: z.enum(['yes', 'no', 'reborn']),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  notes: z.string().optional(),
  contactConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to contact in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
})

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().optional(),
  // primaryPhysician: z
  //   .string()
  //   .min(2, 'Select at least one doctor')
  //   .max(500, 'Must be at least 500 characters'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
})

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
})

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
})

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema
    case 'cancel':
      return CancelAppointmentSchema
    default:
      return ScheduleAppointmentSchema
  }
}

export const CreateAnnouncementSchema = z.object({
  title: z.string().min(4, { message: 'Title must be at least 4 characters!' }),
  from: z.string().min(5, { message: 'From is required!' }),
  description: z.string().min(20, { message: 'Description is required!' }),
  date: z.date({ message: 'Date is required!' }),
  img: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'File is required',
    })
    .optional(),
})

export const CreateEventSchema = z.object({
  title: z.string().min(4, { message: 'Title must be at least 4 characters!' }),
  from: z.string().min(5, { message: 'From is required!' }),
  description: z.string().min(20, { message: 'Description is required!' }),
  date: z.date({ message: 'Date is required!' }),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time'),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time'),
  img: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'File is required',
    })
    .optional(),
})
