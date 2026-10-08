const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsfx'));

const skip = new Set(['gfx-model-15.jsfx', 'gfx-model-44.jsfx']);

const results = [];
for (const f of files) {
  if (skip.has(f)) continue;
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  if (!/function load_preset/.test(text)) continue;

  const chassisM = text.match(/pk_chassis\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*(\w+)\s*\)/);
  const gfxCanvasM = text.match(/@gfx\s+(\d+)\s+(\d+)/);
  const sizePickerM = text.match(/ui_size_picker\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/);
  const presetBtnM = text.match(/ui_button\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*"PRESETS"/);
  const showMenuMs = [...text.matchAll(/gfx_showmenu\(\s*"([^"]*)"\s*\)/g)];
  const curPresetDecl = /cur_preset\s*=\s*1\s*;/.test(text);
  const currentPresetDecl = /current_preset\s*=\s*1\s*;/.test(text);
  const hasPrevNext = /ui_button\([^)]*"<"/.test(text);

  results.push({
    f,
    chassis: chassisM ? chassisM.slice(1).join(',') : null,
    canvas: gfxCanvasM ? gfxCanvasM[1] + 'x' + gfxCanvasM[2] : null,
    sizePicker: sizePickerM ? sizePickerM.slice(1).join(',') : null,
    presetBtn: presetBtnM ? presetBtnM.slice(1).join(',') : null,
    showMenuCount: showMenuMs.length,
    showMenu: showMenuMs.map(m => m[1]),
    curPresetDecl,
    currentPresetDecl,
    hasPrevNext,
  });
}

for (const r of results) {
  console.log(JSON.stringify(r));
}
console.log('TOTAL:', results.length);
