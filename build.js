const fs = require('fs');
const path = require('path');
const { minify: minifyHtml } = require('html-minifier-terser');
const { minify: minifyJs } = require('terser');
const CleanCSS = require('clean-css');

const SRC = __dirname;
const OUT = path.join(__dirname, 'dist');

function copy(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : copy(s, d);
  }
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT);

  // HTML
  const htmlOpts = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
  };
  for (const f of fs.readdirSync(SRC).filter(f => f.endsWith('.html'))) {
    const src = fs.readFileSync(path.join(SRC, f), 'utf8');
    const out = await minifyHtml(src, htmlOpts);
    fs.writeFileSync(path.join(OUT, f), out);
  }

  // JS
  const jsSrc = fs.readFileSync(path.join(SRC, 'site.js'), 'utf8');
  const jsOut = await minifyJs(jsSrc, { compress: true, mangle: true });
  fs.writeFileSync(path.join(OUT, 'site.js'), jsOut.code);

  // CSS
  const cssSrc = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
  const cssOut = new CleanCSS({ level: 2 }).minify(cssSrc);
  fs.writeFileSync(path.join(OUT, 'styles.css'), cssOut.styles);

  // Static assets
  copy(path.join(SRC, 'favicon.svg'), path.join(OUT, 'favicon.svg'));
  copyDir(path.join(SRC, 'content'), path.join(OUT, 'content'));
  copyDir(path.join(SRC, 'uploads'), path.join(OUT, 'uploads'));
  copyDir(path.join(SRC, 'admin'), path.join(OUT, 'admin'));

  console.log('Build complete →', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
