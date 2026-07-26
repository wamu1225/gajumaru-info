// 自作SVG模式図のHTML文字列を一元管理する単一の真実源（SSOT）。
// React版（App.tsx の {{figure:KEY}} 展開）と prerender（scripts/prerender.ts）の双方がここを使い、
// 二重レンダラの食い違い（生タグ露出）を防ぐ。写真は著作権リスクのため使わず、模式図で補う。
// テーマ：榕樹の深緑(#1f6b5a) × 土のテラコッタ(#b56a3d) × 生成り(#f6f4ee)。

const BG = '#f6f4ee';
const GREEN = '#1f6b5a';
const GREEN_DEEP = '#134a3d';
const LEAF = '#5fae8e';
const TERRA = '#b56a3d';
const BARK = '#9a8060';

// 1) 絞め殺しの木の三段階（着生発芽 → 気根が宿主を包む → 宿主が枯れて中空自立）
function stranglerSvg(): string {
  const host = (x: number, dead: boolean) =>
    `<path d="M${x} 96 L${x} 30" stroke="${dead ? '#cbb89a' : BARK}" stroke-width="${dead ? 7 : 9}" stroke-linecap="round" fill="none"${dead ? ' stroke-dasharray="2 4"' : ''}/>` +
    (dead ? '' : `<circle cx="${x}" cy="26" r="11" fill="#b9c79a"/><circle cx="${x - 7}" cy="30" r="7" fill="#a7b889"/><circle cx="${x + 7}" cy="30" r="7" fill="#a7b889"/>`);
  const panel = (px: number, title: string, inner: string) =>
    `<g transform="translate(${px} 0)">` +
    `<rect x="4" y="14" width="84" height="92" rx="8" fill="#ffffff" stroke="${GREEN}" stroke-width="1.4"/>` +
    inner +
    `<text x="46" y="120" font-size="10.5" font-weight="700" fill="${GREEN_DEEP}" text-anchor="middle">${title}</text>` +
    `</g>`;
  // 1: 宿主の枝の上で芽生え
  const p1 = host(46, false) +
    `<circle cx="58" cy="40" r="3" fill="${TERRA}"/>` +
    `<path d="M58 40 C62 34 68 34 70 38" stroke="${GREEN}" stroke-width="2" fill="none"/>` +
    `<circle cx="71" cy="37" r="4" fill="${LEAF}"/>`;
  // 2: 気根が宿主の幹を包む
  const p2 = host(46, false) +
    `<path d="M52 40 C40 56 40 76 46 96 M60 42 C70 58 70 78 60 96 M46 44 C46 64 48 82 50 96" stroke="${GREEN}" stroke-width="2.4" fill="none"/>` +
    `<circle cx="56" cy="38" r="4" fill="${LEAF}"/><circle cx="48" cy="40" r="3.4" fill="${LEAF}"/>`;
  // 3: 宿主が枯れ、中空の気根柱が自立
  const p3 = host(46, true) +
    `<path d="M36 96 C34 70 40 44 46 30 C52 44 58 70 56 96" stroke="${GREEN}" stroke-width="3" fill="none"/>` +
    `<path d="M40 96 C42 74 44 56 46 44 M52 96 C50 74 48 58 46 44" stroke="${GREEN}" stroke-width="2" fill="none"/>` +
    `<circle cx="46" cy="26" r="12" fill="${LEAF}"/><circle cx="36" cy="30" r="7" fill="#4f9a7c"/><circle cx="56" cy="30" r="7" fill="#4f9a7c"/>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 130" width="100%" role="img" aria-label="絞め殺しの木としてのガジュマルが宿主の上で芽生え、気根で包み、やがて中空のまま自立するまでの三段階の図">` +
    `<rect width="300" height="130" fill="${BG}"/>` +
    panel(0, '宿主の上で芽生え', p1) +
    panel(102, '気根が幹を包む', p2) +
    panel(204, '枯れた宿主を残し自立', p3) +
    `</svg>`
  );
}

