'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
// const Loader = dynamic(() => import('../canvas/loader/Loader'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()
  const [loading, setLoading] = useState(true);

  const handleLoadingStarted = () => {
    setLoading(false); // Once loading finishes, hide the loader
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden !important';
    } else {
      document.body.style.overflow = 'auto !important';
    }
  
    return () => {
      document.body.style.overflow = 'auto !important';
    };
  }, [loading]);
  


  return (
    <>
      {/* {loading && (
        <Loader started={loading} onStarted={handleLoadingStarted} />
      )}
      {!loading && (  */}
        <div
          ref={ref}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
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
            eventPrefix="client"
          />
        </div>
      {/* )} */}
    </>

  )
}

export { Layout }
