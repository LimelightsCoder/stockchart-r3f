"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useVideoTexture, useTexture, Html } from '@react-three/drei';
// import { FaPlay, FaPause } from "react-icons/fa";
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D videoTexture;

void main() {
  // Fetch the original color
  vec4 color = texture2D(videoTexture, vUv);
  
  // Apply a simple sharpening filter
  vec2 offset = vec2(1.0) / vec2(textureSize(videoTexture, 0)); // Texture size-dependent offset
  vec4 colorNorth = texture2D(videoTexture, vUv + vec2(0.0, offset.y));
  vec4 colorSouth = texture2D(videoTexture, vUv - vec2(0.0, offset.y));
  vec4 colorEast = texture2D(videoTexture, vUv + vec2(offset.x, 0.0));
  vec4 colorWest = texture2D(videoTexture, vUv - vec2(offset.x, 0.0));

  vec4 sharpened = color * 5.0 - (colorNorth + colorSouth + colorEast + colorWest);

  // Mix original and sharpened colors for a subtle effect
  gl_FragColor = mix(color, sharpened, 0.5); // 0.5 is the sharpening intensity
}

`;

function VideoMaterial({ url, isPlaying }) {
  const texture = useVideoTexture(url, { format: THREE.RGBAFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
  const videoRef = useRef();

  useEffect(() => {
    if (texture && texture.image) {
      videoRef.current = texture.image;

      // Set the playsinline attribute
      videoRef.current.setAttribute('playsinline', true);

      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          // console.error("Error attempting to play video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [texture, isPlaying]);

  return (
    <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{ videoTexture: { value: texture } }}
      toneMapped={false}
    />
  );
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

const VideoSection = () => {
  const { viewport } = useThree();
  // const aspectRatio = 16 / 9;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const aspectRatio = isMobile ? 3.5 / 4 : 16 / 9;
  const planeWidth = viewport.width;
  const planeHeight = planeWidth / aspectRatio;

  const [isPlaying, setIsPlaying] = useState(true);
  

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <group position={new THREE.Vector3(0, 0, -1)}>
      <mesh scale={[planeWidth, planeHeight, 1]}>
        <planeGeometry args={[2.25, 2]} />
        <Suspense fallback={<FallbackMaterial url="/img/Rectangle.jpg" />}>
          <VideoMaterial url="/bmccompress.mp4" isPlaying={isPlaying} />
        </Suspense>
        {/* <Html fullscreen as='div' style={{
    position: 'absolute',
    top: isMobile ? '35vh' : '40vh',
    height: '50px',
    width: '50px',
    pointerEvents: 'all',
  }}>
    <div
      style={{
        position: 'absolute',
        bottom: isMobile ? '5%' : '10%', 
        left: '10px',
        width: '50px',
        height: '50px',
        zIndex: 1,
        color: 'white',
        mixBlendMode: 'difference',
        maxHeight: 'calc(100vh - 10px)',
        pointerEvents: 'all',
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          fontSize: isMobile ? '30px' : '24px',
        }}
        onClick={togglePlayPause}
      >
        {isPlaying ? <FaPause style={{color:'white'}} /> : <FaPlay style={{color:'white'}}/>}
      </div>
    </div>
</Html> */}

      </mesh>

    </group>
  );
};

export default VideoSection;

