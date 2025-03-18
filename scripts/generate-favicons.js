const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const sizes = [16, 32, 180];
  const inputSvg = path.join(__dirname, '../public/icon.svg');
  const publicDir = path.join(__dirname, '../public');

  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(inputSvg);

    // Generate PNGs for different sizes
    for (const size of sizes) {
      const outputName = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, outputName));
    }

    // Copy 32x32 version as favicon.ico
    fs.copyFileSync(
      path.join(publicDir, 'favicon-32x32.png'),
      path.join(publicDir, 'favicon.ico')
    );

    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 