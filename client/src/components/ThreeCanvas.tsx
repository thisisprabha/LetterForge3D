import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { MaterialConfig, RotationState } from '@shared/schema';

interface ThreeCanvasProps {
  character: string;
  materialConfig: MaterialConfig;
  rotation: RotationState;
  onRendererReady?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, mesh: THREE.Mesh | null) => void;
}

export function ThreeCanvas({ character, materialConfig, rotation, onRendererReady }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    setIsLoading(true);

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Three-point studio lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 0, 3);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Load font and create 3D text
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const geometry = new TextGeometry(character, {
        font: font,
        size: 1,
        depth: materialConfig.thickness,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5,
      });

      geometry.center();
      geometry.computeVertexNormals();

      // Use MeshPhysicalMaterial for realistic glass with built-in features
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(materialConfig.baseColor),
        metalness: 0,
        roughness: materialConfig.roughness,
        transmission: materialConfig.transmission,
        thickness: materialConfig.thickness,
        ior: materialConfig.ior,
        envMapIntensity: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.9,
        // Simulate dispersion effect with these properties
        reflectivity: 0.9,
        sheen: materialConfig.dispersion ? 0.5 : 0,
        sheenRoughness: 0.5,
        sheenColor: materialConfig.dispersion ? new THREE.Color(0xaaccff) : new THREE.Color(0x000000),
      });

      if (meshRef.current) {
        scene.remove(meshRef.current);
      }

      const mesh = new THREE.Mesh(geometry, glassMaterial);
      meshRef.current = mesh;
      scene.add(mesh);

      if (onRendererReady) {
        onRendererReady(renderer, scene, camera, mesh);
      }

      setIsLoading(false);
    });

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x = rotation.x;
        meshRef.current.rotation.y = rotation.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [character, materialConfig.thickness]);

  // Update material properties
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.color = new THREE.Color(materialConfig.baseColor);
      material.roughness = materialConfig.roughness;
      material.transmission = materialConfig.transmission;
      material.ior = materialConfig.ior;
      material.sheen = materialConfig.dispersion ? 0.5 : 0;
      material.sheenColor = materialConfig.dispersion ? new THREE.Color(0xaaccff) : new THREE.Color(0x000000);
      material.needsUpdate = true;
    }
  }, [materialConfig]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Rendering...</div>
        </div>
      )}
    </div>
  );
}