// 2) 増やし方の三手法（水挿し・土挿し・取り木）
function propagationSvg(): string {
  const panel = (px: number, title: string, inner: string) =>
    `<g transform="translate(${px} 0)">` +
    `<rect x="4" y="14" width="84" height="92" rx="8" fill="#ffffff" stroke="${GREEN}" stroke-width="1.4"/>` +
    inner +
    `<text x="46" y="120" font-size="10.5" font-weight="700" fill="${GREEN_DEEP}" text-anchor="middle">${title}</text>` +
    `</g>`;
  const cutting = (topY: number, roots: boolean) =>
    `<path d="M46 ${topY + 30} L46 ${topY + 4}" stroke="${GREEN}" stroke-width="3.4" stroke-linecap="round"/>` +
    `<circle cx="46" cy="${topY + 16}" r="2.6" fill="${GREEN_DEEP}"/>` +
    `<path d="M46 ${topY + 4} C53 ${topY - 3} 63 ${topY - 1} 66 ${topY + 4} C59 ${topY + 11} 51 ${topY + 10} 46 ${topY + 7} Z" fill="${LEAF}"/>` +
    (roots ? `<path d="M46 ${topY + 30} C42 ${topY + 38} 41 ${topY + 44} 43 ${topY + 50} M46 ${topY + 30} C46 ${topY + 40} 46 ${topY + 46} 46 ${topY + 52} M46 ${topY + 30} C50 ${topY + 38} 51 ${topY + 44} 49 ${topY + 50}" stroke="${BARK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>` : '');
  // 水挿し
  const water = `<path d="M28 56 L64 56 L60 100 L32 100 Z" fill="#dcebe5" stroke="#9bc1b4" stroke-width="1.6"/>` +
    `<path d="M30 72 L62 72 L60 100 L32 100 Z" fill="#bfded3"/>` +
    `<line x1="30" y1="72" x2="62" y2="72" stroke="#9bc1b4" stroke-width="1.4"/>` +
    cutting(40, true);
  // 土挿し
  const soil = `<path d="M30 58 L62 58 L58 100 L34 100 Z" fill="#cdb49a" stroke="${BARK}" stroke-width="1.6"/>` +
    `<path d="M33 66 L59 66 L56 96 L36 96 Z" fill="#6e5640"/>` +
    cutting(42, true);
  // 取り木（環状剥皮＋水苔）
  const layering = `<path d="M46 100 L46 28" stroke="${BARK}" stroke-width="7" stroke-linecap="round"/>` +
    `<ellipse cx="46" cy="62" rx="13" ry="11" fill="#cfe0d8" stroke="#9bc1b4" stroke-width="1.6"/>` +
    `<line x1="40" y1="54" x2="40" y2="70" stroke="${TERRA}" stroke-width="1.6"/>` +
    `<line x1="52" y1="54" x2="52" y2="70" stroke="${TERRA}" stroke-width="1.6"/>` +
    `<circle cx="46" cy="30" r="9" fill="${LEAF}"/>` +
    `<text x="46" y="64" font-size="6.5" fill="${GREEN_DEEP}" text-anchor="middle">水苔</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 130" width="100%" role="img" aria-label="ガジュマルの増やし方（水挿し、土挿し、取り木）の三手法の図">` +
    `<rect width="300" height="130" fill="${BG}"/>` +
    panel(0, '水挿し', water) +
    panel(102, '土挿し', soil) +
    panel(204, '取り木', layering) +
    `</svg>`
  );
}

