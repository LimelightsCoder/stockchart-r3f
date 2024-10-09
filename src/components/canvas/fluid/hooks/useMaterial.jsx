import { ShaderMaterial, Texture, Vector2, Vector3 } from 'three';
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OPTS } from '../constant';

// Shader source codes
const baseVertex = `
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main() {
  vUv = uv;

  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);

  gl_Position = vec4(position, 1.0);
}`;

const clearFrag = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uClearValue;

void main() { 
    gl_FragColor = uClearValue * texture2D(uTexture, vUv); 
}`;

const curlFrag = `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;

    float vorticity = R - L - T + B;

    gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
}`;

const divergenceFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;

    if(vL.x < 0.0) {
        L = -C.x;
    }

    if(vR.x > 1.0) {
        R = -C.x;
    }

    if(vT.y > 1.0) {
        T = -C.y;
    }

    if(vB.y < 0.0) {
        B = -C.y;
    }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const gradientSubstractFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main() {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);

    gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const pressureFrag = `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main() {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;

    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;

    float pressure = (L + R + B + T - divergence) * 0.25;

    gl_FragColor = vec4(pressure, 0.5, 0.75, 1.0);
}`;

const splatFrag = `
varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 uColor;
uniform vec2 uPointer;
uniform float uRadius;

void main() {
    vec2 p = vUv - uPointer.xy;

    p.x *= aspectRatio;

    vec3 splat = exp(-dot(p, p) / uRadius) * uColor * 2.5;


    vec3 base = texture2D(uTarget, vUv).xyz;

    gl_FragColor = vec4(base + splat, 1.0);
}`;

const advectionFrag = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float uDissipation;

void main() {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize * 0.75;

    gl_FragColor = uDissipation * texture2D(uSource, coord);
    gl_FragColor.a = 1.0;
}`;

const vorticityFrag = `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlValue;
uniform float dt;

void main() {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;

    float C = texture2D(uCurl, vUv).x;

    vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L)) ;
    force /= length(force) + 1.0;
    force *= (uCurlValue * C) * 2.0; // Scale down to reduce sharpness
    force.y *= -1.0;

    vec2 vel = texture2D(uVelocity, vUv).xy;

    // Introduce trailing decay
    vel = mix(vel, vel + force * dt, 0.5); // Softly blend new velocity

    gl_FragColor = vec4(vel, 1.0, 1.0);
}`;

const fxaaFragment = `
precision highp float;

uniform sampler2D tMap;
uniform vec2 uResolution;
varying vec2 vUv;

vec4 fxaa(sampler2D tex, vec2 uv, vec2 resolution) {
  vec2 pixel = vec2(1) / resolution;
  vec3 l = vec3(0.299, 0.587, 0.114);

  float lNW = dot(texture2D(tex, uv + vec2(-1, -1) * pixel).rgb, l);
  float lNE = dot(texture2D(tex, uv + vec2( 1, -1) * pixel).rgb, l);
  float lSW = dot(texture2D(tex, uv + vec2(-1,  1) * pixel).rgb, l);
  float lSE = dot(texture2D(tex, uv + vec2( 1,  1) * pixel).rgb, l);
  float lM  = dot(texture2D(tex, uv).rgb, l);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));
  float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));

  vec2 dir = vec2(
    -((lNW + lNE) - (lSW + lSE)),
    ((lNW + lSW) - (lNE + lSE))
  );

  float dirReduce = max((lNW + lNE + lSW + lSE) * 0.03125, 0.0078125);
  float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);

  dir = min(vec2(8, 8), max(vec2(-8, -8), dir * rcpDirMin)) * pixel;

  vec3 rgbA = 0.5 * (
    texture2D(tex, uv + dir * (1.0 / 3.0 - 0.5)).rgb +
    texture2D(tex, uv + dir * (2.0 / 3.0 - 0.5)).rgb
  );

  vec3 rgbB = rgbA * 0.5 + 0.25 * (
    texture2D(tex, uv + dir * -0.5).rgb +
    texture2D(tex, uv + dir * 0.5).rgb
  );

  float lB = dot(rgbB, l);

  return mix(
    vec4(rgbB, 1),
    vec4(rgbA, 1),
    max(sign(lB - lMin), 0.0) * max(sign(lB - lMax), 0.0)
  );
}

void main() {
  gl_FragColor = fxaa(tMap, vUv, uResolution);
}
`;


export const useMaterials = () => {
    const size = useThree((s) => s.size);
    const baseUniforms = {
        texelSize: { value: new Vector2() },
        // Add other common uniforms if needed
    };
    const shaderMaterials = useMemo(() => {
        const advection = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uVelocity: { value: new Texture() },
                uSource: { value: new Texture() },
                dt: { value: 0.014 },
                uDissipation: { value: 0.25 },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: advectionFrag,
        });

        const clear = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uTexture: { value: new Texture() },
                uClearValue: { value: OPTS.pressure },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: clearFrag,
        });

        const curl = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uVelocity: { value: new Texture() },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: curlFrag,
        });

        const divergence = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uVelocity: { value: new Texture() },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: divergenceFrag,
        });

        const gradientSubstract = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uPressure: { value: new Texture() },
                uVelocity: { value: new Texture() },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: gradientSubstractFrag,
        });

        const pressure = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uPressure: { value: new Texture() },
                uDivergence: { value: new Texture() },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: pressureFrag,
        });

        const splat = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uTarget: { value: new Texture() },
                aspectRatio: { value: size.width / size.height },
                uColor: { value: new Vector3() },
                uPointer: { value: new Vector2() },
                uRadius: { value: OPTS.radius / 2.0 },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: splatFrag,
        });

        const vorticity = new ShaderMaterial({
            uniforms: {
                 ...baseUniforms,
                uVelocity: { value: new Texture() },
                uCurl: { value: new Texture() },
                uCurlValue: { value: OPTS.curl },
                dt: { value: 0.0005 },
                texelSize: { value: new Vector2() },
            },
            vertexShader: baseVertex, // Add vertex shader here
            fragmentShader: vorticityFrag,
        });

        const fxaa = new ShaderMaterial({
            uniforms: {
                ...baseUniforms,
                tMap: { value: new Texture() }, // This should be set to the render target you want to apply FXAA to
                uResolution: { value: new Vector2(size.width, size.height) },
            },
            vertexShader: baseVertex, // Use a base vertex shader here
            fragmentShader: fxaaFragment,
        });

        return {
            splat,
            curl,
            clear,
            divergence,
            pressure,
            gradientSubstract,
            advection,
            vorticity,
            fxaa,
        };
    }, [size]);

    useEffect(() => {
        const aspectRatio = size.width / size.height;

        for (const material of Object.values(shaderMaterials)) {
            material.uniforms.texelSize.value.set(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes);
            material.depthTest = false;
            material.depthWrite = false;
        }

        return () => {
            for (const material of Object.values(shaderMaterials)) {
                material.dispose();
            }
        };
    }, [shaderMaterials, size]);

    return shaderMaterials;
};