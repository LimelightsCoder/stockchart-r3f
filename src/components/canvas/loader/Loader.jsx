// 'use client';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Pixelation, Noise, Bloom } from '@react-three/postprocessing';
// import { 
// // GlitchMode,
// // BlurPass,
// // Resizer, 
// // ToneMappingMode , 
// // Resolution, 
// KernelSize } from "postprocessing";
// import styles from './style.module.scss'; // Ensure this CSS module exists

// // WebGL Cube component
// const RotatingCube = ({ progress }) => {
//   const meshRef = useRef();

//   useFrame(() => {
//     if (meshRef.current) {
//       // Rotate the cube based on loading progress
//       meshRef.current.rotation.x += 0.01 + (progress / 100) * 0.05;
//       meshRef.current.rotation.y += 0.01 + (progress / 100) * 0.05;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color={new THREE.Color(`#ffffff`)} />
//     </mesh>
//   );
// };

// // Shuffle function
// const shuffle = (array) => {
//   let currentIndex = array.length, randomIndex;
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//   }
//   return array;
// };

// // Pixelated block animation
// // const PixelBlock = ({ index, isAnimating }) => {
// //   const [color, setColor] = useState('rgb(0, 0, 0)'); // Initial color (black)

// //   useEffect(() => {
// //     if (isAnimating) {
// //       const mixColor = () => {
// //         const r = Math.floor(Math.random() * 256); // Random red value (0-255)
// //         const g = Math.floor(Math.random() * 256); // Random green value (0-255)
// //         const b = Math.floor(Math.random() * 256); // Random blue value (0-255)

// //         // Blend with black (adjust the weight for more/less black)
// //         const blendFactor = 0.3; // Change this value to control the blending with black
// //         const blendedColor = `rgb(${Math.floor(r * (1 - blendFactor))}, ${Math.floor(g * (1 - blendFactor))}, ${Math.floor(b * (1 - blendFactor))})`;
        
// //         setColor(blendedColor);
// //       };

// //       const interval = setInterval(mixColor, 100); // Change color every 100ms

// //       return () => clearInterval(interval); // Clean up the interval
// //     }
// //   }, [isAnimating]);

// //   const anim = {
// //     initial: { opacity: 1, scale: 1 },
// //     animate: isAnimating
// //       ? { opacity: 0, scale: 0, transition: { duration: 2, delay: index * 0.03 } }
// //       : { opacity: 1, scale: 1 },
// //   };

// //   return (
// //     <motion.div
// //       className={styles.block}
// //       variants={anim}
// //       initial="initial"
// //       animate="animate"
// //       style={{ backgroundColor: color }} // Apply blended RGB color
// //     />
// //   );
// // };

// const PixelBlock = ({ index, isAnimating }) => {
//   const [color, setColor] = useState('rgb(0, 0, 0)'); // Initial color (black)

//   // Define your custom colors
//   const colors = [
//     // 'rgb(255, 0, 0)',   // Red
//     // 'rgb(0, 255, 0)',   // Green
//     // 'rgb(0, 0, 255)',   // Blue
//     // 'rgb(255, 255, 0)', // Yellow
//     // 'rgb(255, 0, 255)', // Magenta
//     // 'rgb(0, 0, 0)',
//     'rgb(255,255,255)'
//   ];

//   useEffect(() => {
//     if (isAnimating) {
//       const mixColor = () => {
//         // Randomly select a color from the colors array
//         const randomIndex = Math.floor(Math.random() * colors.length);
//         const selectedColor = colors[randomIndex];

//         // Blend with black (adjust the weight for more/less black)
//         const blendFactor = 0.0; // Change this value to control the blending with black
//         const [r, g, b] = selectedColor.match(/\d+/g).map(Number); // Extract RGB values

//         const blendedColor = `rgb(${Math.floor(r * (1 - blendFactor))}, ${Math.floor(g * (1 - blendFactor))}, ${Math.floor(b * (1 - blendFactor))})`;
        
//         setColor(blendedColor);
//       };

//       const interval = setInterval(mixColor, 100); // Change color every 100ms

//       return () => clearInterval(interval); // Clean up the interval
//     }
//   }, [isAnimating]);

//   const anim = {
//     initial: { opacity: 1, scale: 1 },
//     animate: isAnimating
//       ? { opacity: 0.0, scale: 0, transition: { duration: 3, delay: index * 0.03 } }
//       : { opacity: 1, scale: 1 },
//   };

