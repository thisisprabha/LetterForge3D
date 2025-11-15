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

  renderer.setSize(resolution, resolution);
  renderer.setPixelRatio(1);

  renderer.render(scene, camera);

  return new Promise((resolve) => {
    renderer.domElement.toBlob((blob) => {
      renderer.setSize(originalSize.x, originalSize.y);
      renderer.setPixelRatio(originalPixelRatio);
      
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
  const position = geometry.attributes.position;
  const index = geometry.index;
  
  // Extract vertex data
  const vertices: string[] = [];
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    vertices.push(`(${x.toFixed(6)}, ${y.toFixed(6)}, ${z.toFixed(6)})`);
  }
  
  // Extract face data
  const faceVertexCounts: number[] = [];
  const faceVertexIndices: number[] = [];
  
  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      faceVertexCounts.push(3);
      faceVertexIndices.push(index.getX(i), index.getX(i + 1), index.getX(i + 2));
    }
  }
  
  // Create USDA content with actual geometry data
  const ior = materialConfig?.ior || 1.5;
  const roughness = materialConfig?.roughness || 0.02;
  const transmission = materialConfig?.transmission || 1.0;
  const color = materialConfig?.baseColor || '#ffffff';
  
  // Convert hex color to RGB
  const c = new THREE.Color(color);
  const colorStr = `(${c.r.toFixed(3)}, ${c.g.toFixed(3)}, ${c.b.toFixed(3)})`;
  
  const usdzContent = `#usda 1.0
(
    defaultPrim = "Letter"
    metersPerUnit = 0.01
    upAxis = "Y"
)

def Xform "Letter"
{
    def Mesh "geometry"
    {
        int[] faceVertexCounts = [${faceVertexCounts.join(', ')}]
        int[] faceVertexIndices = [${faceVertexIndices.join(', ')}]
        point3f[] points = [${vertices.join(', ')}]
        uniform token subdivisionScheme = "none"
        
        color3f[] primvars:displayColor = [${colorStr}]
        
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
                float inputs:ior = ${ior}
                float inputs:roughness = ${roughness}
                float inputs:opacity = ${transmission}
                float inputs:metallic = 0.0
                token outputs:surface
            }
        }
    }
}
`;
  
  return new Blob([usdzContent], { type: 'model/vnd.usdz+zip' });
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

export function downloadBlob(blob: Blob, filename: string) {
  saveAs(blob, filename);
}
