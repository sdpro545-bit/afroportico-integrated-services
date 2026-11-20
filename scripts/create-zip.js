const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetZipDownloads = 'C:/Users/user/Downloads/Afroportico_Integrated_Services_Website.zip';
const targetZipDoc = 'C:/Users/user/Documents/0001 Web Design Project/Afroportico_Integrated_Services_Website.zip';
const projectDir = 'C:/Users/user/Documents/0001 Web Design Project/Afroportico integrated services limited';

console.log('Creating zip archive...');
execSync(`tar -a -c -f "${targetZipDownloads}" --exclude=node_modules --exclude=.next --exclude=.git *`, {
  cwd: projectDir,
  stdio: 'inherit',
});

fs.copyFileSync(targetZipDownloads, targetZipDoc);

const stat = fs.statSync(targetZipDownloads);
console.log(`Successfully created zip archive:`);
console.log(`- Downloads: ${targetZipDownloads} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`- Project Dir: ${targetZipDoc}`);
