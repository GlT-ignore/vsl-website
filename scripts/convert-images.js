const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const picturesDir = path.join(__dirname, '..', 'Assets', 'Pictures');

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async dirent => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? await getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function convert() {
  try {
    const files = await getFiles(picturesDir);
    await Promise.all(files.map(async file => {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log(`Converted ${file} -> ${outPath}`);
      }
    }));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

convert();
