const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function gradeAllImages() {
  const imagesDir = path.resolve(__dirname, '..', 'public', 'images');
  const files = fs.readdirSync(imagesDir);

  console.log('Starting full brand palette grading (Navy #04374D & Emerald #2BC194)...');

  let processedCount = 0;

  for (const file of files) {
    if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
    const filePath = path.join(imagesDir, file);

    try {
      // Read entire file into buffer first to release file handle immediately on Windows
      const inputBuffer = fs.readFileSync(filePath);
      const meta = await sharp(inputBuffer).metadata();
      const width = meta.width || 1200;
      const height = meta.height || 800;

      // Build SVG overlay with Afroportico's exact corporate gradient:
      // Dark Navy (#04374D) shadows & rich Teal/Emerald (#2BC194) highlights
      const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#04374D" stop-opacity="0.45"/>
              <stop offset="45%" stop-color="#087A5E" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="#2BC194" stop-opacity="0.40"/>
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#brand)"/>
        </svg>
      `;

      let pipeline = sharp(inputBuffer)
        .composite([
          {
            input: Buffer.from(svg),
            blend: 'soft-light',
          },
        ])
        .modulate({
          brightness: 1.02,
          saturation: 1.15,
        })
        .sharpen({ sigma: 1.1 });

      const outputBuffer = await pipeline.toBuffer();
      fs.writeFileSync(filePath, outputBuffer);
      processedCount++;
      console.log(`✓ Tailored to Navy & Teal: ${file} (${width}x${height})`);
    } catch (err) {
      console.warn(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nAll ${processedCount} images successfully tailored and graded to brand green and blue!`);
}

gradeAllImages().catch(console.error);
