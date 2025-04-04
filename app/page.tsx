import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex gap-2 justify-center items-center h-screen'>
      <Image src='/images/logo-hicc.jpeg' alt='logo' width={120} height={120} />
      <p className='text-3xl font-black'>Growth Tracker</p>
    </div>
  )
}
