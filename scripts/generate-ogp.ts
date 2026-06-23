// scripts/generate-ogp.ts — OGP画像（1200×630）を public/ogp.png に生成する。
// 実行: npx tsx scripts/generate-ogp.ts
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FONT = "'Yu Gothic','Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,'Noto Sans JP',sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f4ee"/>
  <rect x="0" y="0" width="16" height="630" fill="#1f6b5a"/>
  <rect x="16" y="0" width="6" height="630" fill="#b56a3d"/>
  <text x="96" y="196" font-family="${FONT}" font-size="74" font-weight="700" fill="#134a3d">ガジュマルの</text>
  <text x="96" y="286" font-family="${FONT}" font-size="74" font-weight="700" fill="#134a3d">育て方・種類ガイド</text>
  <text x="96" y="372" font-family="${FONT}" font-size="26" fill="#4f5560">絞め殺しの木の生態、品種と育て方、ASPCAに基づくペット安全性、</text>
  <text x="96" y="410" font-family="${FONT}" font-size="26" fill="#4f5560">沖縄のキジムナー伝承まで。出典で確かめる無料の総合ガイド</text>
  <line x1="96" y1="476" x2="720" y2="476" stroke="#d9d1bd" stroke-width="2"/>
  <text x="96" y="528" font-family="${FONT}" font-size="24" fill="#1f6b5a" font-weight="600">study-apps.com/gajumaru-info/</text>
  <!-- ガジュマル（樹冠と気根） -->
  <g transform="translate(1000 300)">
    <circle r="120" fill="#ffffff" stroke="#1f6b5a" stroke-width="3"/>
    <circle cx="0" cy="-34" r="50" fill="#5fae8e"/>
    <circle cx="-34" cy="-22" r="32" fill="#4f9a7c"/>
    <circle cx="34" cy="-22" r="32" fill="#4f9a7c"/>
    <g fill="none" stroke="#9a8060" stroke-width="9" stroke-linecap="round">
      <path d="M0 -2 L0 70"/>
      <path d="M0 22 C-22 42 -30 58 -32 74"/>
      <path d="M0 22 C22 42 30 58 32 74"/>
      <path d="M0 42 C-12 56 -16 66 -16 76"/>
      <path d="M0 42 C12 56 16 66 16 76"/>
    </g>
    <rect x="-44" y="74" width="88" height="7" rx="3.5" fill="#b56a3d"/>
  </g>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'ogp.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ogp.png (1200x630) を生成: ${outPath}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
