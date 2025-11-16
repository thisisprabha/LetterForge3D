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
  vec4 envColor = texture(envMap, reflection);
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
    // Enhanced chromatic dispersion - increased separation for more visible effect
    // Based on Abbe number and wavelength-dependent refraction
    float dispersionAmount = 0.08; // Increased from 0.02 for more visible effect
    float iorR = ior - dispersionAmount;
    float iorG = ior;
    float iorB = ior + dispersionAmount;
    
    vec3 refractR = refract(-viewDir, normal, 1.0 / iorR);
    vec3 refractG = refract(-viewDir, normal, 1.0 / iorG);
    vec3 refractB = refract(-viewDir, normal, 1.0 / iorB);
    
    vec4 refractColorR = texture(envMap, refractR);
    vec4 refractColorG = texture(envMap, refractG);
    vec4 refractColorB = texture(envMap, refractB);
    
    // Enhanced dispersion with stronger color separation
    vec3 dispersedColor = vec3(
      refractColorR.r * 1.2,  // Boost red channel
      refractColorG.g * 1.1,  // Boost green channel
      refractColorB.b * 1.2   // Boost blue channel
    );
    
    // Add edge fringing effect for more visible dispersion
    float edgeFactor = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
    vec3 edgeDispersion = vec3(
      edgeFactor * 0.3,  // Red fringing on edges
      0.0,
      -edgeFactor * 0.3  // Blue fringing on opposite edges
    );
    
    finalColor = (dispersedColor + edgeDispersion) * baseColor * transmission * 1.5;
  } else {
    vec3 refract = refract(-viewDir, normal, 1.0 / ior);
    vec4 refractColor = texture(envMap, refract);
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
