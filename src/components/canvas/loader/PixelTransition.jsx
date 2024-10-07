// 'use client';
// import * as THREE from 'three';
// import { useRef, useEffect } from 'react';
// import { extend, useFrame } from '@react-three/fiber';

// // Import ShaderMaterial
// import { ShaderMaterial } from 'three';

// // Extend Three.js to support shader material
// extend({ ShaderMaterial });

// const PixelationShader = {
//   uniforms: {
//     u_time: { value: 0.0 },
//     u_resolution: { value: new THREE.Vector2() },
//     u_waveAmplitude: { value: 0.2 }, // Increased amplitude for more noticeable waves
//     u_pixelSize: { value: 10.0 },
//     u_scale: { value: 1.0 }, // New uniform for scaling
//   },
//   vertexShader: `
//     varying vec2 vUv;
//     uniform float u_scale; // Scale uniform

//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position * u_scale, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform float u_time;
//     uniform vec2 u_resolution;
//     uniform float u_waveAmplitude;
//     uniform float u_pixelSize; // Dynamic pixel size
  
//     varying vec2 vUv;

//     // Define specific colors as vec3
//     vec3 color1 = vec3(0.341, 0.890, 0.620); // #56E39F
//     vec3 color2 = vec3(1.000, 0.722, 0.000); // #FFB800
//     vec3 color3 = vec3(0.125, 0.569, 0.839); // #1E91D6
//     vec3 color4 = vec3(0.447, 0.037, 0.720); // #7209B7
//     vec3 color5 = vec3(0.053, 0.247, 0.267); // #0D3E44
//     vec3 color6 = vec3(0.031, 0.020, 0.000); // #010400
//     vec3 color7 = vec3(1.000, 0.984, 0.988); // #FFFBFC
  
//     void main() {
//         vec2 uv = vUv * 2.0 - 1.0; // Normalize UV to range [-1, 1]

//         // Set the initial background color to black
//         vec3 color = vec3(0.0);

//         // Define wave source positions (the corners)
//         vec2 top = vec2(0.0, 1.0);            // Top
//         vec2 bottomLeft = vec2(-1.0, -1.0);  // Bottom left
//         vec2 bottom = vec2(0.0, -1.0);        // Bottom
//         vec2 topRight = vec2(1.0, 1.0);      // Top right

//         // Calculate distance from each wave source to the center (0,0)
//         float distTop = length(uv - top);
//         float distBottomLeft = length(uv - bottomLeft);
//         float distBottom = length(uv - bottom);
//         float distTopRight = length(uv - topRight);

//         // Combine the waves using sine functions and the distances
//         float wave1 = sin(-distTop * 6.0 + u_time * 1.0) * u_waveAmplitude * smoothstep(0.0, 1.5, distTop);
//         float wave2 = sin(-distBottomLeft * 6.0 + u_time * 1.5) * u_waveAmplitude * smoothstep(-1.5, 0.0, distBottomLeft);
//         float wave3 = sin(-distBottom * 6.0 + u_time * 2.0) * u_waveAmplitude * smoothstep(0.0, 1.5, distBottom);
//         float wave4 = sin(-distTopRight * 6.0 + u_time * 2.5) * u_waveAmplitude * smoothstep(0.0, 0.5, distTopRight);

//         // Combine all the waves to create an irregular pattern
//         float combinedWave = wave1 + wave2 + wave3 + wave4;

//         // Define a color array to hold your specified colors
//         vec3 colors[7] = vec3[7](color1, color2, color3, color4, color5, color6, color7);

//         // Map the combined wave value to the colors
//         int colorIndex = int(mod(combinedWave * 6.0, 7.0)); // Choose one of the defined colors
//         vec3 selectedColor = colors[colorIndex];

//         // Mix the selected color with the black background based on the wave strength
//         float transitionStrength = smoothstep(0.0, 0.3, combinedWave); // Control the visibility of color
//         color = mix(vec3(0.0), selectedColor, transitionStrength);

//         // Output the final color
//         gl_FragColor = vec4(color, 1.0); // Set alpha to 1 for full opacity
//     }
//   `,
// };

// const PixelTransition = () => {
//     const shaderRef = useRef();
  
//     // Set the plane size to the viewport dimensions
//     const planeWidth = window.innerWidth;
//     const planeHeight = window.innerHeight;
  
//     // Animate the wave effect over time
//     useFrame(({ clock }) => {
//       const elapsedTime = clock.getElapsedTime();
//       shaderRef.current.uniforms.u_time.value = elapsedTime;
//     });
  
