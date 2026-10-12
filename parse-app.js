const fs = require('fs');

const app = fs.readFileSync('app-extracted.js', 'utf8');

const classNames = app.match(/className:[`'"][^`'"]+[`'"]/g) || [];
console.log('ClassNames found:');
console.log([...new Set(classNames)].slice(0, 50));

const sectionIds = app.match(/id:[`'"][^`'"]+[`'"]/g) || [];
console.log('Section IDs:', [...new Set(sectionIds)]);

// Let's print the texts / copy
const texts = app.match(/children:[`'"][^`'"]{4,}[`'"]/g) || [];
console.log('Sample texts:');
console.log([...new Set(texts)].slice(0, 30));
