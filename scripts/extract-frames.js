const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const videoPath = path.join(projectRoot, 'assets', 'Recreating_oil_and_gas_logo_b6d650d7_1080p.mp4');
const framesDir = path.join(projectRoot, 'public', 'frames');
const framesSmDir = path.join(projectRoot, 'public', 'frames-sm');

function findFfmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch {
    // Fallback to WinGet Gyan.FFmpeg location on Windows
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

function run() {
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Source video not found at ${videoPath}`);
  }

  const ffmpegBin = findFfmpeg();
  cleanDir(framesDir);
  cleanDir(framesSmDir);

  console.log('Extracting 1920px desktop WebP frames to /public/frames/ ...');
  execSync(
    `${ffmpegBin} -y -i "${videoPath}" -vf "scale=1920:-2" -c:v libwebp -quality 75 -compression_level 6 "${path.join(framesDir, 'frame_%04d.webp')}"`,
    { stdio: 'inherit' }
  );

  console.log('Extracting 960px mobile WebP frames to /public/frames-sm/ ...');
  execSync(
    `${ffmpegBin} -y -i "${videoPath}" -vf "scale=960:-2" -c:v libwebp -quality 75 -compression_level 6 "${path.join(framesSmDir, 'frame_%04d.webp')}"`,
    { stdio: 'inherit' }
  );

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
  console.log(`Mobile  (/public/frames-sm): ${mobileFrames.length} frames, max ${maxMobileKB.toFixed(1)} KB`);
}

run();