//     useEffect(() => {
//       // Update resolution uniforms on resize
//       const handleResize = () => {
//         shaderRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
//       };
  
//       window.addEventListener('resize', handleResize);
//       handleResize(); // Call initially to set the uniform with current size
  
//       return () => {
//         window.removeEventListener('resize', handleResize);
//       };
//     }, []);
  
//     return (
//       <mesh>
//         <planeGeometry args={[15, 10]} />
//         <shaderMaterial
//           ref={shaderRef}
//           attach="material"
//           args={[PixelationShader]}
//           uniforms-u_resolution-value={[window.innerWidth, window.innerHeight]}
//         />
//       </mesh>
//     );
//   };
  
//   export default PixelTransition;





// 'use client';
// import * as THREE from 'three';
// import { useRef, useEffect } from 'react';
// import { extend, useFrame } from '@react-three/fiber';
// import { ShaderMaterial } from 'three';
// // Extend Three.js to support shader material
// extend({ ShaderMaterial });

// // Define the dissolve shader with pixel-based color integration
// const dissolveShader = {
//   uniforms: {
//     u_time: { value: 0.0 },
//     u_resolution: { value: new THREE.Vector2() },
//     u_dissolveTexture: { value: null },  // Load dissolve texture separately
//     u_threshold: { value: 0.5 }, // Start with threshold at 0.5
//     u_pixelSize: { value: 128.0 },  // Adjusted pixel size for medium-sized pixels
//     u_uvScale: { value: new THREE.Vector2(1.0, 1.0) }  // UV scale to control zoom
//   },
//   vertexShader: `
//     varying vec2 vUv;

//     void main() {
//       vUv = uv; // Pass UV coordinates to fragment shader
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//   fragmentShader: `
//   uniform float u_time;
//   uniform sampler2D u_dissolveTexture;
//   uniform float u_threshold;
//   uniform float u_pixelSize;
//   uniform vec2 u_uvScale; 
//   varying vec2 vUv;

//   // Updated colors with the new palette
//   vec3 color1 = vec3(0.020, 0.337, 1.000); // #0556FF
//   vec3 color2 = vec3(1.000, 0.756, 0.075); // #FFC11F
//   vec3 color3 = vec3(0.518, 0.094, 0.937); // #8424EF
//   vec3 color4 = vec3(0.239, 0.929, 0.588); // #3DEF96
//   vec3 color5 = vec3(0.110, 0.110, 0.110); // #252525
//   vec3 color6 = vec3(0.961, 0.961, 0.957); // #F5F5F4

//   void main() {
//     vec2 scaledUV = vUv * u_uvScale;
//     vec2 pixelatedUV = floor(scaledUV * u_pixelSize) / u_pixelSize;

//     float dissolveValue = texture2D(u_dissolveTexture, pixelatedUV).r; 
    
//     float alpha = smoothstep(u_threshold - 0.02, u_threshold + 0.02, dissolveValue);
    
//     if (alpha < 0.1) discard;  

//     // Using an array for colors
//     vec3 colors[6]; // Updated array size to 6
//     colors[0] = color1; colors[1] = color2; colors[2] = color3;
//     colors[3] = color4; colors[4] = color5; colors[5] = color6; // Updated color count

//     int colorIndex = int(mod(dissolveValue * float(colors.length() - 1), 6.0)); // Adjusting the index calculation
//     vec3 selectedColor = colors[colorIndex];

//     gl_FragColor = vec4(selectedColor, alpha);
//   }
// `


// };

// const DissolveTransition = () => {
//   const shaderRef = useRef();
//       const planeWidth = window.innerWidth;
//     const planeHeight = window.innerHeight;

