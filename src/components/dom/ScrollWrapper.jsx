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

// 'use client';
// import React, { useEffect, useRef } from 'react';
// import NormalizeWheel from 'normalize-wheel';
// import { lerp } from './utils/math'; // Assuming your math.js utils

// const ScrollWrapper = ({ children }) => {
//   const scrollRef = useRef({
//     ease: 0.1,
//     current: 0,
//     target: 0,
//   });

//   const containerRef = useRef(null);
//   const itemsRef = useRef([]);

//   // Throttle the wheel event handler
//   useEffect(() => {
//     let ticking = false;

//     const onWheel = (event) => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const normalized = NormalizeWheel(event);
//           const speed = normalized.pixelY * 0.5;
//           scrollRef.current.target += speed;
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('wheel', onWheel);

//     return () => {
//       window.removeEventListener('wheel', onWheel);
//     };
//   }, []);

//   // Update scroll position
//   useEffect(() => {
//     const updateScroll = () => {
//       const { ease, current, target } = scrollRef.current;
//       scrollRef.current.current = lerp(current, target, ease);

//       // Apply the transform to each item based on scroll position
//       itemsRef.current.forEach((item) => {
//         if (item) {
//           const y = -scrollRef.current.current;
//           item.style.transform = `translate3d(0, ${Math.floor(y)}px, 0)`;
//         }
//       });

//       requestAnimationFrame(updateScroll);
//     };

//     updateScroll(); // Start animation loop
//   }, []);

//   return (
//     <div className="scroll-container" ref={containerRef}>
//       {React.Children.map(children, (child, index) => (
//         <div ref={(el) => (itemsRef.current[index] = el)}>
//           {child}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ScrollWrapper;
