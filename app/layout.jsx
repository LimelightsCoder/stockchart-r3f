import Footer from '@/components/dom/footer';
import { Layout } from '@/components/dom/Layout'
// import { ScrollWrapper } from '@/components/dom/ScrollWrapper';
import '@/global.css'
import Scroll from '@/templates/Scroll';
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import('@/components/dom/menuLayout/MobileMenu'), { ssr: false });

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
     
      <body>
      <Scroll>
        <Layout>
          <MobileMenu />
            {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
            {children}
          <Footer/>
         </Layout>
        </Scroll>
      </body>
      
    </html>
  )
}
