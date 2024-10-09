// ChromaticAberrationShader.glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uTexture; // Main texture
uniform vec2 uROffset; // Red channel offset
uniform vec2 uGOffset; // Green channel offset
uniform vec2 uBOffset; // Blue channel offset

varying vec2 vUv;

void main() {
    // Sample colors from the texture with the respective offsets
    vec4 red = texture2D(uTexture, vUv + uROffset);
    vec4 green = texture2D(uTexture, vUv + uGOffset);
    vec4 blue = texture2D(uTexture, vUv + uBOffset);
    
    // Combine the sampled colors
    gl_FragColor = vec4(red.r, green.g, blue.b, 1.0);
}