//   // Load the dissolve texture
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load('/img/intro.jpg', (texture) => {
//       shaderRef.current.uniforms.u_dissolveTexture.value = texture;
//     });
//   }, []);

//   // Animate the threshold over time
//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();
    
//     // Increase the threshold over time to animate the dissolve effect
//     shaderRef.current.uniforms.u_threshold.value = (Math.sin(elapsedTime * 0.5) + 1) / 2;
//   });

//   useEffect(() => {
//     // Update resolution uniforms on resize
//     const handleResize = () => {
//       shaderRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
//     };
    
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Call initially to set the uniform with current size
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <mesh>
//       <planeGeometry args={[15, 10]} />
//       <shaderMaterial
//         ref={shaderRef}
//         attach="material"
//         uniforms={dissolveShader.uniforms}
//         vertexShader={dissolveShader.vertexShader}
//         fragmentShader={dissolveShader.fragmentShader}
//         transparent={true} // Ensure transparency for the dissolve effect
//       />
//     </mesh>
//   );
// };

// export default DissolveTransition;



'use client';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { extend, useFrame } from '@react-three/fiber';
  import { Text } from '@react-three/drei';
import { ShaderMaterial } from 'three';
// Extend Three.js to support shader material
extend({ ShaderMaterial });

// Define the dissolve shader with pixel-based color integration
const dissolveShader = {
  uniforms: {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_dissolveTexture: { value: null },  // Load dissolve texture separately
    u_threshold: { value: 0.5 }, // Start with threshold at 0.5
    u_pixelSize: { value: 64.0 },  // Adjusted pixel size for medium-sized pixels
    u_uvScale: { value: new THREE.Vector2(1.0, 1.0) }  // UV scale to control zoom
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv; // Pass UV coordinates to fragment shader
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
  uniform float u_time;
  uniform sampler2D u_dissolveTexture;
  uniform float u_threshold;
  uniform float u_pixelSize;
  uniform vec2 u_uvScale; 
  varying vec2 vUv;
  
  void main() {
      vec2 scaledUV = vUv * u_uvScale;
      vec2 pixelatedUV = floor(scaledUV * u_pixelSize) / u_pixelSize;
  
      float dissolveValue = texture2D(u_dissolveTexture, pixelatedUV).r; 
  
      // Smoothstep for alpha
      float alpha = smoothstep(u_threshold - 0.02, u_threshold + 0.02, dissolveValue);
      
      if (alpha < 0.1) discard;
  
      // Updated color definitions with your colors
      vec3 color2 = vec3(0.020, 0.337, 1.000);  // #0556FF
      vec3 color4 = vec3(1.000, 0.756, 0.075);  // #FFC11F
      vec3 color3 = vec3(0.518, 0.094, 0.937);  // #8424EF
      vec3 color1 = vec3(0.239, 0.929, 0.588);  // #3DEF96
      vec3 color6 = vec3(0.110, 0.110, 0.110);  // #252525
      vec3 color5 = vec3(0.961, 0.961, 0.957);  // #F5F5F4
  
      // Interpolating colors based on dissolveValue
      vec3 selectedColor;
      if (dissolveValue < 0.166) {
          selectedColor = mix(color1, color2, dissolveValue / 0.166);
      } else if (dissolveValue < 0.332) {
          selectedColor = mix(color2, color3, (dissolveValue - 0.166) / 0.166);
      } else if (dissolveValue < 0.498) {
          selectedColor = mix(color3, color4, (dissolveValue - 0.332) / 0.166);
      } else if (dissolveValue < 0.664) {
          selectedColor = mix(color4, color5, (dissolveValue - 0.498) / 0.166);
      } else if (dissolveValue < 0.83) {
          selectedColor = mix(color5, color6, (dissolveValue - 0.664) / 0.166);
      } else {
          selectedColor = mix(color6, color1, (dissolveValue - 0.83) / 0.17);  // Loop back to blue
      }
  
      gl_FragColor = vec4(selectedColor, alpha);
  }
`

  };



const DissolveTransition = () => {
  const shaderRef = useRef();
    const planeWidth = window.innerWidth;
    const planeHeight = window.innerHeight;

  // Load the dissolve texture
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/img/OfGVNqG.png', (texture) => {
      shaderRef.current.uniforms.u_dissolveTexture.value = texture;
    });
  }, []);

  // Animate the threshold over time
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Increase the threshold over time to animate the dissolve effect
    shaderRef.current.uniforms.u_threshold.value = (Math.sin(elapsedTime * 0.5) + 1) / 2;
  });

  useEffect(() => {
    // Update resolution uniforms on resize
    const handleResize = () => {
      shaderRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the uniform with current size
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <mesh>
      <planeGeometry args={[20, 10]} />
      <shaderMaterial
        ref={shaderRef}
        attach="material"
        uniforms={dissolveShader.uniforms}
        vertexShader={dissolveShader.vertexShader}
        fragmentShader={dissolveShader.fragmentShader}
        transparent={true} // Ensure transparency for the dissolve effect
      />
    
              <Text
            position={[0, 0.5, 0]} // Position in 3D space
            fontSize={0.3} // Adjust font size
            color="#ffffff" // Set text color
            anchorX="center" // Center the text
            anchorY="middle" // Center the text

            // Animation properties
          >
         CORY.DEV
          </Text>
    </mesh>
  );
};

export default DissolveTransition;