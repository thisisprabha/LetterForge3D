import * as THREE from 'three';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function exportToPNG(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  filename: string,
  resolution: number = 1024
): Promise<Blob> {
  const originalSize = renderer.getSize(new THREE.Vector2());
  const originalPixelRatio = renderer.getPixelRatio();
  const originalBackground = scene.background;
  
  // Store original clear settings
  const originalClearColor = new THREE.Color();
  const originalClearAlpha = renderer.getClearAlpha();
  renderer.getClearColor(originalClearColor);
  
  // Type guard for PerspectiveCamera
  if (!(camera instanceof THREE.PerspectiveCamera)) {
    throw new Error('Export requires a PerspectiveCamera');
  }
  
  const originalCameraPosition = camera.position.clone();
  const originalCameraAspect = camera.aspect;
  const originalCameraFov = camera.fov;

  // Set transparent background for export
  // Environment map (scene.environment) remains active for glass reflections
  scene.background = null;
  renderer.setClearColor(0x000000, 0); // Transparent black
  renderer.setClearAlpha(0); // Ensure alpha is 0

  // Set resolution
  renderer.setSize(resolution, resolution);
  renderer.setPixelRatio(1);
  
  // Ensure material uses environment map for glass reflections
  const mesh = scene.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh | undefined;
  if (mesh && mesh.material && scene.environment) {
    const material = mesh.material as THREE.MeshPhysicalMaterial;
    if ('envMap' in material) {
      material.envMap = scene.environment;
      material.needsUpdate = true;
    }
  }
  
  // Calculate 20% margin (letter should fill 60% of image)
  // Frame the mesh to fill 60% of the 1024px image
  
  if (mesh) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Calculate the distance needed to frame the object with 20% margin
    // Object should fill 60% of image (0.6 * resolution)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = resolution * 0.6; // 60% of image size (20% margin on all sides)
    
    // Calculate camera distance using FOV and object size
    // distance = (objectSize / 2) / tan(fov / 2) * (imageSize / targetSize)
    const fovRad = (camera.fov * Math.PI) / 180;
    const distance = (maxDim / 2) / Math.tan(fovRad / 2) * (resolution / targetSize);
    
    // Position camera to center the object, looking at it
    camera.aspect = 1; // Square aspect ratio for export
    camera.updateProjectionMatrix();
    camera.position.set(center.x, center.y, center.z + distance);
    camera.lookAt(center);
  } else {
    // Fallback: maintain square aspect ratio
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  // Use render target with alpha to ensure transparency
  const renderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
    alpha: true,
    antialias: true,
  });

  // Render to target
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  // Read pixels from render target
  const pixels = new Uint8Array(resolution * resolution * 4);
  renderer.readRenderTargetPixels(renderTarget, 0, 0, resolution, resolution, pixels);

  // Create canvas with alpha
  const canvas = document.createElement('canvas');
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Put pixel data into canvas
  const imageData = ctx.createImageData(resolution, resolution);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  // Convert to blob with alpha
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // Cleanup
      renderTarget.dispose();
      
      // Restore original settings
      renderer.setSize(originalSize.x, originalSize.y);
      renderer.setPixelRatio(originalPixelRatio);
      scene.background = originalBackground;
      renderer.setClearColor(originalClearColor, originalClearAlpha);
      camera.position.copy(originalCameraPosition);
      camera.aspect = originalCameraAspect;
      camera.fov = originalCameraFov;
      camera.updateProjectionMatrix();
      
      if (blob) {
        resolve(blob);
      }
    }, 'image/png');
  });
}

