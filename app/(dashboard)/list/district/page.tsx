import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, studentsData } from '@/constants'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'District',
    accessor: 'district',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Communities',
    accessor: 'communities',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Email',
    accessor: 'email',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const DistrictLeadersList = () => {
  const renderRow = (item: User) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50  hover:bg-[#F1F0FF] dark:hover:bg-[#CFCEFF]'
    >
      <td className='flex items-center gap-4 p-4'>
        <Image
          src={item.photo!}
          alt='image'
          width={40}
          height={40}
          className='md:hidden xl:block w-10 h-10 rounded-full object-fit'
        />
        <div className='flex flex-col '>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item?.gender}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.id}</td>
      <td className='hidden md:table-cell'>{item.gender}</td>
      <td className='hidden lg:table-cell'>{item.phone}</td>
      <td className='hidden lg:table-cell'>{item.email}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/district/5357249757`}>
            <button className='flex items-center justify-center rounded-full bg-[#C3EBFA] cursor-pointer'>
              <Image src='/icons/view.png' width={16} height={16} alt='view' />
            </button>
          </Link>
          {role === 'admin' && (
            <FormModal table='student' type='delete' id={item.id as any} />
          )}
        </div>
      </td>
    </tr>
  )

  return (
    <div className='bg-white dark:bg-black p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>District Leaders</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] rounded-full'>
              <Image
                src='/icons/filter.png'
                alt='filter button'
                width={14}
                height={14}
              />
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] rounded-full'>
              <Image
                src='/icons/sort.png'
                alt='sort button'
                width={14}
                height={14}
              />
            </button>
            {role === 'admin' && <FormModal table='student' type='create' />}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      <Pagination />
    </div>
  )
}

export default DistrictLeadersList
