import Footer from '@/components/dom/footer';
import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import Scroll from '@/templates/Scroll';
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import('@/components/dom/menuLayout/MobileMenu'), { ssr: false });
// const ScrollWrapper = dynamic(() => import('@/components/dom/ScrollWrapper'), { ssr: false });


export const metadata = {
  title: 'Cory Parrish | Creative Developer',
  description: 'Official Website of Developer Cory Parrish, Creative Coder, Web Developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
     
      <body >
      {/* <Scroll> */}
        <Layout>
          <MobileMenu />
            {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
            {children}
          {/* <Footer/> */}
         </Layout>
        {/* </Scroll> */}
      </body>
      
    </html>
  )
}
