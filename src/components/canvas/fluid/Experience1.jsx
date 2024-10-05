import {
  EffectComposer, 
  // Bloom, 
  Noise,
  ToneMapping
} from "@react-three/postprocessing";
// import {
//   // KernelSize,
//   BlendFunction
// } from "postprocessing";
import { Fluid } from './Fluid';

const Experience1 = () => {


  return (
   <>

            <EffectComposer>
                {/* <Fluid
                    radius={0.3}
                    curl={10}
                    swirl={5}
                    distortion={1}
                    force={2}
                    pressure={0.94}
                    densityDissipation={0.98}
                    velocityDissipation={0.99}
                    intensity={0.3}
                    rainbow={false}
                    blend={0}
                    showBackground={true}
                    backgroundColor='#a7958b'
                    fluidColor='#cfc0a8'
                /> */}
                <Noise opacity={0.05} />
                <Fluid 
                curl={2}
                radius={0.2}
                force={5}  
                swirl={0.9}
                blend={1}
                pressure={0.94}
                fluidColor='#0A090C'
                densityDissipation={0.94}
                velocityDissipation={0.94}
                // backgroundColor='#ffffff' 
                rainbow={false}
                showBackground={false}
                />
                 {/* <ToneMapping
                  // blendFunction={BlendFunction.NORMAL} // blend mode
                  adaptive={true} // toggle adaptive luminance map usage
                  resolution={256} // texture resolution of the luminance map
                  middleGrey={0.6} // middle grey factor
                  maxLuminance={16.0} // maximum luminance
                  averageLuminance={1.0} // average luminance
                  adaptationRate={1.0} // luminance adaptation rate
                /> */}
                {/* <Fluid fluidColor='#1E91D6' curl={10} force={2}  swirl={5}/> */}
                {/* <Fluid fluidColor='#0A090C' force={2} /> */}
            </EffectComposer>
   </>
  )
}

export default Experience1