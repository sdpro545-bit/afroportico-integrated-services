const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * BRAND STYLE LOCK — Afroportico Integrated Services Limited
 * Palette:
 * - Deep navy #04374D (shadows, steel, PPE, sky at dusk)
 * - Darker navy #022636 (deepest shadows, vignette)
 * - Turquoise/emerald #2BC194 (accent: PPE trim, indicator lights, glow, reflective strips)
 * - Light tint #EEF3F5 / white (highlights, daylight)
 * No orange, no yellow, no saturated blue, no red. Muted, cool, cinematic 35mm editorial grade.
 * SAFE-AREA RULE: Left 45% on wide hero images graded to deep navy for headline readability.
 */

async function applyBrandStyleLock() {
  const imagesDir = path.resolve(__dirname, '..', 'public', 'images');
  const files = fs.readdirSync(imagesDir);

  console.log('=== Executing Afroportico Studio Brand Style Lock ===');
  console.log('Palette: Deep Navy #04374D | Darker Navy #022636 | Emerald #2BC194 | Tint #EEF3F5');

  let count = 0;

  for (const file of files) {
    if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
    const filePath = path.join(imagesDir, file);
    const isHero = file.startsWith('hero-');

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const meta = await sharp(inputBuffer).metadata();
      const width = meta.width || 1400;
      const height = meta.height || 900;

      // 1. Shadow & Midtone Duotone Layer (Deep Navy #04374D & Darker Navy #022636)
      const shadowGradSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
              <stop offset="35%" stop-color="#04374D" stop-opacity="0.30"/>
              <stop offset="70%" stop-color="#04374D" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#022636" stop-opacity="0.80"/>
            </radialGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#vignette)"/>
        </svg>
      `;

      // 2. Highlight & Glow Layer (Teal/Emerald #2BC194 & Crisp Tint #EEF3F5)
      const highlightGradSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="coolGrade" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#04374D" stop-opacity="0.35"/>
              <stop offset="50%" stop-color="#087A5E" stop-opacity="0.20"/>
              <stop offset="100%" stop-color="#2BC194" stop-opacity="0.32"/>
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#coolGrade)"/>
        </svg>
      `;

      // 3. Hero Left 45% Safe-Area Scrim (keeps subject on right 55%, headline zone clean)
      let heroScrimSvg = '';
      if (isHero) {
        heroScrimSvg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroSafeScrim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#022636" stop-opacity="0.85"/>
                <stop offset="35%" stop-color="#04374D" stop-opacity="0.75"/>
                <stop offset="50%" stop-color="#04374D" stop-opacity="0.40"/>
                <stop offset="100%" stop-color="#04374D" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#heroSafeScrim)"/>
          </svg>
        `;
      }

      // 4. Subtle 35mm Organic Film Grain Texture (feTurbulence)
      const grainSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.17   0 0 0 0 0.75   0 0 0 0 0.58  0 0 0 0.04 0"/>
          </filter>
          <rect width="${width}" height="${height}" filter="url(#grain)"/>
        </svg>
      `;

      const composites = [
        {
          input: Buffer.from(shadowGradSvg),
          blend: 'multiply',
        },
        {
          input: Buffer.from(highlightGradSvg),
          blend: 'soft-light',
        },
        {
          input: Buffer.from(grainSvg),
          blend: 'screen',
        },
      ];

      if (isHero && heroScrimSvg) {
        composites.push({
          input: Buffer.from(heroScrimSvg),
          blend: 'over',
        });
      }

      // Apply modulation: cool tone, slight desaturation to remove warm cast, enhanced clarity
      let pipeline = sharp(inputBuffer)
        .modulate({
          brightness: 0.98,
          saturation: 0.88,
        })
        .composite(composites)
        .sharpen({ sigma: 1.0 });

      // Determine output format
      const ext = path.extname(file).toLowerCase();
      let outputBuffer;
      if (ext === '.webp') {
        outputBuffer = await pipeline.webp({ quality: 90 }).toBuffer();
      } else if (ext === '.png') {
        outputBuffer = await pipeline.png({ compressionLevel: 8 }).toBuffer();
      } else {
        outputBuffer = await pipeline.jpeg({ quality: 90, mozjpeg: true }).toBuffer();
      }

      fs.writeFileSync(filePath, outputBuffer);
      count++;
      console.log(`✓ Graded [${count}/${files.length}]: ${file} (${width}x${height}${isHero ? ' + Safe-Area Scrim' : ''})`);
    } catch (err) {
      console.warn(`Error grading ${file}:`, err.message);
    }
  }

  console.log(`\nBrand Style Lock successfully applied to all ${count} images!`);
}

applyBrandStyleLock().catch(console.error);
