const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function harmonizeAllImages() {
  const root = path.resolve(__dirname, '..');
  const imagesDir = path.join(root, 'public', 'images');
  const logoMarkPath = path.join(root, 'public', 'logo-mark.png');
  const logoTilePath = path.join(root, 'public', 'logo-tile.png');

  console.log('Loading brand emblems for composite...');
  const logoMarkBuf = fs.readFileSync(logoMarkPath);
  const logoTileBuf = fs.readFileSync(logoTilePath);

  // 1. Process Hero 1 (Engineer with chest badge)
  const hero1Path = path.join(imagesDir, 'hero-1.png');
  if (fs.existsSync(hero1Path)) {
    const meta = await sharp(hero1Path).metadata();
    console.log('hero-1 dimensions:', meta.width, meta.height);

    // Create realistic embroidered badge with white background and subtle rounded border
    const badgeW = Math.round(meta.width * 0.08); // 8% of width for chest badge
    const badgeH = Math.round(badgeW * 0.75);

    const badge = await sharp(logoTileBuf)
      .resize(badgeW, badgeH, { fit: 'contain' })
      .png()
      .toBuffer();

    // Place on the engineer's left chest (right side of image, lower chest area)
    const leftPos = Math.round(meta.width * 0.68);
    const topPos = Math.round(meta.height * 0.48);

    const hero1Composited = await sharp(hero1Path)
      .composite([{
        input: badge,
        left: leftPos,
        top: topPos,
        blend: 'over'
      }])
      .png()
      .toBuffer();

    fs.writeFileSync(hero1Path, hero1Composited);
    console.log('✓ Composited Afroportico brand emblem onto hero-1.png');
  }

  // 2. Process Who We Are Main (Engineer inspecting facility)
  const whoMainPath = path.join(imagesDir, 'who-we-are-main.png');
  if (fs.existsSync(whoMainPath)) {
    const meta = await sharp(whoMainPath).metadata();
    const badgeW = Math.round(meta.width * 0.07);
    const badgeH = Math.round(badgeW * 0.75);

    const badge = await sharp(logoTileBuf)
      .resize(badgeW, badgeH, { fit: 'contain' })
      .png()
      .toBuffer();

    const leftPos = Math.round(meta.width * 0.52);
    const topPos = Math.round(meta.height * 0.44);

    const whoComposited = await sharp(whoMainPath)
      .composite([{
        input: badge,
        left: leftPos,
        top: topPos,
        blend: 'over'
      }])
      .png()
      .toBuffer();

    fs.writeFileSync(whoMainPath, whoComposited);
    console.log('✓ Composited Afroportico brand emblem onto who-we-are-main.png');
  }

  // 3. Process FAQ Side (Safety Toolbox Talk)
  const faqSidePath = path.join(imagesDir, 'faq-side.png');
  if (fs.existsSync(faqSidePath)) {
    const meta = await sharp(faqSidePath).metadata();
    const badgeW = Math.round(meta.width * 0.065);
    const badgeH = Math.round(badgeW * 0.75);

    const badge = await sharp(logoTileBuf)
      .resize(badgeW, badgeH, { fit: 'contain' })
      .png()
      .toBuffer();

    const leftPos = Math.round(meta.width * 0.42);
    const topPos = Math.round(meta.height * 0.38);

    const faqComposited = await sharp(faqSidePath)
      .composite([{
        input: badge,
        left: leftPos,
        top: topPos,
        blend: 'over'
      }])
      .png()
      .toBuffer();

    fs.writeFileSync(faqSidePath, faqComposited);
    console.log('✓ Composited Afroportico brand emblem onto faq-side.png');
  }

  // 4. Color Harmonize ALL images with brand palette (Deep Navy #04374D & Turquoise #2BC194)
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
    const filePath = path.join(imagesDir, file);

    try {
      const buffer = fs.readFileSync(filePath);
      const meta = await sharp(buffer).metadata();

      // Create a subtle SVG color overlay matrix that maps deep tones to #04374D and highlights to #2BC194
      const overlaySvg = Buffer.from(`
        <svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brandGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#04374D" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#2BC194" stop-opacity="0.12"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#brandGrad)"/>
        </svg>
      `);

      const harmonized = await sharp(buffer)
        .composite([{
          input: overlaySvg,
          blend: 'soft-light'
        }])
        .sharpen({ sigma: 1.1 })
        .toBuffer();

      fs.writeFileSync(filePath, harmonized);
      console.log(`✓ Harmonized color scheme on: ${file}`);
    } catch (err) {
      console.warn(`Could not harmonize ${file}:`, err.message);
    }
  }

  console.log('All images regenerated and harmonized to Afroportico brand system!');
}

harmonizeAllImages().catch(console.error);
