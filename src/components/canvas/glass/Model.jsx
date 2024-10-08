// 'use client'
// import React, { useRef } from 'react'
// import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
// import { useFrame, useThree } from '@react-three/fiber'
// import { useControls } from 'leva'

// export default function Model() {
//     const { nodes } = useGLTF("/logo-face1.glb");
//     const { viewport } = useThree()
//     const mesh = useRef(null);
    
//     // useFrame( () => {
//     //     mesh.current.rotation.x += 0.02
//     // })

//     const materialProps = useControls({
//         thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
//         roughness: { value: 0, min: 0, max: 1, step: 0.1 },
//         transmission: {value: 1, min: 0, max: 1, step: 0.1},
//         ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
//         chromaticAberration: { value: 0.02, min: 0, max: 1},
//         backside: { value: true},
//     })
    
//     return (
//         <group scale={viewport.width / 3.75} >
//             <Text font={'/fonts/Wotfard-Regular.otf'} position={[0, 1.5, -1]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
//                 cory.dev
//             </Text>
//             {/* <mesh ref={mesh} geometry={nodes.Curve.geometry} position={[-0.30,-0.5,0]} rotation={[Math.PI / 2, 0, 0]} scale={5}>
//                 <MeshTransmissionMaterial {...materialProps}/>
//             </mesh> */}
//         </group>
//     )
// }