const fs = require('fs');

const code = fs.readFileSync('invifest-bundle.js', 'utf8');

// Find definitions of qg, Kg, Jg, Xg, Zg, Qg, r_, e_, n_, i_
const componentNames = ['qg', 'Kg', 'Jg', 'Xg', 'Zg', 'Qg', 'r_', 'e_', 'n_', 'i_'];

componentNames.forEach(comp => {
  // Find "function comp(" or "comp="
  const regex = new RegExp(`function\\s+${comp}\\s*\\(`, 'g');
  const match = regex.exec(code);
  if (match) {
    const start = match.index;
    const body = code.substring(start, start + 3000);
    fs.writeFileSync(`comp-${comp}.js`, body);
    console.log(`Extracted comp-${comp}.js (length: ${body.length})`);
  } else {
    console.log(`Could not find function ${comp}`);
  }
});
