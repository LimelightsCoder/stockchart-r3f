import {
  EffectComposer,
  Noise,
  ToneMapping,
  Pixelation,
  Grid,
  SSAO
} from "@react-three/postprocessing";
import {
  KernelSize,
  BlendFunction,
  Resizer
} from "postprocessing";

import { Fluid } from './Fluid';

const Experience2 = () => {


  return (
    <>
      <EffectComposer>
        <Fluid
          radius={0.15}
          curl={3}
          swirl={3}
          distortion={0.3}
          force={2}
          pressure={0.96}
          densityDissipation={0.94}
          velocityDissipation={0.96}
          intensity={0.5}
          rainbow={false}
          blend={5}
          fluidColor='#0f58ff'
          backgroundColor='#555555'
          showBackground={false}
        />
        {/* <Noise opacity={0.075} /> */}

        {/* <ToneMapping
          //blendFunction={BlendFunction.DIFFERENCE}
          adaptive={true}
          resolution={256}
          middleGrey={0.6}
          maxLuminance={16.0}
          averageLuminance={1.0}
          adaptationRate={1.0}
        /> */}
          <Pixelation
            granularity={12} // pixel granularity
          />
    {/* <Grid
    blendFunction={BlendFunction.COLOR_DODGE} // blend mode
    scale={1.0} // grid pattern scale
    lineWidth={0.0} // grid pattern line width
    size={{ 100, 100 }} // overrides the default pass width and height
  /> */}

      </EffectComposer>
    </>
  )
}

export default Experience2;
