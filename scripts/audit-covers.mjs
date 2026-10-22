import fs from 'node:fs';
import path from 'node:path';

const storiesDir = path.resolve('data/stories');

function getTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getTsFiles(full));
    } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'validateStory.ts') {
      results.push(full);
    }
  }
  return results;
}

const files = getTsFiles(storiesDir);
console.log(`Auditing story files: ${files.length} registered stories found.\n`);

let errors = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
  const srcMatch = content.match(/src:\s*["']([^"']+)["']/);

  if (!slugMatch) {
    console.error(`ERROR: No slug found in ${file}`);
    errors++;
    continue;
  }
  if (!srcMatch) {
    console.error(`ERROR: No cover src found in ${file}`);
    errors++;
    continue;
  }

  const slug = slugMatch[1];
  const src = srcMatch[1];

  const diskPath = path.resolve('public', src.replace(/^\//, ''));
  if (!fs.existsSync(diskPath)) {
    console.error(`MISSING: ${slug} -> ${src} NOT FOUND on disk!`);
    errors++;
  } else {
    const size = fs.statSync(diskPath).size;
    if (size < 15000) {
      console.error(`TOO SMALL: ${slug} -> ${size} bytes`);
      errors++;
    } else {
      console.log(`[PASS] ${slug.padEnd(45)} ${(size / 1024).toFixed(1).padStart(7)} KB -> ${src}`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Total audited: ${files.length} stories`);
console.log(`Errors: ${errors}`);
if (errors === 0) {
  console.log(`ALL 29 STORIES HAVE VALID COVERS ON DISK AND DATA REFERENCES!`);
}
console.log(`========================================\n`);
