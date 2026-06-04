'use strict';
/**
 * scan-images.js — 掃描圖片並輸出 scripts/image-list.json
 *
 * 用法：npm run scan-images
 *
 * 追蹤來源：
 *   1. 磁碟：img/ 子目錄 + 根目錄 favicon 圖示
 *   2. 原始碼：js / html / css 中引用的圖片路徑（偵測「引用但缺少」的情況）
 *
 * 持久資料（scripts/image-meta.json）：只存 maxKB，無 usages。
 * 輸出（scripts/image-list.json）：[{ path, maxKB }, ...] 的 flat 陣列。
 *
 * usages（使用位置）由 image-maintenance.html 在瀏覽器端即時 fetch 偵測，
 * 不存在於任何靜態檔案中。
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname, '..');
const META_FILE  = path.join(__dirname, 'image-meta.json');
const LIST_FILE  = path.join(__dirname, 'image-list.json');

const IMG_EXTS   = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico']);
const SRC_EXTS   = new Set(['.js', '.html', '.css', '.webmanifest']);

/* ── maxKB 預設值（依路徑前綴） ─────────────────────────────── */
function defaultMaxKB(p) {
  p = p.replace(/\\/g, '/');
  if (!p.startsWith('img/')) {
    const n = p.toLowerCase();
    return n.includes('512') ? 30 : (n.includes('16') || n.includes('32')) ? 5 : 20;
  }
  if (p.startsWith('img/brand/'))        return 50;
  if (p.startsWith('img/home/banner'))   return 500;
  if (p.startsWith('img/home/solution')) return 200;
  if (p.startsWith('img/home/'))         return 200;
  if (p.startsWith('img/solutions/'))    return 500;
  if (p.startsWith('img/icons/'))        return 30;
  if (p.startsWith('img/cases/'))        return 100;
  if (p.startsWith('img/clients/'))      return 100;
  if (p.startsWith('img/FAQ/'))          return 30;
  if (p.startsWith('img/tech/'))         return 30;
  return 200;
}

/* ── 磁碟掃描 ──────────────────────────────────────────────── */
function scanDisk() {
  const found = new Set();
  for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (entry.isFile() && IMG_EXTS.has(path.extname(entry.name).toLowerCase())) {
      found.add(entry.name);
    }
  }
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (IMG_EXTS.has(path.extname(entry.name).toLowerCase())) {
        found.add(path.relative(ROOT, full).replace(/\\/g, '/'));
      }
    }
  }
  walk(path.join(ROOT, 'img'));
  return found;
}

/* ── 原始碼掃描（偵測引用但缺少的圖檔）───────────────────────── */
function loadSourceFiles() {
  const files = [];
  const dirs  = [ROOT, 'js', 'css', 'template', 'pages'].map(d =>
    d === ROOT ? ROOT : path.join(ROOT, d)
  );
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      if (!SRC_EXTS.has(path.extname(entry.name).toLowerCase())) continue;
      files.push({
        relPath: path.relative(ROOT, path.join(dir, entry.name)).replace(/\\/g, '/'),
        content: fs.readFileSync(path.join(dir, entry.name), 'utf8'),
      });
    }
  }
  return files;
}

function scanCodeRefs(srcFiles) {
  const found = new Set();
  const RE = /(['"`])([^\s'"`,\)\\]*\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico))\1/gi;
  for (const { content } of srcFiles) {
    let m;
    const re = new RegExp(RE.source, 'gi');
    while ((m = re.exec(content)) !== null) {
      const raw = m[2].replace(/^\//, '');  // 去除 webmanifest 路徑開頭的 /
      if (raw.startsWith('img/') ||
          /^(favicon-|apple-touch-icon|android-chrome-)/.test(raw)) {
        found.add(raw);
      }
    }
  }
  return found;
}

/* ── 主程序 ─────────────────────────────────────────────────── */
function main() {
  console.log('\n=== 圖片維護清單掃描 ===\n');

  let meta = {};
  if (fs.existsSync(META_FILE)) {
    meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  }

  const onDisk   = scanDisk();
  const srcFiles = loadSourceFiles();
  const inCode   = scanCodeRefs(srcFiles);

  console.log(`  磁碟圖檔：${onDisk.size} 個`);
  console.log(`  程式碼引用：${inCode.size} 個`);
  console.log('');

  const allPaths = new Set([...onDisk, ...inCode, ...Object.keys(meta)]);

  let nAdded = 0, nCodeOnly = 0, nRemoved = 0;

  for (const p of [...allPaths].sort()) {
    const inMeta       = p in meta;
    const existsOnDisk = onDisk.has(p);
    const refInCode    = inCode.has(p);

    if (!inMeta) {
      if (existsOnDisk) {
        meta[p] = { maxKB: defaultMaxKB(p) };
        console.log(`  ✚ 新圖檔（磁碟）：${p}`);
        nAdded++;
      } else if (refInCode) {
        meta[p] = { maxKB: defaultMaxKB(p) };
        console.log(`  ⚠ 引用但缺少（程式碼）：${p}`);
        nCodeOnly++;
      }
    } else if (!existsOnDisk && !refInCode) {
      console.log(`  ✖ 已廢棄（移除）：${p}`);
      delete meta[p];
      nRemoved++;
    }
  }

  if (nAdded === 0 && nCodeOnly === 0 && nRemoved === 0) {
    console.log('  ✔ 無變動');
  } else {
    if (nAdded)    console.log(`\n  合計新增    ${nAdded} 筆（磁碟圖檔）`);
    if (nCodeOnly) console.log(`  合計警告    ${nCodeOnly} 筆（引用但缺少）`);
    if (nRemoved)  console.log(`  合計移除    ${nRemoved} 筆（廢棄記錄）`);
  }

  // 儲存 image-meta.json
  const sortedMeta = {};
  for (const k of Object.keys(meta).sort()) sortedMeta[k] = meta[k];
  fs.writeFileSync(META_FILE, JSON.stringify(sortedMeta, null, 2), 'utf8');

  // 輸出 image-list.json（flat 陣列，按路徑排序）
  const list = Object.keys(sortedMeta)
    .map(p => ({ path: p, maxKB: sortedMeta[p].maxKB }));
  fs.writeFileSync(LIST_FILE, JSON.stringify(list, null, 2), 'utf8');

  console.log(`\n✔ scripts/image-list.json 更新（共 ${list.length} 筆）`);
  console.log('✔ scripts/image-meta.json 已同步\n');
  console.log('  ℹ usages（使用位置）由瀏覽器在開啟 image-maintenance.html 時即時偵測\n');
}

main();
