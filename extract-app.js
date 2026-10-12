const fs = require('fs');

const code = fs.readFileSync('invifest-bundle.js', 'utf8');

// Find all JSX elements / section structures in the application part of the bundle
// The app code is usually near the end of the bundle, before or after vendor libs
const appCodeStart = code.indexOf('https://pub-1953a6673e864f3488c645252f75de98');
console.log('App code start index:', appCodeStart);

if (appCodeStart !== -1) {
  const appSection = code.substring(Math.max(0, appCodeStart - 5000), Math.min(code.length, appCodeStart + 35000));
  fs.writeFileSync('app-extracted.js', appSection);
  console.log('Wrote app-extracted.js with length', appSection.length);
}

// Let's also inspect the CSS bundle
const css = fs.readFileSync('invifest-bundle.css', 'utf8');
console.log('CSS length:', css.length);
fs.writeFileSync('css-sample.css', css.substring(0, 10000));
