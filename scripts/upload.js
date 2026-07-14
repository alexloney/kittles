require('dotenv').config();

const NeoCities = require('neocities');
const fs = require('fs');
const path = require('path');

const api = new NeoCities(process.env.NEOCITIES_USER, process.env.NEOCITIES_PASS);

// Recursively get all files from _site/
function getFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else {
      files.push({
        name: fullPath.replace('_site/', ''),  // Neocities path
        path: fullPath                         // Local path
      });
    }
  }
  return files;
}

const files = getFiles('_site');

console.log(`Uploading ${files.length} files to Neocities...`);

api.upload(files, function(resp) {
  if (resp.result === 'success') {
    console.log('Upload successful!');
  } else {
    console.error('Upload failed:', resp);
  }
});