//   return (
//     <motion.div
//       className={styles.block}
//       variants={anim}
//       initial="initial"
//       animate="animate"
//       style={{ backgroundColor: color }} // Apply blended RGB color
//     />
//   );
// };




// // Loader component
// const Loader = ({ started, onStarted, loadingDuration = 3000 }) => {
//   const [displayProgress, setDisplayProgress] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false); // State to control pixel animation

//   useEffect(() => {
//     const interval = 100; // Update progress every 100 ms
//     const totalSteps = loadingDuration / interval;
//     let currentStep = 0;

//     const timer = setInterval(() => {
//       currentStep++;
//       setDisplayProgress((currentStep / totalSteps) * 100);

//       if (currentStep >= totalSteps) {
//         clearInterval(timer);
//         setTimeout(() => {
//           setIsAnimating(true); // Start pixel animation after loading
//           setTimeout(() => onStarted(), 500); // Delay before calling onStarted
//         }, 500);
//       }
//     }, interval);

//     return () => clearInterval(timer);
//   }, [loadingDuration, onStarted]);

//   const getBlocks = () => {
//     const { innerWidth, innerHeight } = window;
//     const blockSize = innerWidth * 0.05;
//     const nbOfBlocks = Math.ceil(innerHeight / blockSize);
//     const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));

//     return shuffledIndexes.map((_, index) => (
//       <div key={index} className={styles.column}>
//         <PixelBlock index={index} isAnimating={isAnimating} />
//       </div>
//     ));
//   };

//   return (
//     <AnimatePresence>
//       {started && (
//         <motion.div
//           className="loading-screen"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0, transition: { duration: 0.5 } }}
//         >
//           <div className="webgl-canvas-container">
//             <Canvas>
//               <ambientLight />
//               <pointLight position={[5, 5, 5]} />
//               <RotatingCube progress={displayProgress} />
//               <EffectComposer>
//                 <Pixelation granularity={4} />
//                 <Noise opacity={0.2} />
//                 <Bloom
//                 luminanceThreshold={0}
//                 luminanceSmoothing={0.9}
//                 height={400}
//                 intensity={0.35}
//                 radius={2}
//                 kernelSize={KernelSize.LARGE} // blur kernel size
//                 mipmapBlur={false} // Enables or disables mipmap blur.
//               />
//               </EffectComposer>
//             </Canvas>
//           </div>

//           {/* Pixelated Blocks */}

//           <div className={styles.pixelBackground}>
//             {
//                 [...Array(20)].map( (_, index) => {
//                     return <div key={index} className={styles.column}>
//                         {
//                           getBlocks()
//                         }
//                     </div>
//                 })
//             }
//         </div>

//           {/* Loading Progress as percentage */}
//           <div className="loaderText">
//             <div className="percentage">{Math.min(Math.round(displayProgress), 100)}%</div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Loader;

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Pixelation, Noise, Bloom, DotScreen } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from "postprocessing";
import { Text } from '@react-three/drei'; // Import Text from drei
import styles from './style.module.scss'; // Ensure this CSS module exists

// Import the PixelationShader (transition effect)
import DissolveTransition from './PixelTransition'; // Assuming this is in the same folder

// WebGL Cube component
const RotatingCube = ({ progress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Rotate the cube based on loading progress
      meshRef.current.rotation.x += 0.01 + (progress / 100) * 0.05;
      meshRef.current.rotation.y += 0.01 + (progress / 100) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={new THREE.Color(`#ffffff`)} />
    </mesh>
  );
};

