// Simple shader for rainbow fringing effect on edges
export const rainbowVertexShader = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const rainbowFragmentShader = `
uniform vec3 baseColor;
uniform float ior;
uniform float roughness;
uniform float transmission;
uniform float dispersionIntensity;
uniform samplerCube envMap;

varying vec3 vNormal;
varying vec3 vViewPosition;

// Rainbow color function
vec3 getRainbowColor(float t) {
  t = mod(t, 1.0);
  if (t < 0.166) return mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.5, 0.0), t * 6.0); // Red to Orange
  else if (t < 0.333) return mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.0), (t - 0.166) * 6.0); // Orange to Yellow
  else if (t < 0.5) return mix(vec3(1.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0), (t - 0.333) * 6.0); // Yellow to Green
  else if (t < 0.666) return mix(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 1.0), (t - 0.5) * 6.0); // Green to Cyan
  else if (t < 0.833) return mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 0.0, 1.0), (t - 0.666) * 6.0); // Cyan to Blue
  else return mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 1.0), (t - 0.833) * 6.0); // Blue to Magenta
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Fresnel effect - stronger at edges
  float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
  
  // Get environment reflection
  vec3 reflection = reflect(-viewDir, normal);
  vec4 envColor = texture(envMap, reflection);
  
  // Base glass color
  vec3 glassColor = envColor.rgb * baseColor * transmission;
  
  // Add rainbow fringing at edges based on fresnel
  if (dispersionIntensity > 0.0) {
    // Create rainbow based on view angle and normal
    float rainbowT = dot(normalize(normal + viewDir * 0.5), vec3(1.0, 0.0, 0.0)) * 0.5 + 0.5;
    vec3 rainbowColor = getRainbowColor(rainbowT);
    
    // Apply rainbow fringing at edges
    float edgeFactor = fresnel * dispersionIntensity;
    glassColor = mix(glassColor, glassColor + rainbowColor * edgeFactor * 0.8, edgeFactor);
  }
  
  // Apply roughness
  glassColor = mix(glassColor, glassColor * 0.7, roughness);
  
  gl_FragColor = vec4(glassColor, 1.0 - transmission * (1.0 - fresnel));
}
`;

