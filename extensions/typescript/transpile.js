const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const tsconfig = require('./tsconfig.default.json');
const typescript = require('typescript');

console.log(process.cwd());
function transpile() {
  fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
  let results;
  try {
    // @todo: make sure this is working on Windows
    result = childProcess.execSync(path.join(__dirname, 'node_modules/.bin/tsc'));
  } catch (err) {
    console.log('transpile -> err', err);
    console.log('transpile -> stdout', err.stdout ? err.stdout.toString() : '');
    console.log('transpile -> stderr', err.stderr ? err.stderr.toString() : '');
    // @todo: probably a bug in Flows. when the next line is un-commented, Flows hangs
    // return { err };
  }
  console.log('transpile -> results', results);
  return { dir: 'dist', results };
}

module.exports = transpile;