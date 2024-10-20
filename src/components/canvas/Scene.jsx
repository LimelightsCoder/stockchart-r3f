'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
const Experience1 = dynamic(() => import('./fluid/Experience1'), { ssr: false });
import Experience2 from './fluid/Experience2'
// import Experience1 from './fluid/Experience1'


export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >

      {/* <Experience1 /> */}
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
