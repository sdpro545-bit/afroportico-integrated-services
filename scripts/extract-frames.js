const fs = require('fs');
const path = require('path');
const { execSync, execFileSync } = require('child_process');
const sharp = require('sharp');

const projectRoot = path.resolve(__dirname, '..');
const videoPath = path.join(projectRoot, 'assets', 'Recreating_oil_and_gas_logo_b6d650d7_1080p.mp4');
const framesDir = path.join(projectRoot, 'public', 'frames');
const framesSmDir = path.join(projectRoot, 'public', 'frames-sm');

function findFfmpeg() {
  const localCandidates = [
    path.join(projectRoot, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe'),
    path.join(projectRoot, '..', 'Meddy Oil and Gas', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe'),
  ];
  for (const c of localCandidates) {
    if (fs.existsSync(c)) return c;
  }
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch {
    const wingetBase = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages');
    if (fs.existsSync(wingetBase)) {
      const dirs = fs.readdirSync(wingetBase).filter((d) => d.startsWith('Gyan.FFmpeg'));
      for (const d of dirs) {
        const pkgDir = path.join(wingetBase, d);
        const subDirs = fs.readdirSync(pkgDir);
        for (const sub of subDirs) {
          const candidate = path.join(pkgDir, sub, 'bin', 'ffmpeg.exe');
          if (fs.existsSync(candidate)) {
            return `"${candidate}"`;
          }
        }
      }
    }
  }
  throw new Error('ffmpeg binary not found. Please install ffmpeg and ensure it is on PATH.');
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

async function run() {
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Source video not found at ${videoPath}`);
  }

  const ffmpegBin = findFfmpeg();
  cleanDir(framesDir);
  cleanDir(framesSmDir);

  console.log('Extracting 1920px desktop WebP frames to /public/frames/ ...');
  execFileSync(
    ffmpegBin,
    ['-y', '-i', videoPath, '-vf', 'scale=1920:-2', '-c:v', 'libwebp', '-quality', '75', '-compression_level', '6', path.join(framesDir, 'frame_%04d.webp')],
    { stdio: 'inherit' }
  );

  console.log('Extracting 9:16 mobile portrait WebP frames (720x1280) to /public/frames-sm/ ...');
  // Crop center 1380x1080 (keeps full AIS logo uncropped) and scale to 720x564
  const tmpDir = path.join(projectRoot, 'public', '_frames_sm_tmp');
  cleanDir(tmpDir);
  execFileSync(
    ffmpegBin,
    ['-y', '-i', videoPath, '-vf', 'crop=1380:1080:(iw-1380)/2:0,scale=720:564', path.join(tmpDir, 'frame_%04d.png')],
    { stdio: 'inherit' }
  );

  const mobW = 720;
  const mobH = 1280;
  const stripW = 720;
  const stripH = 564;
  const topOffset = Math.round((mobH - stripH) / 2);

  // Clean deep-navy Afroportico studio background (no blurred video aspect)
  const bgSvg = Buffer.from(`
    <svg width="${mobW}" height="${mobH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#022636"/>
          <stop offset="30%" stop-color="#04374D"/>
          <stop offset="70%" stop-color="#04374D"/>
          <stop offset="100%" stop-color="#022636"/>
        </linearGradient>
      </defs>
      <rect width="${mobW}" height="${mobH}" fill="url(#bg)"/>
    </svg>
  `);
  const bgBuf = await sharp(bgSvg).png().toBuffer();

  // Feather top & bottom 72px of the 720x564 video strip so it blends seamlessly into #04374D
  const featherOverlaySvg = Buffer.from(`
    <svg width="${mobW}" height="${mobH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#04374D" stop-opacity="1"/>
          <stop offset="100%" stop-color="#04374D" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="botFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#04374D" stop-opacity="0"/>
          <stop offset="100%" stop-color="#04374D" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${topOffset - 2}" width="${stripW}" height="76" fill="url(#topFade)"/>
      <rect x="0" y="${topOffset + stripH - 74}" width="${stripW}" height="76" fill="url(#botFade)"/>
    </svg>
  `);
  const featherBuf = await sharp(featherOverlaySvg).png().toBuffer();

  const tmpFiles = fs.readdirSync(tmpDir).filter((f) => f.endsWith('.png')).sort();
  for (const file of tmpFiles) {
    const outName = file.replace(/\.png$/, '.webp');
    await sharp(bgBuf)
      .composite([
        { input: path.join(tmpDir, file), top: topOffset, left: 0 },
        { input: featherBuf, top: 0, left: 0 },
      ])
      .webp({ quality: 78 })
      .toFile(path.join(framesSmDir, outName));
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });

  const desktopFrames = fs.readdirSync(framesDir).filter((f) => f.endsWith('.webp'));
  const mobileFrames = fs.readdirSync(framesSmDir).filter((f) => f.endsWith('.webp'));

  const maxDesktopKB = Math.max(
    ...desktopFrames.map((f) => fs.statSync(path.join(framesDir, f)).size / 1024)
  );
  const maxMobileKB = Math.max(
    ...mobileFrames.map((f) => fs.statSync(path.join(framesSmDir, f)).size / 1024)
  );

  console.log(`\nDone!`);
  console.log(`Desktop (/public/frames): ${desktopFrames.length} frames, max ${maxDesktopKB.toFixed(1)} KB`);
  console.log(`Mobile  (/public/frames-sm): ${mobileFrames.length} frames (720x1280 9:16), max ${maxMobileKB.toFixed(1)} KB`);
}

run();
