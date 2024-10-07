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
            granularity={14} // pixel granularity
          /> */}
                <Fluid 
                curl={1}
                radius={0.15}
                force={10}  
                swirl={1}
                blend={10}
                pressure={0.92}
                fluidColor='#ffffff'
                intensity={0.5}
                densityDissipation={0.92}
                velocityDissipation={0.92}
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

            </EffectComposer>
   </>
  )
}

export default Experience1