export async function exportToUSDZ(
  mesh: THREE.Mesh | null,
  filename: string,
  materialConfig?: { ior: number; roughness: number; transmission: number; baseColor: string }
): Promise<Blob> {
  if (!mesh || !mesh.geometry) {
    throw new Error('No mesh or geometry to export');
  }

  const geometry = mesh.geometry;
  
  // Ensure normals are computed for proper rendering
  if (!geometry.attributes.normal) {
    geometry.computeVertexNormals();
  }
  
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const index = geometry.index;
  
  // Extract vertex data
  const vertices: string[] = [];
  const normals: string[] = [];
  
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    vertices.push(`(${x.toFixed(6)}, ${y.toFixed(6)}, ${z.toFixed(6)})`);
    
    if (normal) {
      // Keep normals as-is (we're reversing faces, so normals should match)
      const nx = normal.getX(i);
      const ny = normal.getY(i);
      const nz = normal.getZ(i);
      normals.push(`(${nx.toFixed(6)}, ${ny.toFixed(6)}, ${nz.toFixed(6)})`);
    }
  }
  
  // Extract face data
  // USD uses right-hand rule, so we need to reverse face winding order
  const faceVertexCounts: number[] = [];
  const faceVertexIndices: number[] = [];
  
  if (index) {
    // Get index array directly
    const indexArray = index.array;
    for (let i = 0; i < index.count; i += 3) {
      faceVertexCounts.push(3);
      // Reverse winding order for USD (right-hand rule vs Three.js left-hand)
      // Three.js uses left-hand rule, USD uses right-hand rule
      const i0 = indexArray[i];
      const i1 = indexArray[i + 1];
      const i2 = indexArray[i + 2];
      faceVertexIndices.push(i2, i1, i0);
    }
  } else {
    // No index buffer - create faces from vertices directly (non-indexed geometry)
    for (let i = 0; i < position.count; i += 3) {
      faceVertexCounts.push(3);
      faceVertexIndices.push(i + 2, i + 1, i);
    }
  }
  
  // Debug logging
  console.log('USDZ Export Debug:', {
    vertexCount: position.count,
    faceCount: faceVertexCounts.length,
    hasIndex: !!index,
    firstFace: faceVertexIndices.slice(0, 3),
    firstVertex: vertices[0]
  });
  
  // Create USDA content with actual geometry data
  const ior = materialConfig?.ior || 1.5;
  const roughness = materialConfig?.roughness || 0.02;
  const transmission = materialConfig?.transmission || 1.0;
  const color = materialConfig?.baseColor || '#ffffff';
  
  // Convert hex color to RGB
  const c = new THREE.Color(color);
  const colorStr = `(${c.r.toFixed(3)}, ${c.g.toFixed(3)}, ${c.b.toFixed(3)})`;
  
  // USDZ files rely on viewer lighting (iOS provides default lighting)
  // For glass material in USD Preview Surface (iOS requirements):
  // - Opacity controls transparency (lower = more transparent)
  // - Transmission controls light passing through (for glass effect)
  // - Roughness should be LOW (0.0-0.1) for smooth reflective surface
  // - IOR around 1.5 for glass refraction
  // - High specular for glass reflections
  // For glass: use BOTH opacity (0.3-0.5) AND transmission (0.7-0.9)
  const opacityValue = 0.4; // Semi-transparent for glass visibility
  const transmissionValue = Math.min(transmission * 0.8, 0.85); // High transmission for glass
  const roughnessValue = Math.max(0.0, Math.min(0.1, roughness)); // Low roughness for glass
  
  const usdzContent = `#usda 1.0
(
    defaultPrim = "Letter"
    metersPerUnit = 1
    upAxis = "Y"
)

def Xform "Letter"
{
    def Mesh "geometry"
    {
        int[] faceVertexCounts = [${faceVertexCounts.join(', ')}]
        int[] faceVertexIndices = [${faceVertexIndices.join(', ')}]
        point3f[] points = [${vertices.join(', ')}]
        normal3f[] normals = [${normals.join(', ')}]
        uniform token subdivisionScheme = "none"
        
        rel material:binding = </Letter/Materials/GlassMaterial>
    }
    
    def Scope "Materials"
    {
        def Material "GlassMaterial"
        {
            token outputs:surface.connect = </Letter/Materials/GlassMaterial/PbrPreview.outputs:surface>
            
            def Shader "PbrPreview"
            {
                uniform token info:id = "UsdPreviewSurface"
                color3f inputs:diffuseColor = ${colorStr}
                color3f inputs:specularColor = (1.0, 1.0, 1.0)
                float inputs:ior = ${ior}
                float inputs:roughness = ${roughnessValue}
                float inputs:metallic = 0.0
                float inputs:opacity = ${opacityValue}
                float inputs:transmission = ${transmissionValue}
                float inputs:clearcoat = 1.0
                float inputs:clearcoatRoughness = 0.05
                float inputs:specular = 1.0
                token outputs:surface
            }
        }
    }
}
`;
  
  // Validate we have geometry data
  if (vertices.length === 0) {
    throw new Error('No vertices to export');
  }
  if (faceVertexIndices.length === 0) {
    throw new Error('No faces to export');
  }
  
  // USDZ files are ZIP archives - must use STORE (no compression) for iOS compatibility
  const zip = new JSZip();
  zip.file('model.usda', usdzContent);
  
  // Generate ZIP blob with STORE compression (required for USDZ on iOS)
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'STORE', // USDZ requires STORE (no compression) for iOS SceneKit/RealityKit
    compressionOptions: {}
  });
  
  console.log('USDZ file generated:', {
    size: zipBlob.size,
    vertexCount: vertices.length,
    faceCount: faceVertexCounts.length
  });
  
  return zipBlob;
}

