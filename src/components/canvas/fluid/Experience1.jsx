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

const Experience1 = () => {
  const Width = window.innerWidth;
  const Height = window.innerHeight;

  return (
   <>

            <EffectComposer>
                <Noise opacity={0.05} />
                {/* <Pixelation
            granularity={12} // pixel granularity
          /> */}
                <Fluid 
                curl={1}
                radius={0.15}
                force={10}  
                swirl={1}
                blend={10}
                pressure={0.92}
                fluidColor='#fffff'
                intensity={1.5}
                densityDissipation={0.9}
                velocityDissipation={0.9}
                //backgroundColor='#000000' 
                rainbow={false}
                showBackground={false}
                />
               {/* <Grid
            //blendFunction={BlendFunction.NORMAL} // blend mode
            scale={1.0} // grid pattern scale
            lineWidth={0.001} // grid pattern line width
            size={{ Width, Height }} // overrides the default pass width and height
          />  */}
                {/* <ToneMapping 
                blendFunction={BlendFunction.DIFFERENCE} 
                middleGrey={0} 
                maxLuminance={0} /> */}

            </EffectComposer>
   </>
  )
}

export default Experience1