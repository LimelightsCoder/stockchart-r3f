// 'use client';
// import React, { useEffect, useRef } from 'react';
// import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import LocomotiveScroll styles

// export const ScrollWrapper = ({ children }) => {
//   const scrollRef = useRef(null); // Using ref to reference scroll container

//   useEffect(() => {
//     (async () => {
//       const LocomotiveScroll = (await import('locomotive-scroll')).default;
//       const locomotiveScroll = new LocomotiveScroll({
//         el: scrollRef.current, // Reference the scroll container
//         smooth: true, // Enable smooth scrolling
//         lenisOptions: {
//           wrapper: window,
//           content: document.documentElement,
//           lerp: 0.1,
//           duration: 1.2,
//           orientation: 'vertical',
//           gestureOrientation: 'vertical',
//           smoothWheel: true,
//           smoothTouch: true,
//           wheelMultiplier: 1,
//           touchMultiplier: 2,
//           easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         },
//       });

//       return () => {
//         if (locomotiveScroll) locomotiveScroll.destroy(); // Clean up on unmount
//       };
//     })();
//   }, []);

//   return <div ref={scrollRef} data-scroll-container>{children}</div>;
// };
