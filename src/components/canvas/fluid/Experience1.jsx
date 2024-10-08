'use client'
import {
  EffectComposer,
  Noise,
  ToneMapping,
  Pixelation,
  Grid,
  SSAO,
  N8AO
} from "@react-three/postprocessing";
import {
  BlendFunction,
} from "postprocessing";
import { Fluid } from './Fluid';
import { useEffect, useState } from "react";
import { Leva, useControls } from "leva";

const Experience1 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeScene, setActiveScene] = useState(1); // Track active scene
  const Width = window.innerWidth;
  const Height = window.innerHeight;

  // Set mobile state based on window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check the window size on mount and on resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            force={10}
            swirl={0.75}
            blend={10}
            pressure={0.9}
            fluidColor={activeScene === 1 ? '#ffffff' : '#0000ff'} // Change fluid color based on scene
            intensity={1.5}
            densityDissipation={0.9}
            velocityDissipation={0.9}
            rainbow={false}
            showBackground={false}
          />
           <Pixelation
            granularity={10}
          />
          

      </EffectComposer>
    </>
  );
};

export default Experience1;
