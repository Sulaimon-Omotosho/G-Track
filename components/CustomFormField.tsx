'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/LoginInForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-black bg-black'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='bg-black placeholder:text-dark-700 border-black h-11 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PASSWORD:
      return (
        <div className='flex rounded-md border border-black bg-black'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              type='password'
              required
              placeholder={placeholder}
              {...field}
              className='bg-black placeholder:text-dark-700 border-black h-11 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='NG'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='mt-2 h-11 rounded-md px-3 text-sm border bg-black placeholder:text-black border-black text-white'
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-black bg-black text-white'>
          <Image
            src='/icons/calendar.svg'
            height={24}
            width={24}
            alt='calendar'
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName='overflow-hidden border-transparent w-full placeholder:text-white  h-11 text-14-medium rounded-md px-3 outline-none'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.change} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='bg-black  placeholder:text-black border-black h-11 focus:ring-0 focus:ring-offset-0'>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='bg-black border-black'>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='bg-black text-white placeholder:text-black border-black focus-visible:ring-0 focus-visible:ring-offset-0'
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className='border-black'
            />
            <label
              htmlFor={props.name}
              className='cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none'
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      )

    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className='text-red-400' />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
