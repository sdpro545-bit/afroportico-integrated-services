const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const root = path.resolve(__dirname, '..');
  const inputLogo = path.join(root, 'assets', 'original', 'Geometric_Navy_and_Teal_Portal_Emblem.png');
  const publicDir = path.join(root, 'public');

  console.log('Reading input logo:', inputLogo);
  const image = sharp(inputLogo);
  const metadata = await image.metadata();
  console.log('Original dimensions:', metadata.width, metadata.height);

  // Extract raw pixel data to make near-white background transparent
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const thresholdLow = 230;
  const thresholdHigh = 252;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If near white, calculate transparency
    if (r >= thresholdLow && g >= thresholdLow && b >= thresholdLow) {
      const minVal = Math.min(r, g, b);
      if (minVal >= thresholdHigh) {
        data[i + 3] = 0; // fully transparent
      } else {
        // smooth gradient alpha
        const factor = (thresholdHigh - minVal) / (thresholdHigh - thresholdLow);
        data[i + 3] = Math.round(255 * factor);
      }
    }
  }

  // Save transparent logo-mark.png
  const logoMarkBuffer = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).trim().png().toBuffer();

  const logoMarkPath = path.join(publicDir, 'logo-mark.png');
  fs.writeFileSync(logoMarkPath, logoMarkBuffer);
  console.log('Generated:', logoMarkPath);

  // Also save in assets
  fs.writeFileSync(path.join(root, 'assets', 'logo-mark.png'), logoMarkBuffer);

  // 1. Favicon 32x32 and 16x16
  const fav32 = await sharp(logoMarkBuffer).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32);

  const fav16 = await sharp(logoMarkBuffer).resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), fav16);

  // 2. Android Chrome 192 and 512 (with white field + 15% padding)
  const icon192 = await sharp(logoMarkBuffer)
    .resize(150, 150, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .extend({
      top: 21, bottom: 21, left: 21, right: 21,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), icon192);

  const icon512 = await sharp(logoMarkBuffer)
    .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .extend({
      top: 56, bottom: 56, left: 56, right: 56,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), icon512);

  // 3. Apple touch icon 180 (centered on white, 20% padding)
  const appleTouch = await sharp(logoMarkBuffer)
    .resize(130, 130, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .extend({
      top: 25, bottom: 25, left: 25, right: 25,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

  // 4. White tile logo for dark surfaces (radius 16, padding 12)
  const tileInner = await sharp(logoMarkBuffer).resize(64, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();
  const whiteTileSvg = Buffer.from(`
    <svg width="88" height="72" viewBox="0 0 88 72" xmlns="http://www.w3.org/2000/svg">
      <rect width="88" height="72" rx="16" fill="#FFFFFF"/>
    </svg>
  `);
  const logoTile = await sharp(whiteTileSvg)
    .composite([{ input: tileInner, gravity: 'center' }])
    .png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-tile.png'), logoTile);

  // 5. OG Image: 1200x630 (white field, mark left, typography)
  const markForOg = await sharp(logoMarkBuffer).resize(220, 160, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();
  const ogSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#EEF3F5"/>
      <rect x="40" y="40" width="1120" height="550" rx="28" fill="#FFFFFF" stroke="#04374D" stroke-opacity="0.1" stroke-width="2"/>
      <text x="360" y="240" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="44" fill="#04374D" letter-spacing="1">AFROPORTICO</text>
      <text x="360" y="290" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="24" fill="#2BC194" letter-spacing="0.5">INTEGRATED SERVICES LIMITED</text>
      <text x="360" y="370" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="400" font-size="20" fill="#3D5A68">Engineering, Procurement &amp; Contracting</text>
      <text x="360" y="410" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="500" font-size="16" fill="#04374D">Mechanical • Oil &amp; Gas • Facility Management • Electrical &amp; Telecoms</text>
      <line x1="360" y1="450" x2="1080" y2="450" stroke="#04374D" stroke-opacity="0.12" stroke-width="1"/>
      <text x="360" y="490" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="500" font-size="15" fill="#3D5A68">37 Water Resources Road, Effurun, Warri, Delta State, Nigeria</text>
    </svg>
  `);

  const ogImage = await sharp(ogSvg)
    .composite([{ input: markForOg, left: 100, top: 200 }])
    .png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogImage);

  console.log('All brand logos and social icons successfully generated!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