// Loader component
const Loader = ({ started, onStarted, loadingDuration = 3000 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // State to control pixel animation
  const [showPixelTransition, setShowPixelTransition] = useState(false); // Control the pixelation shader
  const [pixelSize, setPixelSize] = useState(1); // Initialize pixel size for smooth transition
  const isMobile = window.innerWidth <= 768;
  //const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = 100; // Update progress every 100 ms
    const totalSteps = loadingDuration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        clearInterval(timer);

        // Start the smooth transition
        setTimeout(() => {
          setIsAnimating(true); // Start pixel block animation after loading
          setShowPixelTransition(true); // Trigger shader effect

          // Animate the pixel size from small to large over 3 seconds
          let pixelInterval = setInterval(() => {
            setPixelSize((prev) => {
              if (prev >= 50) { // Set max pixel size for full effect
                clearInterval(pixelInterval);
                setTimeout(() => {
                  //setScale(1.25);
                  onStarted(); // Trigger final start
                }, 800); // Delay to let the effect complete
                return prev;
              }
              return prev + 1; // Increment pixel size
            });
          }, 100); // Update every 100ms for smooth transition

        }, 20); // Wait a bit before starting transition
      }
    }, interval);

    return () => clearInterval(timer);
  }, [loadingDuration, onStarted]);

  return (
    <AnimatePresence>
      {started && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          //style={{ scale }}
        >
          <div className="webgl-canvas-container">
            <Canvas>
              <ambientLight />
              <pointLight position={[5, 5, 5]} />
              {/* <RotatingCube progress={displayProgress} /> */}
              <EffectComposer>
              {!isMobile && (
                <>
                <Pixelation granularity={4} />
                
                <DotScreen
                  blendFunction={BlendFunction.COLOR_DODGE} // blend mode
                  angle={Math.PI * 0.5} // angle of the dot pattern
                  scale={25.0} // scale of the dot pattern
                />
                <Bloom
                  luminanceThreshold={0}
                  luminanceSmoothing={0.9}
                  height={400}
                  intensity={0.35}
                  radius={2}
                  kernelSize={KernelSize.LARGE} // blur kernel size
                  mipmapBlur={false} // Enables or disables mipmap blur.
                />
                  </>
                )}
                {isMobile && (
                   <>
                    <Pixelation granularity={4} />
                    <DotScreen
                  blendFunction={BlendFunction.COLOR_DODGE} 
                  angle={Math.PI * 0.5}
                  scale={25.0}
                />
                </>
                  )}
              </EffectComposer>

              {/* Animated Text */}
              <Text
            position={[0, 0, 0]} // Position in 3D space
            fontSize={0.5} // Adjust font size
            color="#ffffff" // Set text color
            anchorX="center" // Center the text
            anchorY="middle" // Center the text
            // Animate scale based on progress
            scale={[1 + (displayProgress / 100) * 0.5, 1 + (displayProgress / 100) * 0.5, 1]}
            // Animation properties
          >
            {/* {` ${Math.min(Math.round(displayProgress), 100)}%`} */}
            {displayProgress < 100 ? `${Math.min(Math.round(displayProgress), 100)}%` : '</>'}
          </Text>


              {/* Show Pixelation Transition Shader when loading completes with fade-in effect */}
              {showPixelTransition && (
                <motion.mesh
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                  <DissolveTransition pixelSize={pixelSize} />
                </motion.mesh>
              )}
            </Canvas>
          </div>
       
         
          <div className="loaderContainer">
  <div className="loader">
    <svg
      width="404"
      height="370"
      viewBox="0 0 404 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.4111 367.216C36.654 361.492 16.4084 344.541 8.28886 327.769C-6.15558 297.931 0.146114 260.599 23.26 239.084C40.0763 223.426 50.4734 219.374 80.1676 216.906C103.73 214.959 118.964 208.96 129.777 197.401C149.935 175.858 152.937 143.086 137.062 117.847C111.845 77.7561 130.024 22.5378 173.94 5.82594C210.726 -8.16999 252.711 8.41094 270.095 43.8187C275.487 54.7966 276.308 59.1374 276.308 76.6516C276.308 95.8578 275.852 97.7613 266.861 115.9C261.521 126.673 256.781 139.947 255.96 146.43C252.999 169.806 265.918 195.622 287.145 208.748C296.438 214.492 300.867 215.567 321.225 217.02C338.839 218.263 347.641 220.075 356.832 224.282C408.375 247.879 419.513 312.813 378.363 349.812C362.03 364.496 346.157 369.992 323.403 368.84C308.345 368.068 303.18 366.725 291.258 360.36C277.264 352.904 265.684 341.248 258.819 327.709C254.347 318.893 236.599 302.537 227.396 298.75C196.855 286.191 165.331 296.937 146.248 326.45C127.057 356.117 105.057 369.492 76.0709 369.122C67.7915 369.122 58.4946 368.156 55.4111 367.216Z"
        fill="#ffffff"
      />
    </svg>
  </div>

  {/* Loading Progress as percentage */}
  <div className="loaderText">
    <div className="percentage">{Math.min(Math.round(displayProgress), 100)}%</div>
  </div>
</div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
