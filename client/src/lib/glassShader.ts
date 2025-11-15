// Custom shader for physically accurate glass with chromatic dispersion
export const glassVertexShader = `
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const glassFragmentShader = `
uniform vec3 baseColor;
uniform float ior;
uniform float roughness;
uniform float transmission;
uniform bool dispersion;
uniform samplerCube envMap;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

vec3 getIBLContribution(vec3 n, vec3 v, float roughness, vec3 baseColor) {
  vec3 reflection = reflect(-v, n);
  vec4 envColor = textureCube(envMap, reflection);
  return envColor.rgb * baseColor;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
  return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Fresnel effect
  float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 3.0);
  
  vec3 finalColor = vec3(0.0);
  
  if (dispersion) {
    // Chromatic dispersion - split light into RGB components
    float iorR = ior - 0.02;
    float iorG = ior;
    float iorB = ior + 0.02;
    
    vec3 refractR = refract(-viewDir, normal, 1.0 / iorR);
    vec3 refractG = refract(-viewDir, normal, 1.0 / iorG);
    vec3 refractB = refract(-viewDir, normal, 1.0 / iorB);
    
    vec4 refractColorR = textureCube(envMap, refractR);
    vec4 refractColorG = textureCube(envMap, refractG);
    vec4 refractColorB = textureCube(envMap, refractB);
    
    vec3 dispersedColor = vec3(
      refractColorR.r,
      refractColorG.g,
      refractColorB.b
    );
    
    finalColor = dispersedColor * baseColor * transmission;
  } else {
    vec3 refract = refract(-viewDir, normal, 1.0 / ior);
    vec4 refractColor = textureCube(envMap, refract);
    finalColor = refractColor.rgb * baseColor * transmission;
  }
  
  // Add reflection based on Fresnel
  vec3 reflection = getIBLContribution(normal, viewDir, roughness, vec3(1.0));
  finalColor = mix(finalColor, reflection, fresnel * 0.5);
  
  // Apply roughness
  finalColor = mix(finalColor, finalColor * 0.7, roughness);
  
  gl_FragColor = vec4(finalColor, 1.0 - transmission * (1.0 - fresnel));
}
`;
