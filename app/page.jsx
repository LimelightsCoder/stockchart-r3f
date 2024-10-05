'use client'

import Experience2 from '@/components/canvas/fluid/Experience2'
// import Glass from '@/components/canvas/glass/Glass'
// import VideoSection from '@/components/canvas/video/VideoSection'

import Projects from '@/components/dom/projects'
import WordSplit from '@/components/dom/textSplit/WordSplit'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense, useState } from 'react'
const CurrentTime = dynamic(() => import('@/components/dom/utils/CurrentTime'), { ssr: false });
const Glass = dynamic(() => import('@/components/canvas/glass/Glass').then((mod) => mod.Logo), { ssr: false })
const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
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
  const [menuIsActive, setMenuIsActive] = useState(false);

  
  const HeroParagraph = `I am a developer and designer with a multicultural background, having lived in diverse locations such as New York and California, currently working as an independent creative.`;
  const AboutParagraph = `I’m a developer with three years of self-taught experience, beginning my journey in the arts and economics. I specialize in creating engaging and interactive frontend experiences. My freelance work has allowed me to collaborate with diverse clients and industries, delivering cutting-edge web solutions using JavaScript, React, Next.js, and Node.js, alongside advanced 3D development skills in WebGL, THREE.js, and React Three Fiber. When I'm not at my computer, I enjoy staying fit through activities like hiking and weightlifting, or learning new skills like music production.`;
  const Skill1 = `A versatile programming language that enables dynamic content and interactivity on web pages, forming the backbone of modern web development. It is essential for smooth scrolling, animations, and DOM manipulation.`;
  const Skill2 = `A JavaScript API for rendering interactive 2D and 3D graphics in the browser without the need for plugins, allowing for immersive visual experiences. It leverages GPU power for enhanced performance.`;
  const Skill3 = `A JavaScript runtime built on Chrome's V8 engine, enabling the development of scalable server-side applications and APIs with ease.`;
  const Skill4 = `My preferred CMS that provides clients with an easy and intuitive way of managing content, making it simple to create and update their web presence.`;


  return (
    <>
      {/* Main Container */}
      <div className='relative size-full text-center overflow-hidden' 
      // style={{mixBlendMode: 'difference'}}
      >
        
        {/* Overlay HTML Content */}
        <div className='relative flex flex-col items-center justify-center w-full h-full text-white' style={{ pointerEvents: 'none', zIndex:2 }}>
          {/* Title Section with 100vh height */}
          <div className='flex flex-col items-start justify-center h-screen w-[96vw] text-start'>
          {/* <h1 className='flex relative my-4 text-5xl font-bold leading-tight uppercase'>Cory.dev</h1> */}
            <p className='flex uppercase text-[5vw] pointer-events-none select-none'>creative developer</p>
            <div className='flex relative w-[65vw] pointer-events-none select-none'>
                <WordSplit value={HeroParagraph} className='text-[2vw] pointer-events-none select-none'/>
            </div>
            
            <p className="flex relative text-start justify-start items-start mt-12 text-[2.5vw] pointer-events-none select-none">Based in Los Angeles</p>
            <CurrentTime/>
            
            <div className="field">
              <div className="mouse"></div>
            </div>
            
          </div>


          <div className='flex relative h-px w-screen bg-[#ffffffcc] '/>


          {/* Project Overview Section */}
          <section className="mt-10 mb-10 text-center">
            <h2 className="flex w-[96vw] px-4 text-[3.75vw] font-bold uppercase pointer-events-none select-none">Experiments</h2>
            {/* <p className="mt-2 text-lg">Selection of demo projects, and experiments.</p> */}
          </section>
          {/* Project Cards Section */}
          <section className="relative flex" style={{pointerEvents: 'auto',  zIndex: 11, touchAction:'unset'}}>
            <Projects />
          </section>

          <h2 className="flex w-[96vw] text-[2vw] font-bold uppercase pointer-events-none select-none text-[#5f5f5f]">core tools</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4 mb-[100px] pointer-events-none select-none">
  <div className="p-4 text-white" style={{ height: 'auto' }}>
    <div style={{ fontSize: '3vw' }}>JavaScript</div>
    <WordSplit value={Skill1} />
  </div>
  <div className="p-4 text-white" style={{ height: 'auto' }}>
    <div style={{ fontSize: '3vw' }}>WebGL</div>
    <WordSplit value={Skill2} />
  </div>
  <div className="p-4 text-white" style={{ height: 'auto' }}>
    <div style={{ fontSize: '3vw' }}>Node.js</div>
    <WordSplit value={Skill3} /> 
     </div>
  <div className="p-4 text-white" style={{ height: 'auto' }}>
    <div style={{ fontSize: '3vw' }}>Prismic.io</div>
    <WordSplit value={Skill4} />
      </div>
</section>



            {/* About */}
            <section className="mt-10 mb-10 text-center">
            <h2 className="flex w-[96vw] px-4 text-[3.75vw] font-bold uppercase pointer-events-none select-none">About</h2>
            {/* <p className="mt-2 text-md sm:max-w-[75vw]">
            </p> */}
            <div className="flex px-4  mt-2 sm:max-w-[75vw] pointer-events-none select-none">
            <WordSplit value={AboutParagraph} />
            </div>
          </section>



          <section className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-[100px] pointer-events-none select-none">
          <div className="border rounded-sm p-4 text-white" style={{ height: '300px' }}>
            <Image
              src="/img/IMG_9225.jpg"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Picture of the author"
            />
          </div>
          <div className="border rounded-sm p-4 text-white" style={{ height: '300px' }}>
            <Image
              src="/img/IMG_7328.jpg"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Picture of the author"
            />
          </div>
          <div className="border rounded-sm p-4 text-white" style={{ height: '300px' }}>
            <Image
              src="/img/IMG_8321.jpg"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Picture of the author"
            />
          </div>
          <div className="border rounded-sm p-4 text-white" style={{ height: '300px' }}>
            <Image
              src="/img/IMG_3100.JPG"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Picture of the author"
            />
          </div>
            {/* <div className="border rounded-sm p-4  text-white">
              <h3 className="text-xl font-semibold uppercase">Resources</h3>
              <p className="mt-2 text-lg">Posts about exciting topics, and innovations in the tech world.</p>
            </div> */}
          </section>
          {/* <section className="grid grid-cols-1 h-screen sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className=" w-screen  p-4  text-white">
              <h3 className="text-[3.75vw] font-semibold uppercase">Lets Work</h3>
            </div>
          </section> */}
        </div>


        {/* Button Section */}
        {/* <div style={{
          position: 'fixed',
          zIndex: 15,
          top: '20px',
          right: '20px',
          pointerEvents: 'auto',
          display: 'flex',
          gap: '10px',
          fontSize:'2.25vw',
          
        }}>
          <button onClick={() => console.log('Button Clicked!')} style={{ color: 'white',  paddingRight: '10px', paddingLeft: '10px', borderRadius: '24px', textTransform:'uppercase' }}>
            Experiments
          </button>
          <button onClick={() => console.log('Button Clicked!')} style={{ color: 'white',  paddingRight: '10px', paddingLeft: '10px', borderRadius: '24px', textTransform:'uppercase' }}>
            About
          </button>
          <button onClick={() => console.log('Button Clicked!')} style={{ color: 'white',  paddingRight: '10px', paddingLeft: '10px', borderRadius: '24px', textTransform:'uppercase' }}>
            Contact
          </button>
        </div> */}



        {/* View Component with Fixed Position */}
        {/* <View className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-1' style={{touchAction:'unset'}}>
          <Suspense fallback={null}>
            <Experience2 />
            <Common />
          </Suspense>
        </View> */}
      </div>
    </>
  )
}
