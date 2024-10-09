'use client'
import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { ShaderMaterial, UniformsUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Load your shader from the .glsl file
import chromaticAberrationFragment from './ChromaticAberrationShader.glsl'; // Adjust the path as needed

class ChromaticAberrationMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: { value: null },
        uROffset: { value: new THREE.Vector2(0.01, 0) }, // Red offset
        uGOffset: { value: new THREE.Vector2(0, 0.01) }, // Green offset
        uBOffset: { value: new THREE.Vector2(-0.01, -0.01) }, // Blue offset
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: chromaticAberrationFragment,
    });
  }
}

// Register the material with Three.js
extend({ ChromaticAberrationMaterial });

const FluidWithChromaticAberration = ({ texture }) => {
  const materialRef = useRef();
  
  // Update the texture uniform each frame
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <chromaticAberrationMaterial ref={materialRef} />
    </mesh>
  );
};

export default FluidWithChromaticAberration;
