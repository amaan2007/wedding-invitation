const fs = require('fs');

const code = fs.readFileSync('invifest-bundle.js', 'utf8');

// Find where root component or App component is
const appIdx = code.indexOf('locked-content');
console.log('locked-content idx:', appIdx);

if (appIdx !== -1) {
  const introPart = code.substring(Math.max(0, appIdx - 8000), Math.min(code.length, appIdx + 8000));
  fs.writeFileSync('intro-part.js', introPart);
  console.log('Wrote intro-part.js');
}

// Let's also look at all CSS rules in invifest-bundle.css
const css = fs.readFileSync('invifest-bundle.css', 'utf8');
fs.writeFileSync('all-css.css', css);
