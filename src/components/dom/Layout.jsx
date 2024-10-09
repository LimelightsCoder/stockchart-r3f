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
  


    // useEffect(() => {
    //   let svg, rects = [];
    //   const numberOfSections = 4; // Number of sections
    //   const fillColor = '#ff000011'; // Color for the sections
    
    //   function createSvg() {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;
    
    //     svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //     svg.setAttribute('class', 'shadow-svg');
    //     svg.setAttribute('width', width);
    //     svg.setAttribute('height', height * numberOfSections);
    
    //     // Set styles
    //     svg.style.position = 'fixed';
    //     svg.style.top = '0';
    //     svg.style.left = '0';
    //     svg.style.zIndex = '2';
    //     svg.style.pointerEvents = 'none';
    //     svg.style.touchAction = 'none';
    
    //     // Create the filter
    //     const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    //     const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    //     filter.setAttribute('id', 'blendFilter');
    
    //     // Apply a blend mode (like 'screen' or 'difference')
    //     const feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    //     feBlend.setAttribute('mode', 'difference'); // Try 'difference', 'multiply', 'screen', etc.
    //     feBlend.setAttribute('in', 'SourceGraphic');
    //     feBlend.setAttribute('in2', 'BackgroundImage');
    //     filter.appendChild(feBlend);
    
    //     defs.appendChild(filter);
    //     svg.appendChild(defs); // Add filter to the SVG
    
    //     document.body.appendChild(svg);
    
    //     // Create sections as rects
    //     for (let i = 0; i < numberOfSections; i++) {
    //       const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    //       rect.setAttribute('x', 0);
    //       rect.setAttribute('y', i * height);
    //       rect.setAttribute('width', width);
    //       rect.setAttribute('height', height);
    //       rect.setAttribute('fill', fillColor);
    
    //       // Apply the filter
    //       rect.setAttribute('filter', 'url(#blendFilter)');
    
    //       svg.appendChild(rect);
    //       rects.push(rect); // Store rect for later resizing
    //     }
    //   }
    
    //   function resizeSvg() {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;
    
    //     // Update the size of the SVG
    //     svg.setAttribute('width', width);
    //     svg.setAttribute('height', height * numberOfSections);
    
    //     // Update the size and position of each rect
    //     rects.forEach((rect, i) => {
    //       rect.setAttribute('width', width);
    //       rect.setAttribute('height', height);
    //       rect.setAttribute('y', i * height);
    //     });
    //   }
    
    //   createSvg(); // Create the SVG initially
    //   window.addEventListener('resize', resizeSvg); // Handle window resize
    
    //   // Cleanup on component unmount
    //   return () => {
    //     window.removeEventListener('resize', resizeSvg);
    //     if (svg) {
    //       svg.remove(); // Remove the SVG when the component unmounts
    //     }
    //   };
    // }, []);
    

  return (
    <>
      {loading && (
        <Loader started={loading} onStarted={handleLoadingStarted} />
      )}
      {!loading && ( // Render the Scene only after loading is done
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
      )}
    </>

  )
}

export { Layout }
