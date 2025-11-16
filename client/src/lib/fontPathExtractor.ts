import * as THREE from 'three';
// @ts-ignore - opentype.js doesn't have perfect TypeScript support
import * as opentype from 'opentype.js';

/**
 * Extract path from font file using opentype.js and convert to Three.js Shape
 * This is much more reliable than manual path creation
 */
export async function extractGlyphPathFromFont(
  fontPath: string,
  character: string,
  scale: number = 1.0
): Promise<THREE.Shape[]> {
  try {
    const response = await fetch(fontPath);
    const arrayBuffer = await response.arrayBuffer();
    const font = opentype.parse(arrayBuffer as any);
    
    const glyph = font.charToGlyph(character);
    if (!glyph) {
      throw new Error(`Glyph not found for character: ${character}`);
    }
    
    const shapes: THREE.Shape[] = [];
    const path = glyph.getPath(0, 0, 1000); // Get path at size 1000
    
    // Convert opentype.js path commands to Three.js Shape
    const shape = new THREE.Shape();
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;
    let isFirstMove = true;
    
    path.commands.forEach((cmd: any) => {
      switch (cmd.type) {
        case 'M': // MoveTo
          currentX = cmd.x * scale / 1000;
          currentY = -cmd.y * scale / 1000; // Invert Y for Three.js
          startX = currentX;
          startY = currentY;
          if (isFirstMove) {
            shape.moveTo(currentX, currentY);
            isFirstMove = false;
          } else {
            // Start new subpath
            shape.moveTo(currentX, currentY);
          }
          break;
          
        case 'L': // LineTo
          currentX = cmd.x * scale / 1000;
          currentY = -cmd.y * scale / 1000;
          shape.lineTo(currentX, currentY);
          break;
          
        case 'C': // Cubic Bezier
          const x1 = cmd.x1 * scale / 1000;
          const y1 = -cmd.y1 * scale / 1000;
          const x2 = cmd.x2 * scale / 1000;
          const y2 = -cmd.y2 * scale / 1000;
          currentX = cmd.x * scale / 1000;
          currentY = -cmd.y * scale / 1000;
          shape.bezierCurveTo(x1, y1, x2, y2, currentX, currentY);
          break;
          
        case 'Q': // Quadratic Bezier
          const qx1 = cmd.x1 * scale / 1000;
          const qy1 = -cmd.y1 * scale / 1000;
          currentX = cmd.x * scale / 1000;
          currentY = -cmd.y * scale / 1000;
          shape.quadraticCurveTo(qx1, qy1, currentX, currentY);
          break;
          
        case 'Z': // ClosePath
          shape.closePath();
          currentX = startX;
          currentY = startY;
          break;
      }
    });
    
    // Center the shape
    const box = new THREE.Box3().setFromObject(new THREE.Mesh(new THREE.ShapeGeometry(shape)));
    const center = box.getCenter(new THREE.Vector3());
    shape.translate(-center.x, -center.y);
    
    shapes.push(shape);
    return shapes;
  } catch (error) {
    console.error('Error extracting glyph path:', error);
    throw error;
  }
}

