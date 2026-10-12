const fs = require('fs');

const code = fs.readFileSync('invifest-bundle.js', 'utf8');
console.log('Bundle length:', code.length);

const urls = code.match(/https?:\/\/[^\s"'`<>]+/g) || [];
console.log('Unique URLs:');
console.log([...new Set(urls)].filter(u => !u.includes('w3.org') && !u.includes('reactjs.org') && !u.includes('vercel.app')));

// Look for image file paths or asset imports
const assetMatches = code.match(/\/assets\/[a-zA-Z0-9_\-\.]+/g) || [];
console.log('Asset matches:', [...new Set(assetMatches)]);

// Look for strings containing audio or mp3
const audioMatches = code.match(/[a-zA-Z0-9_\-\.\/]+\.mp3/g) || [];
console.log('Audio matches:', [...new Set(audioMatches)]);
