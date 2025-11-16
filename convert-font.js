// Script to convert TTF font to Three.js JSON format
// Run: node convert-font.js
// Requires: npm install opentype.js

const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');

async function convertFont() {
  try {
    // Download Roboto SemiBold from Google Fonts
    const fontUrl = 'https://github.com/google/fonts/raw/main/apache/roboto/Roboto-SemiBold.ttf';
    console.log('Downloading Roboto SemiBold...');
    
    const https = require('https');
    const file = fs.createWriteStream('roboto_semibold_temp.ttf');
    
    https.get(fontUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('Font downloaded, converting...');
          const font = opentype.loadSync('roboto_semibold_temp.ttf');
          
          // Convert to Three.js format
          const threeFont = {
            glyphs: {},
            familyName: font.names.fontFamily.en || 'Roboto',
            ascender: font.ascender,
            descender: font.descender,
            underlinePosition: font.tables.post.underlinePosition,
            underlineThickness: font.tables.post.underlineThickness,
            boundingBox: {
              xMin: font.tables.head.xMin,
              yMin: font.tables.head.yMin,
              xMax: font.tables.head.xMax,
              yMax: font.tables.head.yMax
            },
            resolution: 1000,
            original_font_information: font.names
          };
          
          // Convert glyphs
          for (let i = 0; i < font.glyphs.length; i++) {
            const glyph = font.glyphs.get(i);
            if (glyph.unicode !== undefined) {
              const char = String.fromCharCode(glyph.unicode);
              threeFont.glyphs[char] = {
                ha: glyph.advanceWidth,
                x_min: glyph.xMin,
                y_min: glyph.yMin,
                x_max: glyph.xMax,
                y_max: glyph.yMax,
                o: glyph.path.commands.map(cmd => {
                  if (cmd.type === 'M') return `M ${cmd.x} ${cmd.y}`;
                  if (cmd.type === 'L') return `L ${cmd.x} ${cmd.y}`;
                  if (cmd.type === 'C') return `C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
                  if (cmd.type === 'Q') return `Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
                  if (cmd.type === 'Z') return 'Z';
                  return '';
                }).join(' ')
              };
            }
          }
          
          // Save to JSON
          const outputPath = path.join('client', 'public', 'fonts', 'roboto_semibold.json');
          fs.writeFileSync(outputPath, JSON.stringify(threeFont, null, 2));
          console.log(`Font converted and saved to ${outputPath}`);
          
          // Clean up temp file
          fs.unlinkSync('roboto_semibold_temp.ttf');
        });
      });
    });
  } catch (error) {
    console.error('Error converting font:', error);
  }
}

convertFont();

