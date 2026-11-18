const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function gradeImages() {
  const imagesDir = path.resolve(__dirname, '..', 'public', 'images');
  const files = fs.readdirSync(imagesDir);

  console.log('Grading images for Afroportico brand palette...');

  for (const file of files) {
    if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
    const filePath = path.join(imagesDir, file);

    try {
      const buffer = fs.readFileSync(filePath);
      
      const processed = await sharp(buffer)
        .modulate({
          brightness: 1.02,
          saturation: 1.05,
        })
        .sharpen({ sigma: 1.2 })
        .toBuffer();

      fs.writeFileSync(filePath, processed);
      console.log(`✓ Enhanced & tailored: ${file}`);
    } catch (err) {
      console.warn(`Could not process ${file}:`, err.message);
    }
  }

  console.log('Image processing completed.');
}

gradeImages().catch(console.error);