// 3) 剪定の二通り（切り戻しと丸坊主）と、切る前の姿
function pruningSvg(): string {
  const panel = (px: number, title: string, inner: string) =>
    `<g transform="translate(${px} 0)">` +
    `<rect x="4" y="14" width="84" height="92" rx="8" fill="#ffffff" stroke="${GREEN}" stroke-width="1.4"/>` +
    inner +
    `<text x="46" y="120" font-size="10" font-weight="700" fill="${GREEN_DEEP}" text-anchor="middle">${title}</text>` +
    `</g>`;
  // 共通：鉢と、ふくらんだ幹
  const base =
    `<path d="M32 100 L60 100 L57 86 L35 86 Z" fill="#cdb49a" stroke="${TERRA}" stroke-width="1.2"/>` +
    `<path d="M46 86 C41 78 41 70 46 64 C51 70 51 78 46 86 Z" fill="${BARK}"/>` +
    `<path d="M46 70 L46 58" stroke="${BARK}" stroke-width="5" stroke-linecap="round"/>`;
  const leaf = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${LEAF}"/>`;
  // 長くのびた枝（切る前）
  const longBranches =
    `<path d="M46 58 C36 48 28 40 22 32" stroke="${GREEN}" stroke-width="2.2" fill="none"/>` +
    `<path d="M46 58 C56 48 64 42 70 34" stroke="${GREEN}" stroke-width="2.2" fill="none"/>` +
    `<path d="M46 58 C46 46 48 38 50 28" stroke="${GREEN}" stroke-width="2.2" fill="none"/>`;
  // 1: 伸びて形が乱れた株
  const p1 = base + longBranches + leaf(20, 30, 6) + leaf(72, 32, 6) + leaf(51, 26, 5.5) + leaf(30, 40, 4.5) + leaf(62, 42, 4.5);
  // 2: 切り戻し（枝の途中で切って短くそろえる）
  const p2 = base +
    `<path d="M46 58 C40 52 36 48 33 44" stroke="${GREEN}" stroke-width="2.2" fill="none"/>` +
    `<path d="M46 58 C52 52 56 48 59 44" stroke="${GREEN}" stroke-width="2.2" fill="none"/>` +
    `<path d="M46 58 L46 46" stroke="${GREEN}" stroke-width="2.2" fill="none"/>` +
    // 切り落とす部分（うすい破線）
    `<path d="M33 44 C28 38 24 34 22 32 M59 44 C64 38 68 36 70 34 M46 46 C47 38 49 34 50 28" stroke="#c9d6ce" stroke-width="1.8" fill="none" stroke-dasharray="3 3"/>` +
    // 切る位置
    `<line x1="24" y1="46" x2="68" y2="46" stroke="${TERRA}" stroke-width="1.3" stroke-dasharray="4 3"/>` +
    leaf(32, 42, 5) + leaf(60, 42, 5) + leaf(46, 44, 4.5) +
    `<text x="46" y="36" font-size="7" fill="${TERRA}" text-anchor="middle">ここで切る</text>`;
  // 3: 丸坊主（枝葉を落として幹だけ残す）
  const p3 = base +
    `<path d="M46 58 C36 48 28 40 22 32 M46 58 C56 48 64 42 70 34 M46 58 C46 46 48 38 50 28" stroke="#c9d6ce" stroke-width="1.8" fill="none" stroke-dasharray="3 3"/>` +
    `<line x1="26" y1="57" x2="66" y2="57" stroke="${TERRA}" stroke-width="1.3" stroke-dasharray="4 3"/>` +
    `<circle cx="42" cy="63" r="2.6" fill="${LEAF}"/><circle cx="51" cy="66" r="2.2" fill="${LEAF}"/>` +
    `<text x="46" y="48" font-size="7" fill="${TERRA}" text-anchor="middle">幹だけ残す</text>` +
    `<text x="46" y="80" font-size="6.5" fill="${GREEN_DEEP}" text-anchor="middle">新芽が吹く</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 130" width="100%" role="img" aria-label="ガジュマルの剪定の図。伸びて形が乱れた株を、枝の途中で切る切り戻しと、枝葉を落として幹だけ残す丸坊主の二通りで整える。">` +
    `<rect width="300" height="130" fill="${BG}"/>` +
    panel(0, '伸びて形が乱れる', p1) +
    panel(102, '切り戻し', p2) +
    panel(204, '丸坊主（強剪定）', p3) +
    `</svg>`
  );
}

const FIGURE_DATA: Record<string, { caption: string; inner: string }> = {
  'strangler-process': {
    caption: '絞め殺しの木としてのガジュマルの育ち方（模式図）。ほかの木の枝の上で芽生え、気根を伸ばして宿主の幹を包み、宿主が枯れたあとは中空の気根の柱として自立します。宿主を巻くのは、光の届きにくい林で早く高く育つための生き方です。',
    inner: `<div class="diagram-wrap">${stranglerSvg()}</div>`,
  },
  'propagation-methods': {
    caption: 'ガジュマルの増やし方の三手法（模式図）。水挿しは根の様子を目で追え、土挿しはそのまま育てられ、取り木は樹形を保ったまま太い枝から株を取れます。いずれも生育期の前半（五月から七月ごろ）が向きます。',
    inner: `<div class="diagram-wrap">${propagationSvg()}</div>`,
  },
  'pruning-methods': {
    caption: 'ガジュマルの剪定の二通り（模式図）。伸びて形が乱れた株は、枝の途中で切って短くそろえる切り戻しでも、枝葉をほとんど落として太い幹だけを残す丸坊主でも整えられます。芽吹く力が強いため、生育期（五月から七月ごろ）であれば、どちらのあともしばらくして新芽が吹きます。',
    inner: `<div class="diagram-wrap">${pruningSvg()}</div>`,
  },
};

export const FIGURE_KEYS = Object.keys(FIGURE_DATA);

export function figureHtml(id: string): string | null {
  const f = FIGURE_DATA[id];
  if (!f) return null;
  return `<div class="content-figure">${f.inner}<p class="figure-caption">${f.caption}</p></div>`;
}
