// ─────────────────────────────────────────────────────────────────────────────
// 結緣之證：投花所得之尊，作一紙可攜之券。720×1080，紺紙金泥之製。
// ─────────────────────────────────────────────────────────────────────────────

// 墨界居中：量 actualBoundingBox，解落筆點，使墨之心正坐 (x,y)。
// textAlign='center' 之於闊度可，然懸頭線之悉曇縱向參差，em-box 之中非墨之中，故另算之。
function placeInk(ctx, s, x, y) {
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const m = ctx.measureText(s);
  const inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  const penX = x - inkW / 2 + m.actualBoundingBoxLeft;
  const penY = y - inkH / 2 + m.actualBoundingBoxAscent;
  if (Number.isFinite(penX) && Number.isFinite(penY)) {
    ctx.fillText(s, penX, penY);
  } else {
    // 退化保底：em-box 居中，字不至於不畫
    ctx.textBaseline = 'middle';
    ctx.fillText(s, x, y);
  }
  ctx.textAlign = 'center';
}

// foot1/foot2：跋記二行（呼者按語供之）；題簽「金胎不二」為器物之銘，不譯
export function bondCard({ sid, roman, zh, sk, familyZh, colorHex, mantra, mantraSid, desc,
  foot1 = '投花得佛', foot2 = '結 緣 之 證' }) {
  const W = 720, H = 1080;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  // 紺地
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0c1120');
  g.addColorStop(0.5, '#0a0e1a');
  g.addColorStop(1, '#060912');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // 金砂子
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    ctx.fillStyle = `rgba(233,205,138,${Math.random() * 0.28})`;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5 + 0.3, 0, 7);
    ctx.fill();
  }

  // 裱框（雙線）
  ctx.strokeStyle = 'rgba(216,179,106,0.85)';
  ctx.lineWidth = 2;
  ctx.strokeRect(26, 26, W - 52, H - 52);
  ctx.strokeStyle = 'rgba(216,179,106,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  ctx.textAlign = 'center';

  // 題
  ctx.fillStyle = '#a8854a';
  ctx.font = '500 26px "LXGW WenKai TC", serif';
  ctx.fillText('金 胎 不 二', W / 2, 108);
  ctx.font = '600 13px "Cormorant Garamond", serif';
  ctx.fillStyle = 'rgba(168,133,74,0.8)';
  ctx.fillText('R Y Ō B U   M A Ṇ Ḍ A L A', W / 2, 136);

  // 月輪
  const cy = 400, R = 195;
  g = ctx.createRadialGradient(W / 2, cy, R * 0.1, W / 2, cy, R);
  g.addColorStop(0, '#1d2438');
  g.addColorStop(0.8, '#131a2c');
  g.addColorStop(1, '#0d1322');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(W / 2, cy, R, 0, 7); ctx.fill();
  ctx.strokeStyle = '#d8b36a';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(W / 2, cy, R, 0, 7); ctx.stroke();
  ctx.strokeStyle = colorHex;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(W / 2, cy, R * 0.9, 0, 7); ctx.stroke();
  ctx.globalAlpha = 1;

  // 種字：以墨界實心居中（actualBoundingBox），不憑 em-box，
  // 故去舊「cy - 22」之人手微調——悉曇懸於頭線，墨之心非 em 之心。
  ctx.fillStyle = colorHex;
  ctx.shadowColor = colorHex;
  ctx.shadowBlur = 30;
  if (sid) {
    let fs = 190;
    ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    let m = ctx.measureText(sid);
    let inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    if (inkW > R * 1.35) { fs *= (R * 1.35) / inkW; ctx.font = `400 ${fs}px "Noto Sans Siddham"`; }
    placeInk(ctx, sid, W / 2, cy);
  } else {
    ctx.font = '600 150px "Cormorant Garamond", serif';
    placeInk(ctx, roman, W / 2, cy);
  }
  ctx.shadowBlur = 8;
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.8;
  ctx.font = 'italic 600 34px "Cormorant Garamond", serif';
  ctx.fillText(roman, W / 2, cy + R * 0.62);
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.textBaseline = 'alphabetic';

  // 尊名
  ctx.fillStyle = '#e9e2cf';
  ctx.font = '500 52px "LXGW WenKai TC", serif';
  ctx.fillText(zh, W / 2, 712);
  ctx.fillStyle = '#a8854a';
  ctx.font = 'italic 600 24px "Cormorant Garamond", serif';
  ctx.fillText(sk || '', W / 2, 752);

  // 部族
  ctx.strokeStyle = colorHex;
  ctx.fillStyle = colorHex;
  ctx.lineWidth = 1.2;
  ctx.font = '500 20px "LXGW WenKai TC", serif';
  const fw = ctx.measureText(familyZh).width + 44;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(W / 2 - fw / 2, 778, fw, 38, 19);
  else ctx.rect(W / 2 - fw / 2, 778, fw, 38); // 舊器無圓角，方亦可
  ctx.stroke();
  ctx.fillText(familyZh, W / 2, 805);

  // 行狀（英文行長，按幅縮字）
  if (desc) {
    ctx.fillStyle = 'rgba(233,226,207,0.66)';
    let fs = 21;
    ctx.font = `400 ${fs}px "LXGW WenKai TC", serif`;
    const w = ctx.measureText(desc).width;
    if (w > W - 110) {
      fs = Math.max(13.5, fs * (W - 110) / w);
      ctx.font = `400 ${fs}px "LXGW WenKai TC", serif`;
    }
    ctx.fillText(desc, W / 2, 858);
  }
  if (mantraSid) {
    // 真言以悉曇書之
    ctx.fillStyle = colorHex;
    ctx.shadowColor = colorHex;
    ctx.shadowBlur = 12;
    let fs = 27;
    ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    const w = ctx.measureText(mantraSid).width;
    if (w > W - 140) { fs *= (W - 140) / w; ctx.font = `400 ${fs}px "Noto Sans Siddham"`; }
    ctx.fillText(mantraSid, W / 2, 906);
    ctx.shadowBlur = 0;
  }
  if (mantra) {
    ctx.fillStyle = 'rgba(168,133,74,0.92)';
    ctx.font = 'italic 500 19px "Cormorant Garamond", serif';
    ctx.fillText(mantra, W / 2, mantraSid ? 938 : 906);
  }

  // 跋
  ctx.fillStyle = 'rgba(168,133,74,0.7)';
  ctx.font = '400 18px "LXGW WenKai TC", serif';
  ctx.fillText(foot1, W / 2, 986);
  ctx.font = '400 15px "LXGW WenKai TC", serif';
  ctx.fillStyle = 'rgba(168,133,74,0.5)';
  ctx.fillText(foot2, W / 2, 1014);

  return c.toDataURL('image/png');
}
