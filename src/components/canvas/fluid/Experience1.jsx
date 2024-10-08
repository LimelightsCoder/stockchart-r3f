'use client'
import {
  EffectComposer,
  Noise,
  ToneMapping,
  Pixelation,
  Grid,
  SSAO,
  BrightnessContrast
} from "@react-three/postprocessing";
import {
  KernelSize,
  BlendFunction,
  Resizer
} from "postprocessing";
import { Fluid } from './Fluid';
import { useEffect, useState } from "react";

const Experience1 = () => {
  const Width = window.innerWidth;
  const Height = window.innerHeight;
  const [isMobile, setIsMobile] = useState(false);

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
  const cursorRadius = isMobile ? 0.085 : 0.15;


  return (
   <>

            <EffectComposer>

                <>
                {/* <Noise opacity={0.05} /> */}
                {/* <Pixelation
            granularity={4} // pixel granularity
          /> */}
                <Fluid 
                curl={0.75}
                radius={cursorRadius}
                force={10}  
                swirl={0.75}
                blend={10}
                pressure={0.9}
                fluidColor='#ffffff'
                intensity={1.5}
                densityDissipation={0.9}
                velocityDissipation={0.9}
                //backgroundColor='#000000' 
                rainbow={false}
                showBackground={false}
                />
               {/* <Grid
            //blendFunction={BlendFunction.NORMAL} // blend mode
            scale={20.0} // grid pattern scale
            lineWidth={1.00} // grid pattern line width
            size={{ Width, Height }} // overrides the default pass width and height
          />  */}
                {/* <ToneMapping 
                blendFunction={BlendFunction.DIFFERENCE} 
                middleGrey={0} 
                maxLuminance={0} /> */}
                 </>

            </EffectComposer>
   </>
  )
}

export default Experience1