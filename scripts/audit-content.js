const fs = require('fs');
const path = require('path');

const bannedTerms = [
  'Ladox',
  'ladox',
  '1991',
  'Amore Street',
  'Ikeja',
  '0803 300 0000',
  'Meddy',
  'meddy',
  'MEDDY',
  'Halliburton',
  'Schlumberger',
  'Globacom',
  'Nigalex',
  'Reynolds',
  'UAC Foods',
  'CFAO Laborex',
  'Sterling Oil',
  'Renaissance',
  '\u2014', // em dash
  '\u2013', // en dash
  '\u2011', // non-breaking hyphen
];

const scanDirs = ['content', 'src', 'docs'];
let violations = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const term of bannedTerms) {
    if (content.includes(term)) {
      const isDocOrScript = filePath.includes('docs') || filePath.includes('scripts') || filePath.includes('Afroportico_Master_Build_Prompt');
      if (isDocOrScript && (term === 'Ladox' || term === 'ladox' || term === '1991' || term === 'Ikeja' || term === 'Amore Street' || term === '\u2014' || term === '\u2013' || term === '\u2011')) {
        continue;
      }
      console.error(`[AUDIT VIOLATION] Found forbidden term "${term}" in ${filePath}`);
      violations++;
    }
  }
}

function scanDirectory(dir) {
  const fullPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) return;
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const res = path.resolve(fullPath, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
      scanDirectory(path.relative(path.resolve(__dirname, '..'), res));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.json') || entry.name.endsWith('.md'))) {
      scanFile(res);
    }
  }
}

console.log('Running Content & Provenance Integrity Audit...');
for (const dir of scanDirs) {
  scanDirectory(dir);
}

if (violations > 0) {
  console.error(`Audit failed with ${violations} violations.`);
  process.exit(1);
} else {
  console.log('Audit passed: 0 forbidden terms, 0 illegal hyphens or competitor leakage detected.');
}
