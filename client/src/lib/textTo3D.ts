import * as THREE from 'three';
import { parseSVGPath, parseSVGPathWithHoles } from './svgPathParser';

// SVG path cache
let svgPathCache: { [key: string]: THREE.Shape[] } = {};

export function createText3DGeometry(text: string, depth: number, edgeSmooth: boolean = true): THREE.ExtrudeGeometry {
  const char = text.toUpperCase();
  
  // Cache SVG shapes to avoid re-parsing
  if (!svgPathCache[char]) {
    svgPathCache[char] = createLetterShapes(char);
  }
  
  const shapes = svgPathCache[char];
  
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: edgeSmooth,
    bevelThickness: edgeSmooth ? 0.05 : 0.03,
    bevelSize: edgeSmooth ? 0.03 : 0.02,
    bevelSegments: edgeSmooth ? 12 : 8,
    curveSegments: 32,
  });
  
  geometry.center();
  geometry.computeVertexNormals();
  
  return geometry;
}

// Create SVG-like paths for each character
function createLetterShapes(char: string): THREE.Shape[] {
  const shape = new THREE.Shape();
  const scale = 0.6;
  
  // Define paths for all letters and numbers
  // Simplified letterforms based on common narrow fonts
  switch (char) {
    case 'A':
      shape.moveTo(-0.4 * scale, -0.6 * scale);
      shape.lineTo(0 * scale, 0.6 * scale);
      shape.lineTo(0.4 * scale, -0.6 * scale);
      shape.lineTo(0.25 * scale, -0.6 * scale);
      shape.lineTo(0.15 * scale, -0.2 * scale);
      shape.lineTo(-0.15 * scale, -0.2 * scale);
      shape.lineTo(-0.25 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'B':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.quadraticCurveTo(0.4 * scale, 0.6 * scale, 0.4 * scale, 0.15 * scale);
      shape.quadraticCurveTo(0.4 * scale, -0.3 * scale, -0.1 * scale, -0.3 * scale);
      shape.lineTo(-0.1 * scale, -0.45 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.45 * scale, 0.35 * scale, -0.6 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.75 * scale, -0.3 * scale, -0.75 * scale);
      shape.closePath();
      break;
      
    case 'C':
      shape.moveTo(0.3 * scale, 0.5 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.4 * scale, 0.7 * scale, -0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.4 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.7 * scale, 0.3 * scale, -0.5 * scale);
      shape.lineTo(0.15 * scale, -0.5 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(-0.25 * scale, -0.55 * scale, -0.25 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.25 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0.15 * scale, 0.5 * scale);
      shape.closePath();
      break;
      
    case 'D':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.quadraticCurveTo(0.4 * scale, 0.6 * scale, 0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(0.4 * scale, -0.6 * scale, -0.3 * scale, -0.6 * scale);
      shape.closePath();
      
      const hole = new THREE.Path();
      hole.moveTo(-0.15 * scale, -0.45 * scale);
      hole.quadraticCurveTo(0.25 * scale, -0.45 * scale, 0.25 * scale, 0 * scale);
      hole.quadraticCurveTo(0.25 * scale, 0.45 * scale, -0.15 * scale, 0.45 * scale);
      hole.closePath();
      shape.holes.push(hole);
      break;
      
    case 'E':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.15 * scale, 0.45 * scale);
      shape.lineTo(-0.15 * scale, 0.075 * scale);
      shape.lineTo(0.2 * scale, 0.075 * scale);
      shape.lineTo(0.2 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'F':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.15 * scale, 0.45 * scale);
      shape.lineTo(-0.15 * scale, 0.075 * scale);
      shape.lineTo(0.2 * scale, 0.075 * scale);
      shape.lineTo(0.2 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'G':
      shape.moveTo(0.3 * scale, 0.5 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.4 * scale, 0.7 * scale, -0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.4 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.4 * scale, -0.7 * scale, 0.4 * scale, -0.2 * scale);
      shape.lineTo(0.05 * scale, -0.2 * scale);
      shape.lineTo(0.05 * scale, -0.05 * scale);
      shape.lineTo(0.25 * scale, -0.05 * scale);
      shape.quadraticCurveTo(0.25 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(-0.25 * scale, -0.55 * scale, -0.25 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.25 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0.15 * scale, 0.5 * scale);
      shape.closePath();
      break;
      
    case 'H':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.075 * scale);
      shape.lineTo(0.15 * scale, 0.075 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.lineTo(0.15 * scale, -0.6 * scale);
      shape.lineTo(0.15 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.075 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'I':
      shape.moveTo(-0.1 * scale, -0.6 * scale);
      shape.lineTo(-0.1 * scale, 0.6 * scale);
      shape.lineTo(0.1 * scale, 0.6 * scale);
      shape.lineTo(0.1 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'J':
      shape.moveTo(0.1 * scale, 0.6 * scale);
      shape.lineTo(0.25 * scale, 0.6 * scale);
      shape.lineTo(0.25 * scale, -0.3 * scale);
      shape.quadraticCurveTo(0.25 * scale, -0.6 * scale, -0.1 * scale, -0.6 * scale);
      shape.quadraticCurveTo(-0.35 * scale, -0.6 * scale, -0.35 * scale, -0.4 * scale);
      shape.lineTo(-0.2 * scale, -0.4 * scale);
      shape.quadraticCurveTo(-0.2 * scale, -0.45 * scale, -0.1 * scale, -0.45 * scale);
      shape.quadraticCurveTo(0.1 * scale, -0.45 * scale, 0.1 * scale, -0.3 * scale);
      shape.closePath();
      break;
      
    case 'K':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.1 * scale);
      shape.lineTo(0.2 * scale, 0.6 * scale);
      shape.lineTo(0.4 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, 0 * scale);
      shape.lineTo(0.4 * scale, -0.6 * scale);
      shape.lineTo(0.2 * scale, -0.6 * scale);
      shape.lineTo(-0.15 * scale, -0.1 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'L':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.lineTo(-0.15 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'M':
      shape.moveTo(-0.35 * scale, -0.6 * scale);
      shape.lineTo(-0.35 * scale, 0.6 * scale);
      shape.lineTo(-0.05 * scale, 0.1 * scale);
      shape.lineTo(0.05 * scale, 0.1 * scale);
      shape.lineTo(0.35 * scale, 0.6 * scale);
      shape.lineTo(0.35 * scale, -0.6 * scale);
      shape.lineTo(0.2 * scale, -0.6 * scale);
      shape.lineTo(0.2 * scale, 0.35 * scale);
      shape.lineTo(0 * scale, -0.05 * scale);
      shape.lineTo(-0.2 * scale, 0.35 * scale);
      shape.lineTo(-0.2 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'N':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(-0.1 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, -0.2 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.lineTo(0.1 * scale, -0.6 * scale);
      shape.lineTo(-0.15 * scale, 0.2 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      break;
      
    case 'O':
      shape.moveTo(0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.4 * scale, 0.7 * scale, -0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.4 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.4 * scale, -0.7 * scale, 0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(0.4 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.closePath();
      
      const holeO = new THREE.Path();
      holeO.moveTo(0 * scale, 0.55 * scale);
      holeO.quadraticCurveTo(-0.25 * scale, 0.55 * scale, -0.25 * scale, 0 * scale);
      holeO.quadraticCurveTo(-0.25 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      holeO.quadraticCurveTo(0.25 * scale, -0.55 * scale, 0.25 * scale, 0 * scale);
      holeO.quadraticCurveTo(0.25 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      holeO.closePath();
      shape.holes.push(holeO);
      break;
      
    case 'P':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.6 * scale, 0.3 * scale, 0.15 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.3 * scale, -0.15 * scale, -0.3 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      
      const holeP = new THREE.Path();
      holeP.moveTo(-0.15 * scale, -0.15 * scale);
      holeP.quadraticCurveTo(0.15 * scale, -0.15 * scale, 0.15 * scale, 0.15 * scale);
      holeP.quadraticCurveTo(0.15 * scale, 0.45 * scale, -0.15 * scale, 0.45 * scale);
      holeP.closePath();
      shape.holes.push(holeP);
      break;
      
    case 'Q':
      shape.moveTo(0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.4 * scale, 0.7 * scale, -0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.4 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.4 * scale, -0.7 * scale, 0.4 * scale, 0 * scale);
      shape.quadraticCurveTo(0.4 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.closePath();
      
      const holeQ = new THREE.Path();
      holeQ.moveTo(0 * scale, 0.55 * scale);
      holeQ.quadraticCurveTo(-0.25 * scale, 0.55 * scale, -0.25 * scale, 0 * scale);
      holeQ.quadraticCurveTo(-0.25 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      holeQ.quadraticCurveTo(0.25 * scale, -0.55 * scale, 0.25 * scale, 0 * scale);
      holeQ.quadraticCurveTo(0.25 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      holeQ.closePath();
      shape.holes.push(holeQ);
      
      // Add tail
      const tail = new THREE.Shape();
      tail.moveTo(0.1 * scale, -0.4 * scale);
      tail.lineTo(0.35 * scale, -0.75 * scale);
      tail.lineTo(0.45 * scale, -0.65 * scale);
      tail.lineTo(0.2 * scale, -0.3 * scale);
      tail.closePath();
      return [shape, tail];
      
    case 'R':
      shape.moveTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.6 * scale, 0.3 * scale, 0.15 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.3 * scale, -0.15 * scale, -0.3 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.closePath();
      
      const holeR = new THREE.Path();
      holeR.moveTo(-0.15 * scale, -0.15 * scale);
      holeR.quadraticCurveTo(0.15 * scale, -0.15 * scale, 0.15 * scale, 0.15 * scale);
      holeR.quadraticCurveTo(0.15 * scale, 0.45 * scale, -0.15 * scale, 0.45 * scale);
      holeR.closePath();
      shape.holes.push(holeR);
      
      // Add leg
      const leg = new THREE.Shape();
      leg.moveTo(0 * scale, -0.3 * scale);
      leg.lineTo(0.35 * scale, -0.6 * scale);
      leg.lineTo(0.2 * scale, -0.6 * scale);
      leg.lineTo(-0.05 * scale, -0.4 * scale);
      leg.closePath();
      return [shape, leg];
      
    case 'S':
      shape.moveTo(0.3 * scale, 0.5 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.3 * scale, 0.7 * scale, -0.3 * scale, 0.4 * scale);
      shape.quadraticCurveTo(-0.3 * scale, 0.1 * scale, 0 * scale, 0.1 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.1 * scale, 0.3 * scale, -0.2 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(-0.3 * scale, -0.7 * scale, -0.3 * scale, -0.5 * scale);
      shape.lineTo(-0.15 * scale, -0.5 * scale);
      shape.quadraticCurveTo(-0.15 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.55 * scale, 0.15 * scale, -0.2 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.05 * scale, 0 * scale, -0.05 * scale);
      shape.quadraticCurveTo(-0.15 * scale, -0.05 * scale, -0.15 * scale, 0.4 * scale);
      shape.quadraticCurveTo(-0.15 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0.15 * scale, 0.5 * scale);
      shape.closePath();
      break;
      
    case 'T':
      shape.moveTo(-0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.45 * scale);
      shape.lineTo(0.075 * scale, 0.45 * scale);
      shape.lineTo(0.075 * scale, -0.6 * scale);
      shape.lineTo(-0.075 * scale, -0.6 * scale);
      shape.lineTo(-0.075 * scale, 0.45 * scale);
      shape.closePath();
      break;
      
    case 'U':
      shape.moveTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(-0.3 * scale, -0.2 * scale);
      shape.quadraticCurveTo(-0.3 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.7 * scale, 0.3 * scale, -0.2 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, -0.2 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(-0.15 * scale, -0.55 * scale, -0.15 * scale, -0.2 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.closePath();
      break;
      
    case 'V':
      shape.moveTo(-0.4 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, -0.6 * scale);
      shape.lineTo(0.4 * scale, 0.6 * scale);
      shape.lineTo(0.25 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, -0.3 * scale);
      shape.lineTo(-0.25 * scale, 0.6 * scale);
      shape.closePath();
      break;
      
    case 'W':
      shape.moveTo(-0.4 * scale, 0.6 * scale);
      shape.lineTo(-0.2 * scale, -0.6 * scale);
      shape.lineTo(0 * scale, 0 * scale);
      shape.lineTo(0.2 * scale, -0.6 * scale);
      shape.lineTo(0.4 * scale, 0.6 * scale);
      shape.lineTo(0.25 * scale, 0.6 * scale);
      shape.lineTo(0.1 * scale, -0.3 * scale);
      shape.lineTo(0 * scale, -0.15 * scale);
      shape.lineTo(-0.1 * scale, -0.3 * scale);
      shape.lineTo(-0.25 * scale, 0.6 * scale);
      shape.closePath();
      break;
      
    case 'X':
      shape.moveTo(-0.35 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, 0.1 * scale);
      shape.lineTo(0.35 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, 0.3 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.closePath();
      
      const bottomX = new THREE.Shape();
      bottomX.moveTo(-0.35 * scale, -0.6 * scale);
      bottomX.lineTo(0 * scale, -0.1 * scale);
      bottomX.lineTo(0.35 * scale, -0.6 * scale);
      bottomX.lineTo(0.15 * scale, -0.6 * scale);
      bottomX.lineTo(0 * scale, -0.3 * scale);
      bottomX.lineTo(-0.15 * scale, -0.6 * scale);
      bottomX.closePath();
      return [shape, bottomX];
      
    case 'Y':
      shape.moveTo(-0.35 * scale, 0.6 * scale);
      shape.lineTo(0 * scale, 0.1 * scale);
      shape.lineTo(0.35 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.075 * scale, 0.35 * scale);
      shape.lineTo(0.075 * scale, -0.6 * scale);
      shape.lineTo(-0.075 * scale, -0.6 * scale);
      shape.lineTo(-0.075 * scale, 0.35 * scale);
      shape.lineTo(-0.15 * scale, 0.6 * scale);
      shape.closePath();
      break;
      
    case 'Z':
      shape.moveTo(-0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.1 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, -0.45 * scale);
      shape.lineTo(0.1 * scale, 0.45 * scale);
      shape.closePath();
      break;
      
    // Numbers - using SVG paths
    // Using uniform scale (0.04) and letting geometry.center() handle centering
    case '0': {
      const svgPath = 'M0 8.856C0 6.088 0.496 3.92 1.488 2.352C2.496 0.783999 4.16 0 6.48 0C8.8 0 10.456 0.783999 11.448 2.352C12.456 3.92 12.96 6.088 12.96 8.856C12.96 11.64 12.456 13.824 11.448 15.408C10.456 16.992 8.8 17.784 6.48 17.784C4.16 17.784 2.496 16.992 1.488 15.408C0.496 13.824 0 11.64 0 8.856ZM9.648 8.856C9.648 7.672 9.568 6.68 9.408 5.88C9.264 5.064 8.96 4.4 8.496 3.888C8.048 3.376 7.376 3.12 6.48 3.12C5.584 3.12 4.904 3.376 4.44 3.888C3.992 4.4 3.688 5.064 3.528 5.88C3.384 6.68 3.312 7.672 3.312 8.856C3.312 10.072 3.384 11.096 3.528 11.928C3.672 12.744 3.976 13.408 4.44 13.92C4.904 14.416 5.584 14.664 6.48 14.664C7.376 14.664 8.056 14.416 8.52 13.92C8.984 13.408 9.288 12.744 9.432 11.928C9.576 11.096 9.648 10.072 9.648 8.856Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '1': {
      const svgPath = 'M0 3.096V0H5.784V17.496H2.328V3.096H0Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '2': {
      const svgPath = 'M1.272 14.088C2.808 12.808 4.032 11.744 4.944 10.896C5.856 10.032 6.616 9.136 7.224 8.208C7.832 7.28 8.136 6.368 8.136 5.472C8.136 4.656 7.944 4.016 7.56 3.552C7.176 3.088 6.584 2.856 5.784 2.856C4.984 2.856 4.368 3.128 3.936 3.672C3.504 4.2 3.28 4.928 3.264 5.856H0C0.064 3.936 0.632 2.48 1.704 1.488C2.792 0.496 4.168 0 5.832 0C7.656 0 9.056 0.488 10.032 1.464C11.008 2.424 11.496 3.696 11.496 5.28C11.496 6.528 11.16 7.72 10.488 8.856C9.816 9.992 9.048 10.984 8.184 11.832C7.32 12.664 6.192 13.672 4.8 14.856H11.88V17.64H0.0239999V15.144L1.272 14.088Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '3': {
      const svgPath = 'M0.24 5.016C0.32 3.416 0.88 2.184 1.92 1.32C2.976 0.44 4.36 0 6.072 0C7.24 0 8.24 0.208 9.072 0.624001C9.904 1.024 10.528 1.576 10.944 2.28C11.376 2.968 11.592 3.752 11.592 4.632C11.592 5.64 11.328 6.496 10.8 7.2C10.288 7.888 9.672 8.352 8.952 8.592V8.688C9.88 8.976 10.6 9.488 11.112 10.224C11.64 10.96 11.904 11.904 11.904 13.056C11.904 14.016 11.68 14.872 11.232 15.624C10.8 16.376 10.152 16.968 9.288 17.4C8.44 17.816 7.416 18.024 6.216 18.024C4.408 18.024 2.936 17.568 1.8 16.656C0.664 15.744 0.064 14.4 0 12.624H3.264C3.296 13.408 3.56 14.04 4.056 14.52C4.568 14.984 5.264 15.216 6.144 15.216C6.96 15.216 7.584 14.992 8.016 14.544C8.464 14.08 8.688 13.488 8.688 12.768C8.688 11.808 8.384 11.12 7.776 10.704C7.168 10.288 6.224 10.08 4.944 10.08H4.248V7.32H4.944C7.216 7.32 8.352 6.56 8.352 5.04C8.352 4.352 8.144 3.816 7.728 3.432C7.328 3.048 6.744 2.856 5.976 2.856C5.224 2.856 4.64 3.064 4.224 3.48C3.824 3.88 3.592 4.392 3.528 5.016H0.24Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '4': {
      const svgPath = 'M0 13.872V11.232L7.848 0H11.76V10.944H13.872V13.872H11.76V17.28H8.4V13.872H0ZM8.616 3.6L3.696 10.944H8.616V3.6Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '5': {
      const svgPath = 'M11.136 2.952H3.36V7.056C3.696 6.64 4.176 6.304 4.8 6.048C5.424 5.776 6.088 5.64 6.792 5.64C8.072 5.64 9.12 5.92 9.936 6.48C10.752 7.04 11.344 7.76 11.712 8.64C12.08 9.504 12.264 10.432 12.264 11.424C12.264 13.264 11.736 14.744 10.68 15.864C9.64 16.984 8.152 17.544 6.216 17.544C4.392 17.544 2.936 17.088 1.848 16.176C0.76 15.264 0.144 14.072 0 12.6H3.264C3.408 13.24 3.728 13.752 4.224 14.136C4.736 14.52 5.384 14.712 6.168 14.712C7.112 14.712 7.824 14.416 8.304 13.824C8.784 13.232 9.024 12.448 9.024 11.472C9.024 10.48 8.776 9.728 8.28 9.216C7.8 8.688 7.088 8.424 6.144 8.424C5.472 8.424 4.912 8.592 4.464 8.928C4.016 9.264 3.696 9.712 3.504 10.272H0.288V0H11.136V2.952Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '6': {
      const svgPath = 'M8.688 4.776C8.528 4.104 8.248 3.6 7.848 3.264C7.464 2.928 6.904 2.76 6.168 2.76C5.064 2.76 4.248 3.208 3.72 4.104C3.208 4.984 2.944 6.424 2.928 8.424C3.312 7.784 3.872 7.288 4.608 6.936C5.344 6.568 6.144 6.384 7.008 6.384C8.048 6.384 8.968 6.608 9.768 7.056C10.568 7.504 11.192 8.16 11.64 9.024C12.088 9.872 12.312 10.896 12.312 12.096C12.312 13.232 12.08 14.248 11.616 15.144C11.168 16.024 10.504 16.712 9.624 17.208C8.744 17.704 7.696 17.952 6.48 17.952C4.816 17.952 3.504 17.584 2.544 16.848C1.6 16.112 0.936 15.088 0.552 13.776C0.184 12.448 0 10.816 0 8.88C0 5.952 0.504 3.744 1.512 2.256C2.52 0.752 4.112 0 6.288 0C7.968 0 9.272 0.456 10.2 1.368C11.128 2.28 11.664 3.416 11.808 4.776H8.688ZM6.24 9.144C5.392 9.144 4.68 9.392 4.104 9.888C3.528 10.384 3.24 11.104 3.24 12.048C3.24 12.992 3.504 13.736 4.032 14.28C4.576 14.824 5.336 15.096 6.312 15.096C7.176 15.096 7.856 14.832 8.352 14.304C8.864 13.776 9.12 13.064 9.12 12.168C9.12 11.24 8.872 10.504 8.376 9.96C7.896 9.416 7.184 9.144 6.24 9.144Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '7': {
      const svgPath = 'M11.568 2.496L5.184 17.448H1.776L8.208 2.88H0V0H11.568V2.496Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '8': {
      const svgPath = 'M2.808 8.568C1.208 7.736 0.408 6.448 0.408 4.704C0.408 3.84 0.624 3.056 1.056 2.352C1.504 1.632 2.168 1.064 3.048 0.648001C3.944 0.216001 5.032 0 6.312 0C7.592 0 8.672 0.216001 9.552 0.648001C10.448 1.064 11.112 1.632 11.544 2.352C11.992 3.056 12.216 3.84 12.216 4.704C12.216 5.584 12 6.36 11.568 7.032C11.136 7.688 10.56 8.2 9.84 8.568C10.72 8.952 11.408 9.512 11.904 10.248C12.4 10.984 12.648 11.856 12.648 12.864C12.648 13.952 12.368 14.904 11.808 15.72C11.264 16.52 10.512 17.136 9.552 17.568C8.592 18 7.512 18.216 6.312 18.216C5.112 18.216 4.032 18 3.072 17.568C2.128 17.136 1.376 16.52 0.816 15.72C0.272 14.904 0 13.952 0 12.864C0 11.856 0.248 10.984 0.744 10.248C1.24 9.496 1.928 8.936 2.808 8.568ZM8.952 5.184C8.952 4.4 8.712 3.792 8.232 3.36C7.768 2.928 7.128 2.712 6.312 2.712C5.512 2.712 4.872 2.928 4.392 3.36C3.928 3.792 3.696 4.408 3.696 5.208C3.696 5.928 3.936 6.504 4.416 6.936C4.912 7.368 5.544 7.584 6.312 7.584C7.08 7.584 7.712 7.368 8.208 6.936C8.704 6.488 8.952 5.904 8.952 5.184ZM6.312 10.032C5.4 10.032 4.656 10.264 4.08 10.728C3.52 11.192 3.24 11.856 3.24 12.72C3.24 13.52 3.512 14.176 4.056 14.688C4.616 15.184 5.368 15.432 6.312 15.432C7.256 15.432 8 15.176 8.544 14.664C9.088 14.152 9.36 13.504 9.36 12.72C9.36 11.872 9.08 11.216 8.52 10.752C7.96 10.272 7.224 10.032 6.312 10.032Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    case '9': {
      const svgPath = 'M3.6 12.984C3.728 13.688 4.016 14.232 4.464 14.616C4.928 14.984 5.544 15.168 6.312 15.168C7.304 15.168 8.024 14.76 8.472 13.944C8.92 13.112 9.144 11.72 9.144 9.768C8.776 10.28 8.256 10.68 7.584 10.968C6.928 11.256 6.216 11.4 5.448 11.4C4.424 11.4 3.496 11.192 2.664 10.776C1.848 10.344 1.2 9.712 0.72 8.88C0.24 8.032 0 7.008 0 5.808C0 4.032 0.528 2.624 1.584 1.584C2.64 0.528001 4.08 0 5.904 0C8.176 0 9.776 0.728 10.704 2.184C11.648 3.64 12.12 5.832 12.12 8.76C12.12 10.84 11.936 12.544 11.568 13.872C11.216 15.2 10.6 16.208 9.72 16.896C8.856 17.584 7.672 17.928 6.168 17.928C4.984 17.928 3.976 17.704 3.144 17.256C2.312 16.792 1.672 16.192 1.224 15.456C0.792 14.704 0.544 13.88 0.48 12.984H3.6ZM6.144 8.664C6.976 8.664 7.632 8.408 8.112 7.896C8.592 7.384 8.832 6.696 8.832 5.832C8.832 4.888 8.576 4.16 8.064 3.648C7.568 3.12 6.888 2.856 6.024 2.856C5.16 2.856 4.472 3.128 3.96 3.672C3.464 4.2 3.216 4.904 3.216 5.784C3.216 6.632 3.456 7.328 3.936 7.872C4.432 8.4 5.168 8.664 6.144 8.664Z';
      const svgShape = parseSVGPath(svgPath, 0.04);
      return [svgShape];
    }
      
    default:
      // Fallback for unknown characters
      shape.moveTo(-0.3 * scale, -0.5 * scale);
      shape.lineTo(0.3 * scale, -0.5 * scale);
      shape.lineTo(0.3 * scale, 0.5 * scale);
      shape.lineTo(-0.3 * scale, 0.5 * scale);
      shape.closePath();
  }
  
  return [shape];
}
