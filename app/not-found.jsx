'use client'
import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link';
const CurrentTime = dynamic(() => import('@/components/dom/utils/CurrentTime'), { ssr: false });
const Glass = dynamic(() => import('@/components/canvas/glass/Glass'), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className=' flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {

  return (

 <div className="relative h-screen w-full flex flex-col justify-center items-center  text-white " style={{  zIndex:2, mixBlendMode:'difference' }}>
      <h1 className="flex  text-6xl font-bold mb-4 select-none" >404</h1>
      <p className="flex  text-lg mb-8 select-none" >Under Construction, coming soon!</p>
      <Link href="/">
        <p className="flex  text-blue-400 underline hover:text-blue-300" >
          Lets get you back home
        </p>
      </Link>
      
      {/* <CurrentTime/> */}
    </div>

  )
}
