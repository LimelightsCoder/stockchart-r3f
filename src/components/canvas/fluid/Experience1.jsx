'use client'
import {
  EffectComposer,
  Noise,
  ToneMapping,
  Pixelation,
  Grid,
  SSAO,
  ChromaticAberration,
} from "@react-three/postprocessing";
import {
  BlendFunction,
} from "postprocessing";
import { Fluid } from './Fluid';
import { useEffect, useState } from "react";
import { Leva, useControls } from "leva";

const Experience1 = () => {
  const [isMobile] = useState(window.innerWidth <= 768);
  const [activeScene, setActiveScene] = useState(1); // Track active scene
  // const Width = window.innerWidth;
  // const Height = window.innerHeight;

  // Set mobile state based on window size
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //     // Optionally, you can trigger a re-render or update
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Define the cursor radius based on device
  const cursorRadius = isMobile ? 0.055 : 0.15;

  // Leva control for scene switching
  // const { scene } = useControls({
  //   scene: {
  //     value: 1, // Default to scene 1
  //     options: { Scene1: 1, Scene2: 2 }, // Scene switcher options
  //   },
  // });

  // // Update the active scene whenever scene control is changed
  // useEffect(() => {
  //   setActiveScene(scene); // Update the active scene based on the control
  // }, [scene]);

  
  return (
    <>
     

      <EffectComposer>

          <Fluid
            activeScene={activeScene} // Pass the current active scene to Fluid
            curl={0.75}
            radius={cursorRadius}
            distortion={0.5}
            force={10}
            swirl={0.75}
            blend={10}
            pressure={0.9}
            fluidColor={activeScene === 1 ? '#ffffff' : '#0000ff'} // Change fluid color based on scene
            intensity={0.5}
            densityDissipation={0.9}
            velocityDissipation={0.9}
            rainbow={false}
            showBackground={false}
            // alpha={0.5} 
          />
           <Pixelation
            granularity={10}
          />
            <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0125, 0.00125]} // color offset
        />

      </EffectComposer>
    </>
  );
};

export default Experience1;