export async function batchExportPNG(
  characters: string[],
  renderFunction: (char: string) => Promise<Blob>,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const zip = new JSZip();
  const total = characters.length;

  for (let i = 0; i < total; i++) {
    const char = characters[i];
    if (onProgress) {
      onProgress(i + 1, total);
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const blob = await renderFunction(char);
    zip.file(`${char}.png`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'glass-letters-all.zip');
}

export async function batchExportUSDZ(
  characters: string[],
  exportFunction: (char: string) => Promise<Blob>,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const zip = new JSZip();
  const total = characters.length;

  for (let i = 0; i < total; i++) {
    const char = characters[i];
    if (onProgress) {
      onProgress(i + 1, total);
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const blob = await exportFunction(char);
    zip.file(`${char}.usdz`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'glass-letters-all-usdz.zip');
}

export async function exportAnimatedPNG(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  mesh: THREE.Mesh | null,
  filename: string,
  resolution: number = 1024,
  animationType: 'rotation' | 'tilt' | 'both' = 'rotation',
  rotationStart: number = 0,
  rotationEnd: number = -90,
  tiltStart: number = 0,
  tiltEnd: number = 45,
  frameCount: number = 30
): Promise<Blob> {
  if (!mesh) {
    throw new Error('No mesh to animate');
  }

  const originalSize = renderer.getSize(new THREE.Vector2());
  const originalPixelRatio = renderer.getPixelRatio();
  const originalMeshRotation = mesh.rotation.clone();
  const originalBackground = scene.background;
  
  // Store original clear settings
  const originalClearColor = new THREE.Color();
  const originalClearAlpha = renderer.getClearAlpha();
  renderer.getClearColor(originalClearColor);
  
  // Type guard for PerspectiveCamera
  if (!(camera instanceof THREE.PerspectiveCamera)) {
    throw new Error('Export requires a PerspectiveCamera');
  }
  
  const originalCameraPosition = camera.position.clone();
  const originalCameraAspect = camera.aspect;
  const originalCameraFov = camera.fov;

  // Set transparent background for export
  // Environment map (scene.environment) remains active for glass reflections
  scene.background = null;
  renderer.setClearColor(0x000000, 0); // Transparent black
  renderer.setClearAlpha(0); // Ensure alpha is 0

  // Set resolution
  renderer.setSize(resolution, resolution);
  renderer.setPixelRatio(1);
  
  // Ensure material uses environment map for glass reflections
  if (mesh.material && scene.environment) {
    const material = mesh.material as THREE.MeshPhysicalMaterial;
    if ('envMap' in material) {
      material.envMap = scene.environment;
      material.needsUpdate = true;
    }
  }
  
  // Frame the mesh
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const targetSize = resolution * 0.6;
  const fovRad = (camera.fov * Math.PI) / 180;
  const distance = (maxDim / 2) / Math.tan(fovRad / 2) * (resolution / targetSize);
  
  camera.aspect = 1;
  camera.updateProjectionMatrix();
  camera.position.set(center.x, center.y, center.z + distance);
  camera.lookAt(center);

  const frames: Blob[] = [];
  
  // Generate frames
  for (let frame = 0; frame < frameCount; frame++) {
    const t = frame / (frameCount - 1); // 0 to 1
    
    // Apply animation based on type
    if (animationType === 'rotation' || animationType === 'both') {
      // Interpolate rotation (Y axis: front to back)
      const rotationY = rotationStart + (rotationEnd - rotationStart) * t;
      mesh.rotation.y = (rotationY * Math.PI) / 180;
    } else {
      // Keep Y rotation at start position
      mesh.rotation.y = (rotationStart * Math.PI) / 180;
    }
    
    if (animationType === 'tilt' || animationType === 'both') {
      // Interpolate tilt (X axis: front to left)
      const rotationX = tiltStart + (tiltEnd - tiltStart) * t;
      mesh.rotation.x = (rotationX * Math.PI) / 180;
    } else {
      // Keep X rotation at start position
      mesh.rotation.x = (tiltStart * Math.PI) / 180;
    }
    
    // Small delay to ensure mesh updates
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Use render target with alpha to ensure transparency
    const renderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      alpha: true,
      antialias: true,
    });

    // Render to target
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);

    // Read pixels from render target
    const pixels = new Uint8Array(resolution * resolution * 4);
    renderer.readRenderTargetPixels(renderTarget, 0, 0, resolution, resolution, pixels);

    // Create canvas with alpha
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Put pixel data into canvas
    const imageData = ctx.createImageData(resolution, resolution);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    // Capture frame with alpha
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        renderTarget.dispose();
      }, 'image/png');
    });
    
    frames.push(blob);
  }

  // Restore original settings
  renderer.setSize(originalSize.x, originalSize.y);
  renderer.setPixelRatio(originalPixelRatio);
  scene.background = originalBackground;
  renderer.setClearColor(originalClearColor, originalClearAlpha);
  camera.position.copy(originalCameraPosition);
  camera.aspect = originalCameraAspect;
  camera.fov = originalCameraFov;
  camera.updateProjectionMatrix();
  mesh.rotation.copy(originalMeshRotation);

  // Create ZIP with all frames
  const zip = new JSZip();
  frames.forEach((blob, index) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    zip.file(`frame_${frameNumber}.png`, blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
}

export function downloadBlob(blob: Blob, filename: string) {
  saveAs(blob, filename);
}
