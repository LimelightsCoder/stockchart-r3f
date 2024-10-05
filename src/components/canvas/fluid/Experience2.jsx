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
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <>
      <EffectComposer>
        <Fluid
          radius={0.15}
          curl={3}
          swirl={3}
          distortion={0.3}
          force={10}
          pressure={0.94}
          densityDissipation={0.94}
          velocityDissipation={0.94}
          intensity={0.25}
          rainbow={true}
          blend={5}
          fluidColor='#0f58ff'
          backgroundColor='#555555'
          showBackground={false}
        />
        <Noise opacity={0.075} />

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
            granularity={10.5} // pixel granularity
          />
    {/* <Grid
    blendFunction={BlendFunction.COLOR_DODGE} // blend mode
    scale={1.0} // grid pattern scale
    lineWidth={0.0} // grid pattern line width
    size={{ width, height }} // overrides the default pass width and height
  /> */}
  {/* <SSAO
    blendFunction={BlendFunction.NORMAL} // blend mode
    samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
    rings={4} // amount of rings in the occlusion sampling pattern
    distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
    distanceFalloff={0.0} // distance falloff. min: 0, max: 1
    rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
    rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
    luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
    radius={20} // occlusion sampling radius
    scale={0.5} // scale of the ambient occlusion
    bias={0.5} // occlusion bias
  /> */}
      </EffectComposer>
    </>
  )
}

export default Experience2;
