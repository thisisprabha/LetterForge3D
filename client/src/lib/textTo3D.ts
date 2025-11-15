import * as THREE from 'three';

// Simplified SVG path-based approach for creating 3D text without FontLoader
export function createText3DGeometry(text: string, depth: number): THREE.ExtrudeGeometry {
  const shapes = createLetterShapes(text.toUpperCase());
  
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 8,
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
      
    // Numbers
    case '0':
      shape.moveTo(0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.35 * scale, 0.7 * scale, -0.35 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.35 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.7 * scale, 0.35 * scale, 0 * scale);
      shape.quadraticCurveTo(0.35 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.closePath();
      
      const hole0 = new THREE.Path();
      hole0.moveTo(0 * scale, 0.55 * scale);
      hole0.quadraticCurveTo(-0.2 * scale, 0.55 * scale, -0.2 * scale, 0 * scale);
      hole0.quadraticCurveTo(-0.2 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      hole0.quadraticCurveTo(0.2 * scale, -0.55 * scale, 0.2 * scale, 0 * scale);
      hole0.quadraticCurveTo(0.2 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      hole0.closePath();
      shape.holes.push(hole0);
      break;
      
    case '1':
      shape.moveTo(-0.05 * scale, 0.4 * scale);
      shape.lineTo(0 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, -0.6 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.lineTo(-0.15 * scale, -0.45 * scale);
      shape.lineTo(0 * scale, -0.45 * scale);
      shape.lineTo(0 * scale, 0.35 * scale);
      shape.closePath();
      break;
      
    case '2':
      shape.moveTo(-0.3 * scale, 0.4 * scale);
      shape.quadraticCurveTo(-0.3 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0.3 * scale, 0.4 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0 * scale, -0.3 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.45 * scale);
      shape.lineTo(0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, -0.6 * scale);
      shape.lineTo(-0.3 * scale, -0.5 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.1 * scale, 0.15 * scale, 0.4 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(-0.15 * scale, 0.55 * scale, -0.15 * scale, 0.4 * scale);
      shape.closePath();
      break;
      
    case '3':
      shape.moveTo(-0.25 * scale, 0.5 * scale);
      shape.quadraticCurveTo(-0.25 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0.3 * scale, 0.35 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0 * scale, 0.05 * scale, 0 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0 * scale, 0.3 * scale, -0.35 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(-0.25 * scale, -0.7 * scale, -0.25 * scale, -0.5 * scale);
      shape.lineTo(-0.1 * scale, -0.5 * scale);
      shape.quadraticCurveTo(-0.1 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.55 * scale, 0.15 * scale, -0.35 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.1 * scale, 0 * scale, -0.1 * scale);
      shape.lineTo(-0.05 * scale, -0.1 * scale);
      shape.lineTo(-0.05 * scale, 0.1 * scale);
      shape.lineTo(0 * scale, 0.1 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.1 * scale, 0.15 * scale, 0.35 * scale);
      shape.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(-0.1 * scale, 0.55 * scale, -0.1 * scale, 0.5 * scale);
      shape.closePath();
      break;
      
    case '4':
      shape.moveTo(0.15 * scale, 0.6 * scale);
      shape.lineTo(0.15 * scale, -0.6 * scale);
      shape.lineTo(0 * scale, -0.6 * scale);
      shape.lineTo(0 * scale, -0.15 * scale);
      shape.lineTo(-0.3 * scale, -0.15 * scale);
      shape.lineTo(-0.3 * scale, -0.05 * scale);
      shape.lineTo(0 * scale, 0.6 * scale);
      shape.closePath();
      
      const bar4 = new THREE.Shape();
      bar4.moveTo(-0.3 * scale, -0.3 * scale);
      bar4.lineTo(0.3 * scale, -0.3 * scale);
      bar4.lineTo(0.3 * scale, -0.15 * scale);
      bar4.lineTo(-0.15 * scale, -0.15 * scale);
      bar4.lineTo(-0.15 * scale, -0.3 * scale);
      bar4.closePath();
      return [shape, bar4];
      
    case '5':
      shape.moveTo(-0.25 * scale, 0.45 * scale);
      shape.lineTo(-0.25 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.1 * scale, 0.45 * scale);
      shape.lineTo(-0.1 * scale, 0.05 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.05 * scale, 0.3 * scale, -0.3 * scale);
      shape.quadraticCurveTo(0.3 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(-0.3 * scale, -0.7 * scale, -0.3 * scale, -0.5 * scale);
      shape.lineTo(-0.15 * scale, -0.5 * scale);
      shape.quadraticCurveTo(-0.15 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.55 * scale, 0.15 * scale, -0.3 * scale);
      shape.quadraticCurveTo(0.15 * scale, -0.1 * scale, -0.1 * scale, -0.1 * scale);
      shape.lineTo(-0.25 * scale, -0.1 * scale);
      shape.closePath();
      break;
      
    case '6':
      shape.moveTo(0.25 * scale, 0.5 * scale);
      shape.quadraticCurveTo(0.25 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.35 * scale, 0.7 * scale, -0.35 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.35 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.7 * scale, 0.35 * scale, -0.3 * scale);
      shape.quadraticCurveTo(0.35 * scale, 0.1 * scale, 0 * scale, 0.1 * scale);
      shape.quadraticCurveTo(-0.2 * scale, 0.1 * scale, -0.2 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.2 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(0.2 * scale, -0.55 * scale, 0.2 * scale, -0.3 * scale);
      shape.quadraticCurveTo(0.2 * scale, -0.05 * scale, 0 * scale, -0.05 * scale);
      shape.quadraticCurveTo(-0.05 * scale, -0.05 * scale, -0.05 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.05 * scale, 0.3 * scale, 0 * scale, 0.4 * scale);
      shape.quadraticCurveTo(0.05 * scale, 0.5 * scale, 0.1 * scale, 0.5 * scale);
      shape.quadraticCurveTo(0.1 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(-0.2 * scale, 0.55 * scale, -0.2 * scale, 0.2 * scale);
      shape.closePath();
      break;
      
    case '7':
      shape.moveTo(-0.3 * scale, 0.45 * scale);
      shape.lineTo(-0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.6 * scale);
      shape.lineTo(0.3 * scale, 0.5 * scale);
      shape.lineTo(0 * scale, -0.6 * scale);
      shape.lineTo(-0.15 * scale, -0.6 * scale);
      shape.lineTo(0.1 * scale, 0.45 * scale);
      shape.closePath();
      break;
      
    case '8':
      shape.moveTo(0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.3 * scale, 0.7 * scale, -0.3 * scale, 0.35 * scale);
      shape.quadraticCurveTo(-0.3 * scale, 0 * scale, 0 * scale, 0 * scale);
      shape.quadraticCurveTo(-0.35 * scale, 0 * scale, -0.35 * scale, -0.35 * scale);
      shape.quadraticCurveTo(-0.35 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.7 * scale, 0.35 * scale, -0.35 * scale);
      shape.quadraticCurveTo(0.35 * scale, 0 * scale, 0 * scale, 0 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0 * scale, 0.3 * scale, 0.35 * scale);
      shape.quadraticCurveTo(0.3 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.closePath();
      
      const hole8Top = new THREE.Path();
      hole8Top.moveTo(0 * scale, 0.55 * scale);
      hole8Top.quadraticCurveTo(-0.15 * scale, 0.55 * scale, -0.15 * scale, 0.35 * scale);
      hole8Top.quadraticCurveTo(-0.15 * scale, 0.15 * scale, 0 * scale, 0.15 * scale);
      hole8Top.quadraticCurveTo(0.15 * scale, 0.15 * scale, 0.15 * scale, 0.35 * scale);
      hole8Top.quadraticCurveTo(0.15 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      hole8Top.closePath();
      shape.holes.push(hole8Top);
      
      const hole8Bottom = new THREE.Path();
      hole8Bottom.moveTo(0 * scale, -0.15 * scale);
      hole8Bottom.quadraticCurveTo(-0.2 * scale, -0.15 * scale, -0.2 * scale, -0.35 * scale);
      hole8Bottom.quadraticCurveTo(-0.2 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      hole8Bottom.quadraticCurveTo(0.2 * scale, -0.55 * scale, 0.2 * scale, -0.35 * scale);
      hole8Bottom.quadraticCurveTo(0.2 * scale, -0.15 * scale, 0 * scale, -0.15 * scale);
      hole8Bottom.closePath();
      shape.holes.push(hole8Bottom);
      break;
      
    case '9':
      shape.moveTo(-0.25 * scale, -0.5 * scale);
      shape.quadraticCurveTo(-0.25 * scale, -0.7 * scale, 0 * scale, -0.7 * scale);
      shape.quadraticCurveTo(0.35 * scale, -0.7 * scale, 0.35 * scale, 0 * scale);
      shape.quadraticCurveTo(0.35 * scale, 0.7 * scale, 0 * scale, 0.7 * scale);
      shape.quadraticCurveTo(-0.35 * scale, 0.7 * scale, -0.35 * scale, 0.3 * scale);
      shape.quadraticCurveTo(-0.35 * scale, -0.1 * scale, 0 * scale, -0.1 * scale);
      shape.quadraticCurveTo(0.2 * scale, -0.1 * scale, 0.2 * scale, 0 * scale);
      shape.quadraticCurveTo(0.2 * scale, 0.55 * scale, 0 * scale, 0.55 * scale);
      shape.quadraticCurveTo(-0.2 * scale, 0.55 * scale, -0.2 * scale, 0.3 * scale);
      shape.quadraticCurveTo(-0.2 * scale, 0.05 * scale, 0 * scale, 0.05 * scale);
      shape.quadraticCurveTo(0.05 * scale, 0.05 * scale, 0.05 * scale, 0 * scale);
      shape.quadraticCurveTo(0.05 * scale, -0.3 * scale, 0 * scale, -0.4 * scale);
      shape.quadraticCurveTo(-0.05 * scale, -0.5 * scale, -0.1 * scale, -0.5 * scale);
      shape.quadraticCurveTo(-0.1 * scale, -0.55 * scale, 0 * scale, -0.55 * scale);
      shape.quadraticCurveTo(0.2 * scale, -0.55 * scale, 0.2 * scale, -0.2 * scale);
      shape.closePath();
      break;
      
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
