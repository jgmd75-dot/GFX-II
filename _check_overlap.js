const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsfx') && /^gfx-/.test(f));
const num = '(\\d+(?:\\.\\d+)?)(?:\\s*\\*\\s*sc)?';
for (const f of files) {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  const lcdRe = new RegExp('pk_lcd\\(\\s*' + num + '\\s*,\\s*' + num + '\\s*,\\s*' + num + '\\s*,\\s*' + num);
  const m = text.match(lcdRe);
  if (!m) continue;
  const lx = +m[1], ly = +m[2], lw = +m[3], lh = +m[4];
  const btnRe = new RegExp('(?:ui_button|rd_sq|ui_keycap|rkey|lbtn|pk_ledbtn|\\bkey)\\(\\s*' + num + '\\s*,\\s*' + num + '\\s*,\\s*' + num + '\\s*,\\s*' + num + '\\s*,', 'g');
  let bm, overlaps = [];
  while ((bm = btnRe.exec(text))) {
    const bx = +bm[1], by = +bm[2], bw = +bm[3], bh = +bm[4];
    const xOverlap = lx < bx + bw && lx + lw > bx;
    const yOverlap = ly < by + bh && ly + lh > by;
    if (xOverlap && yOverlap) overlaps.push(`(${bx},${by},${bw},${bh})`);
  }
  if (overlaps.length) console.log(`${f}: lcd=(${lx},${ly},${lw},${lh}) OVERLAPS ${overlaps.join(' ')}`);

  // also check against ui_size_picker (approx 58px wide x 20px tall footprint)
  const spRe = new RegExp('ui_size_picker\\(\\s*' + num + '\\s*,\\s*' + num + '\\s*\\)');
  const spm = text.match(spRe);
  if (spm) {
    const sx = +spm[1], sy = +spm[2], sw = 58, sh = 20;
    const xOverlap = lx < sx + sw && lx + lw > sx;
    const yOverlap = ly < sy + sh && ly + lh > sy;
    if (xOverlap && yOverlap) console.log(`${f}: lcd=(${lx},${ly},${lw},${lh}) OVERLAPS sizepicker(${sx},${sy})`);
  }
}
