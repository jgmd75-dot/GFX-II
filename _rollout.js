const fs = require('fs');
const path = require('path');
const dir = __dirname;

// files to skip entirely (already done, or bespoke/non-standard preset UX handled manually later)
const skip = new Set(['gfx-model-15.jsfx', 'gfx-model-44.jsfx', 'gfx-e-verb.jsfx', 'gfx-g-clockwork.jsfx']);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsfx') && !skip.has(f));

const log = [];

for (const f of files) {
  const fp = path.join(dir, f);
  let text = fs.readFileSync(fp, 'utf8');
  if (!/function load_preset/.test(text)) continue;
  if (/function pname\(/.test(text)) { log.push(`${f}: SKIP already has pname`); continue; }

  // ---- extract preset name list (first gfx_showmenu call) ----
  const showMenuM = text.match(/gfx_showmenu\(\s*"([^"]*)"\s*\)/);
  if (!showMenuM) { log.push(`${f}: SKIP no gfx_showmenu found`); continue; }
  const names = showMenuM[1].split('|');

  // ---- preset variable name: cur_preset (standard) or current_preset (gfx-g-mallets) ----
  const varName = /current_preset\s*=\s*1\s*;/.test(text) ? 'current_preset' : 'cur_preset';

  // ---- build pname(p) function ----
  let pnameBody = names.map((n, i) => {
    const idx = i + 1;
    const isLast = idx === names.length;
    return isLast ? `  "${n}";` : `  p == ${idx} ? "${n}" :`;
  }).join('\n');
  const pnameFn = `function pname(p) (\n${pnameBody}\n);\n`;

  // insert pname() right before "function load_preset("
  const loadPresetIdx = text.indexOf('function load_preset(');
  if (loadPresetIdx === -1) { log.push(`${f}: SKIP no load_preset anchor`); continue; }
  text = text.slice(0, loadPresetIdx) + pnameFn + text.slice(loadPresetIdx);

  // ---- geometry: canvas size ----
  const gfxCanvasM = text.match(/@gfx\s+(\d+)\s+(\d+)/);
  const canvasW = gfxCanvasM ? parseInt(gfxCanvasM[1], 10) : 900;

  // ---- geometry: chassis right edge (best-effort) ----
  const chassisM = text.match(/pk_chassis\(\s*([^,]+?)\s*,\s*[^,]+?\s*,\s*([^,]+?)\s*,/);
  let chassisRight = null;
  if (chassisM) {
    const xExpr = chassisM[1].replace(/\s*\*\s*sc/, '').trim();
    const wExpr = chassisM[2].replace(/\s*\*\s*sc/, '').trim();
    if (/^\d+$/.test(xExpr) && /^\d+$/.test(wExpr)) chassisRight = parseInt(xExpr, 10) + parseInt(wExpr, 10);
  }
  const rightEdge = chassisRight !== null ? chassisRight : (canvasW - 8);

  // ---- geometry: size picker position (always present) ----
  const sizePickerM = text.match(/ui_size_picker\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/);
  let spX = null, spY = null;
  if (sizePickerM) {
    const xExpr = sizePickerM[1].replace(/\s*\*\s*sc/, '').trim();
    const yExpr = sizePickerM[2].replace(/\s*\*\s*sc/, '').trim();
    spX = /^\d+$/.test(xExpr) ? parseInt(xExpr, 10) : null;
    spY = /^[\d.]+$/.test(yExpr) ? parseFloat(yExpr) : null;
  }

  // generic PRESETS-button finder: any call (ui_button/rd_sq/ui_keycap/...) whose first four
  // numeric-ish args are followed eventually by the literal "PRESETS"
  const presetBtnM = text.match(/\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*,\s*([^,()]+?)\s*,\s*([^,()]+?)\s*,[^)]*"PRESETS"/);
  let pbX = null, pbY = null, pbH = null;
  if (presetBtnM) {
    const xE = presetBtnM[1].trim(), yE = presetBtnM[2].trim(), hE = presetBtnM[4].trim();
    pbX = /^\d+$/.test(xE) ? parseInt(xE, 10) : null;
    pbY = /^[\d.]+$/.test(yE) ? parseFloat(yE) : null;
    pbH = /^\d+$/.test(hE) ? parseInt(hE, 10) : null;
  }

  let lcdX, lcdY, lcdW, lcdH, singleLine = false, flagged = false;
  if (spX !== null) {
    lcdX = spX + 60;
    lcdW = Math.min(120, rightEdge - lcdX - 8);
    lcdY = spY !== null ? Math.max(0, spY - 6) : 16;
    lcdH = 32;
  } else {
    lcdX = null; lcdW = -1;
  }

  if (lcdW < 70) {
    // not enough room beside the size picker (packed header) -- fall back to a slim
    // single-line readout placed just below the preset-button row, spanning the free width there
    flagged = true;
    singleLine = true;
    if (pbX !== null && pbY !== null && pbH !== null) {
      lcdX = pbX;
      lcdY = pbY + pbH + 3;
      lcdW = Math.max(60, rightEdge - lcdX - 8);
      lcdH = 16;
    } else {
      // last-resort fallback: top-right corner, clamped to canvas
      lcdX = Math.max(8, canvasW - 138);
      lcdY = 16;
      lcdW = Math.min(120, canvasW - lcdX - 8);
      lcdH = 32;
      singleLine = false;
    }
  }

  const kind = 0; // amber LCD by default; can be retuned per-file later
  let lcdBlock;
  if (singleLine) {
    const fontSize = Math.min(10, Math.max(7, Math.floor(lcdW / 12)));
    lcdBlock = `pk_lcd(${lcdX} * sc, ${lcdY} * sc, ${lcdW} * sc, ${lcdH} * sc, ${kind});\n` +
      `pk_lcdfont(9, ${fontSize} * sc); ui_col(pk_lcdc);\n` +
      `gfx_x = ${lcdX + 6} * sc; gfx_y = ${lcdY + 3} * sc; gfx_drawstr("PATCH: " + pname(${varName}));\n`;
  } else {
    const fontSizeLabel = 9, fontSizeName = Math.min(11, Math.max(8, Math.floor(lcdW / 11)));
    lcdBlock = `pk_lcd(${lcdX} * sc, ${lcdY} * sc, ${lcdW} * sc, ${lcdH} * sc, ${kind});\n` +
      `pk_lcdfont(9, ${fontSizeLabel} * sc); ui_col(pk_lcdc);\n` +
      `gfx_x = ${lcdX + 6} * sc; gfx_y = ${lcdY + 3} * sc; gfx_drawstr("PATCH");\n` +
      `pk_lcdfont(9, ${fontSizeName} * sc); ui_col(pk_lcdc);\n` +
      `gfx_x = ${lcdX + 6} * sc; gfx_y = ${lcdY + 17} * sc; gfx_drawstr(pname(${varName}));\n`;
  }

  // insert right after the ui_size_picker(...) call line
  const spCallRe = /ui_size_picker\((?:[^()]|\([^()]*\))*\)\s*;/;
  const spCallM = text.match(spCallRe);
  if (!spCallM) { log.push(`${f}: SKIP no ui_size_picker call to anchor on`); continue; }
  const insertPos = spCallM.index + spCallM[0].length;
  text = text.slice(0, insertPos) + '\n' + lcdBlock + text.slice(insertPos);

  // final safety clamp: never let the box run past the canvas edge
  if (lcdX + lcdW > canvasW - 4) { log.push(`${f}: OVERFLOW lcd would exceed canvas (x=${lcdX} w=${lcdW} canvas=${canvasW}) -- SKIPPED, needs manual placement`); continue; }

  fs.writeFileSync(fp, text, 'utf8');
  log.push(`${f}: OK lcd=(${lcdX},${lcdY},${lcdW},${lcdH}) single=${singleLine} var=${varName}${flagged ? '  <-- FLAG reduced/fallback placement' : ''}`);
}

console.log(log.join('\n'));
