const fs = require('fs');

const code = fs.readFileSync('invifest-bundle.js', 'utf8');

// Find function declarations or component names
const snippets = [];
const regex = /function\s+([a-zA-Z0-9_]+)\s*\([^\)]*\)\s*\{/g;
let match;
while ((match = regex.exec(code)) !== null) {
  if (match[1].length > 2 && !match[1].startsWith('_')) {
    snippets.push(match[1]);
  }
}
console.log('Top functions:', [...new Set(snippets)].slice(0, 50));

// Find sections or text in code
const textSnippets = [
  'invifest', 'envelope', 'wax', 'seal', 'couple', 'event', 'sangeet', 'phere', 'reception', 'timeline', 'gallery', 'rsvp', 'dress code'
];

textSnippets.forEach(t => {
  const idx = code.indexOf(t);
  if (idx !== -1) {
    console.log(`=== Match for "${t}" ===`);
    console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + 300)));
  }
});
