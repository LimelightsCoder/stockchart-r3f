'use client'
import React, { useEffect, useRef } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import LocomotiveScroll styles

export const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null); // Using ref to reference scroll container

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current, // Reference the scroll container
        smooth: true, // Enable smooth scrolling
        tablet: { smooth: true }, // Enable smooth on tablets
        smartphone: { smooth: true }, // Enable smooth on smartphones
      });

      return () => {
        if (locomotiveScroll) locomotiveScroll.destroy(); // Clean up on unmount
      };
    })();
  }, []);

  return <div ref={scrollRef} data-scroll-container>{children}</div>;
};
