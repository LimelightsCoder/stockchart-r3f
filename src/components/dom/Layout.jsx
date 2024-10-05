'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const Loader = dynamic(() => import('../canvas/loader/Loader'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const [loading, setLoading] = useState(true);

  const handleLoadingStarted = () => {
    setLoading(false); // Once loading finishes, hide the loader
  };

    // Use effect to hide body and html while loading
    useEffect(() => {
      const html = document.documentElement;
      const body = document.body;
  
      if (loading) {
        html.style.overflow = 'hidden'; // Prevent scrolling on html
        body.style.overflow = 'hidden'; // Prevent scrolling on body
      } else {
        html.style.overflow = ''; // Restore overflow
        body.style.overflow = ''; // Restore overflow
      }
  
      return () => {
        html.style.overflow = ''; // Cleanup on unmount
        body.style.overflow = ''; // Cleanup on unmount
      };
    }, [loading]);

  return (
    <>
    {loading && <Loader started={loading} onStarted={handleLoadingStarted} />}
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
      }}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
    </>
  )
}

export { Layout }
