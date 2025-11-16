import * as THREE from 'three';

/**
 * Parse SVG path string and convert to Three.js Shape
 * Supports: M, L, C, Q, V, H, Z commands
 * Handles multiple M commands: first is main shape, subsequent are holes
 */
export function parseSVGPath(svgPath: string, scale: number = 1.0, offsetX: number = 0, offsetY: number = 0): THREE.Shape {
  const shape = new THREE.Shape();
  // Split by M commands to handle multiple paths
  const pathSegments = svgPath.split(/(?=M)/i).filter(s => s.trim());
  
  pathSegments.forEach((segment, segmentIndex) => {
    // Updated regex to include V and H commands
    const commands = segment.match(/[MLCZHV][^MLCZHV]*/gi) || [];
    
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;
    let isFirstMove = true;
    
    // If this is not the first segment, it's a hole - create a Path instead
    const isHole = segmentIndex > 0;
    const path = isHole ? new THREE.Path() : shape;
    
    commands.forEach(cmd => {
      const type = cmd[0].toUpperCase();
      const coords = cmd.slice(1).trim().split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n));
      
      switch (type) {
        case 'M': // MoveTo (absolute)
          if (coords.length >= 2) {
            currentX = coords[0] * scale + offsetX;
            currentY = -coords[1] * scale + offsetY; // Invert Y for Three.js
            startX = currentX;
            startY = currentY;
            if (isFirstMove) {
              path.moveTo(currentX, currentY);
              isFirstMove = false;
            } else {
              path.moveTo(currentX, currentY);
            }
          }
          break;
        
        case 'L': // LineTo (absolute)
          if (coords.length >= 2) {
            currentX = coords[0] * scale + offsetX;
            currentY = -coords[1] * scale + offsetY; // Invert Y
            path.lineTo(currentX, currentY);
          }
          break;
          
        case 'H': // Horizontal LineTo (absolute)
          if (coords.length >= 1) {
            currentX = coords[0] * scale + offsetX;
            path.lineTo(currentX, currentY);
          }
          break;
          
        case 'V': // Vertical LineTo (absolute)
          if (coords.length >= 1) {
            currentY = -coords[0] * scale + offsetY; // Invert Y
            path.lineTo(currentX, currentY);
          }
          break;
          
        case 'C': // Cubic Bezier (absolute)
          if (coords.length >= 6) {
            const x1 = coords[0] * scale + offsetX;
            const y1 = -coords[1] * scale + offsetY;
            const x2 = coords[2] * scale + offsetX;
            const y2 = -coords[3] * scale + offsetY;
            currentX = coords[4] * scale + offsetX;
            currentY = -coords[5] * scale + offsetY;
            path.bezierCurveTo(x1, y1, x2, y2, currentX, currentY);
          }
          break;
          
        case 'Q': // Quadratic Bezier (absolute)
          if (coords.length >= 4) {
            const x1 = coords[0] * scale + offsetX;
            const y1 = -coords[1] * scale + offsetY;
            currentX = coords[2] * scale + offsetX;
            currentY = -coords[3] * scale + offsetY;
            path.quadraticCurveTo(x1, y1, currentX, currentY);
          }
          break;
          
        case 'Z': // ClosePath
          path.closePath();
          currentX = startX;
          currentY = startY;
          break;
      }
    });
    
    // If this was a hole, add it to the shape's holes array
    if (isHole && path instanceof THREE.Path) {
      shape.holes.push(path);
    }
  });
  
  return shape;
}

/**
 * Parse SVG path with holes (for numbers like 0, 6, 8, 9)
 * Returns shape with holes
 */
export function parseSVGPathWithHoles(
  mainPath: string,
  holes: string[],
  scale: number = 1.0,
  offsetX: number = 0,
  offsetY: number = 0
): THREE.Shape {
  const shape = parseSVGPath(mainPath, scale, offsetX, offsetY);
  
  holes.forEach(holePath => {
    const holeShape = parseSVGPath(holePath, scale, offsetX, offsetY);
    // Convert Shape to Path for holes - extract points from curves
    const path = new THREE.Path();
    
    // Get the starting point from the first curve
    if (holeShape.curves.length > 0) {
      const firstCurve = holeShape.curves[0];
      if (firstCurve instanceof THREE.LineCurve) {
        path.moveTo(firstCurve.v1.x, firstCurve.v1.y);
      } else if (firstCurve instanceof THREE.QuadraticBezierCurve) {
        path.moveTo(firstCurve.v0.x, firstCurve.v0.y);
      } else if (firstCurve instanceof THREE.CubicBezierCurve) {
        path.moveTo(firstCurve.v0.x, firstCurve.v0.y);
      }
    }
    
    // Add all curves to the path
    holeShape.curves.forEach(curve => {
      if (curve instanceof THREE.LineCurve) {
        path.lineTo(curve.v2.x, curve.v2.y);
      } else if (curve instanceof THREE.QuadraticBezierCurve) {
        path.quadraticCurveTo(curve.v1.x, curve.v1.y, curve.v2.x, curve.v2.y);
      } else if (curve instanceof THREE.CubicBezierCurve) {
        path.bezierCurveTo(curve.v1.x, curve.v1.y, curve.v2.x, curve.v2.y, curve.v3.x, curve.v3.y);
      }
    });
    
    path.closePath();
    shape.holes.push(path);
  });
  
  return shape;
}

