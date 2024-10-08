import { Effect } from 'postprocessing';
import { Texture, Uniform, Vector3 } from 'three';
import { hexToRgb } from '../utils';

// Fragment shader code as a string
const fragment = `
uniform sampler2D tFluid;

uniform vec3 uColor;
uniform vec3 uBackgroundColor;

uniform float uDistort;
uniform float uIntensity;
uniform float uRainbow;
uniform float uBlend;
uniform float uShowBackground;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 fluidColor = texture2D(tFluid, uv).rgb;
    vec2 distortedUv = uv - fluidColor.rg * uDistort;
    vec4 texture = texture2D(inputBuffer, distortedUv);

    float intensity = length(fluidColor) * (uIntensity * 1.0);
    vec3 selectedColor = (uColor*2.0) * length(fluidColor);
    vec4 colorForFluidEffect = vec4(uRainbow == 1.0 ? fluidColor : selectedColor, 1.0);
    vec4 computedBgColor = vec4(uBackgroundColor, 1.0);

    if(uShowBackground == 0.0) {
        outputColor = mix(texture, colorForFluidEffect, intensity);
        return;
    }

    vec4 computedFluidColor = mix(texture, colorForFluidEffect, uBlend);
    vec4 finalColor;

    if(texture.a < 0.1) {
        finalColor = mix(computedBgColor, colorForFluidEffect, intensity);
    } else {
        finalColor = mix(computedFluidColor, computedBgColor, 1.0 - texture.a);
    }

    outputColor = finalColor;
}
`;

export class FluidEffect2 extends Effect {
    constructor(props = {}) {
        const uniforms = {
            tFluid: new Uniform(props.tFluid || null),
            uDistort: new Uniform(props.distortion || 0),
            uRainbow: new Uniform(props.rainbow || false),
            uIntensity: new Uniform(props.intensity || 0),
            uBlend: new Uniform(props.blend || 0),
            uShowBackground: new Uniform(props.showBackground || false),
            uColor: new Uniform(hexToRgb(props.fluidColor || '#FFFFFF')),
            uBackgroundColor: new Uniform(hexToRgb(props.backgroundColor || '#000000')),

        };

        super('FluidEffect', fragment, { uniforms: new Map(Object.entries(uniforms)) });

        this.state = {
            ...props,
        };
    }

    // Update the uniform value
    updateUniform(key, value) {
        const uniform = this.uniforms.get(key);
        if (uniform) {
            uniform.value = value;
        }
    }

    // Update uniforms with the current state
    update() {
        this.updateUniform('uIntensity', this.state.intensity || 0);
        this.updateUniform('uDistort', this.state.distortion || 0);
        this.updateUniform('uRainbow', this.state.rainbow || false);
        this.updateUniform('uBlend', this.state.blend || 0);
        this.updateUniform('uShowBackground', this.state.showBackground || false);
        this.updateUniform('uColor', hexToRgb(this.state.fluidColor || '#FFFFFF'));
        this.updateUniform('uBackgroundColor', hexToRgb(this.state.backgroundColor || '#000000'));

    }
}
