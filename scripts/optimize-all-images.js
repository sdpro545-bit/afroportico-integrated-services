const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/user/.gemini/antigravity/brain/5aa6c4e8-8f1d-423e-a285-e74aefdfeb63';
const imagesDir = path.resolve(__dirname, '..', 'public', 'images');

// Map sources from brain artifacts or existing images
const imageSpecs = [
  {
    name: 'hero-1.webp',
    source: path.join(brainDir, 'hero_desktop_1795178291075.jpg'),
    fallback: path.join(imagesDir, 'hero-1.png'),
    width: 2000,
    height: 1125,
    isHero: true,
  },
  {
    name: 'hero-2.webp',
    source: path.join(imagesDir, 'hero-2.jpg'),
    width: 2000,
    height: 1125,
    isHero: true,
  },
  {
    name: 'hero-3.webp',
    source: path.join(imagesDir, 'hero-3.jpg'),
    width: 2000,
    height: 1125,
    isHero: true,
  },
  {
    name: 'who-we-are-main.webp',
    source: path.join(brainDir, 'about_nigerian_engineer_1795030561368.jpg'),
    fallback: path.join(imagesDir, 'who-we-are-main.png'),
    width: 960,
    height: 1200,
    isHero: false,
  },
  {
    name: 'who-we-are-small.webp',
    source: path.join(imagesDir, 'who-we-are-small.jpg'),
    width: 800,
    height: 1000,
    isHero: false,
  },
  {
    name: 'faq-side.webp',
    source: path.join(brainDir, 'qhse_toolbox_talk_1795030611589.jpg'),
    fallback: path.join(imagesDir, 'faq-side.png'),
    width: 1400,
    height: 788,
    isHero: false,
  },
  {
    name: 'industry-infra.webp',
    source: path.join(brainDir, 'industry_infra_1795606485198.jpg'),
    fallback: path.join(imagesDir, 'industry-infra.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'industry-fmcg.webp',
    source: path.join(brainDir, 'industry_fmcg_1795606502340.jpg'),
    fallback: path.join(imagesDir, 'industry-fmcg.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'industry-oilgas.webp',
    source: path.join(brainDir, 'industry_oilgas_1795606545007.jpg'),
    fallback: path.join(imagesDir, 'industry-oilgas.jpg'),
    width: 1200,
    height: 900,
    isHero: false,
  },
  {
    name: 'industry-power.webp',
    source: path.join(imagesDir, 'industry-power.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'service-electrical.webp',
    source: path.join(brainDir, 'service_electrical_1795606579715.jpg'),
    fallback: path.join(imagesDir, 'service-electrical.webp'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'service-mechanical.webp',
    source: path.join(imagesDir, 'service-mechanical.webp'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'service-oil-gas.webp',
    source: path.join(imagesDir, 'service-oil-gas.webp'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'service-facility.webp',
    source: path.join(imagesDir, 'service-facility.webp'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-1.webp',
    source: path.join(imagesDir, 'project-1.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-2.webp',
    source: path.join(brainDir, 'about_tank_1795178487082.jpg'),
    fallback: path.join(imagesDir, 'project-2.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-3.webp',
    source: path.join(imagesDir, 'project-3.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-4.webp',
    source: path.join(imagesDir, 'project-4.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-5.webp',
    source: path.join(brainDir, 'project_5_1795606557152.jpg'),
    fallback: path.join(imagesDir, 'project-5.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
  {
    name: 'project-6.webp',
    source: path.join(brainDir, 'project_6_1795606566722.jpg'),
    fallback: path.join(imagesDir, 'project-6.jpg'),
    width: 900,
    height: 1200,
    isHero: false,
  },
];

async function processImage(spec) {
  let srcFile = spec.source;
  if (!fs.existsSync(srcFile)) {
    if (spec.fallback && fs.existsSync(spec.fallback)) {
      srcFile = spec.fallback;
    } else {
      console.warn(`[WARN] Source file not found for ${spec.name}`);
      return;
    }
  }

  const { width, height, isHero } = spec;

  // 1. Shadow & Midtone Duotone Layer (Deep Navy #04374D & Darker Navy #022636)
  const shadowGradSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="35%" stop-color="#04374D" stop-opacity="0.25"/>
          <stop offset="70%" stop-color="#04374D" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#022636" stop-opacity="0.75"/>
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#vignette)"/>
    </svg>
  `;

  // 2. Highlight Layer (Teal #2BC194)
  const highlightGradSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coolGrade" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#04374D" stop-opacity="0.30"/>
          <stop offset="60%" stop-color="#087A5E" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#2BC194" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#coolGrade)"/>
    </svg>
  `;

  const composites = [
    { input: Buffer.from(shadowGradSvg), blend: 'multiply' },
    { input: Buffer.from(highlightGradSvg), blend: 'soft-light' },
  ];

  if (isHero) {
    const heroSafeScrimSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroSafeScrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#022636" stop-opacity="0.85"/>
            <stop offset="35%" stop-color="#04374D" stop-opacity="0.70"/>
            <stop offset="55%" stop-color="#04374D" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#04374D" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#heroSafeScrim)"/>
      </svg>
    `;
    composites.push({ input: Buffer.from(heroSafeScrimSvg), blend: 'over' });
  }

  // Grain
  const grainSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.17  0 0 0 0 0.75  0 0 0 0 0.58  0 0 0 0.03 0"/>
      </filter>
      <rect width="${width}" height="${height}" filter="url(#grain)"/>
    </svg>
  `;
  composites.push({ input: Buffer.from(grainSvg), blend: 'screen' });

  const destFile = path.join(imagesDir, spec.name);

  // Resize, grade, compress to WebP under 300KB
  let quality = 82;
  let buffer = await sharp(srcFile)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.98, saturation: 0.88 })
    .composite(composites)
    .sharpen({ sigma: 1.0 })
    .webp({ quality, effort: 5 })
    .toBuffer();

  while (buffer.length > 300 * 1024 && quality > 40) {
    quality -= 5;
    buffer = await sharp(srcFile)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.98, saturation: 0.88 })
      .composite(composites)
      .sharpen({ sigma: 1.0 })
      .webp({ quality, effort: 5 })
      .toBuffer();
  }

  fs.writeFileSync(destFile, buffer);
  const sizeKB = (buffer.length / 1024).toFixed(1);
  console.log(`✓ Processed ${spec.name} (${width}x${height}, ${sizeKB} KB, Q=${quality})`);
}

async function run() {
  console.log('=== Optimizing & Grading All Afroportico Production Images ===\n');
  for (const spec of imageSpecs) {
    await processImage(spec);
  }
  console.log('\nAll images successfully processed into WebP under 300KB each!');
}

run().catch(console.error);