// ─────────────────────────────────────────────────────────────────────────────
// 粉本 · Funpon — 格網驅動之如法白描（唯「已核」之尊得由此落筆）
//
// 骨架錨點悉出量度層（ryodo.js＝T1419 之數），儀軌特徵悉出儀軌層（giki.js，
// 字段帶出典）。畫者不自作主張：格網定其骨，印法定其手，形類定其衣。
// 名取「粉本」：歷代畫師刺孔扑粉、形隨本轉之底稿也（實物錨：大英博物館藏
// 敦煌五尊佛刺孔粉本 1919,0101,0.72）。此模塊即信息時代之粉本。
// 座標：原點為月輪心，+y 向下；單位「指」（自指），1 指 = u = R·0.0145。
// 縱錨自頂而下（畫像百二十指制）：頂0 肉髻底4 髮際8 白毫12 鼻端16 頦20
// 頸底24 心窩36 臍48 陰藏60 盤線64 座面68；膝寬52（盤線至白毫之距）。
// ─────────────────────────────────────────────────────────────────────────────
import { 錨點, 坐像 } from './data/ryodo.js';
import { kosareta } from './data/giki.js';
import { 上壇之, 白描, 三昧耶白描 } from '../vendor/fenben/dist/baimiao.js';

const M = 錨點(); // { 肉髻:4, 頂髮:8, 額:12(=白毫), 鼻:16, 頦:20, 頸喉:24, 心窩... }
const 白毫 = M.白毫, 髮際 = M.頂髮, 頦 = M.頦, 頸底 = M.頸喉;
const 心窩 = M.喉至心窩, 臍 = M.心窩至臍;
const 盤線 = 坐像.盤線, 座面 = 坐像.座面, 膝半 = 坐像.膝寬 / 2;

export function drawFunpon(ctx, R, face) {
  const u = R * 0.0145;
  const yT = -R * 0.565;                // 頂之縱座標（微沉，使坐像安於輪心）
  const Y = z => yT + z * u;            // 縱錨（指→畫布）
  const W_OUT = R * 0.0285, W_IN = R * 0.0163;
  ctx.save();
  ctx.lineWidth = W_OUT;
  ctx.lineCap = 'round';

  // ── 筆具（座標以指為單位）──
  const P = (pts, close = false) => {
    ctx.beginPath();
    pts.forEach(([x, z], i) => (i ? ctx.lineTo(x * u, Y(z)) : ctx.moveTo(x * u, Y(z))));
    if (close) ctx.closePath();
    ctx.stroke();
  };
  const A = (x, z, r, a0 = 0, a1 = 7) => {
    ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, a0, a1); ctx.stroke();
  };
  const Q = (x0, z0, cx, cz, x1, z1) => {
    ctx.beginPath(); ctx.moveTo(x0 * u, Y(z0));
    ctx.quadraticCurveTo(cx * u, Y(cz), x1 * u, Y(z1)); ctx.stroke();
  };
  const B = (x0, z0, c1x, c1z, c2x, c2z, x1, z1) => {
    ctx.beginPath(); ctx.moveTo(x0 * u, Y(z0));
    ctx.bezierCurveTo(c1x * u, Y(c1z), c2x * u, Y(c2z), x1 * u, Y(z1)); ctx.stroke();
  };
  const E = (x, z, rx, rz, rot = 0) => {
    ctx.beginPath(); ctx.ellipse(x * u, Y(z), rx * u, rz * u, rot, 0, 7); ctx.stroke();
  };
  const dot = (x, z, r) => { ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, 0, 7); ctx.fill(); };
  const thin = fn => { ctx.save(); ctx.lineWidth = W_IN; fn(); ctx.restore(); };
  const dim = (a, fn) => { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };

  // ── 頭光：細雙環，心在白毫上一指，容肉髻而有餘 ──
  dim(0.6, () => thin(() => { A(0, 白毫 - 1, 15); A(0, 白毫 - 1, 16.6); }));

  // ── 蓮臺：仰瓣二重，承於座面（68），闊過雙膝 ──
  const throne = () => {
    const petal = (px, tipZ, baseZ, hw) => {
      ctx.beginPath();
      ctx.moveTo((px - hw) * u, Y(baseZ));
      ctx.quadraticCurveTo((px - hw * 0.45) * u, Y(tipZ - 0.3), px * u, Y(tipZ));
      ctx.quadraticCurveTo((px + hw * 0.45) * u, Y(tipZ - 0.3), (px + hw) * u, Y(baseZ));
      ctx.stroke();
    };
    thin(() => {
      for (const dx of [-24, -12, 0, 12, 24]) petal(dx, 座面, 座面 + 5, 6.4);
      for (const dx of [-18, -6, 6, 18]) petal(dx, 座面 + 3.6, 座面 + 8.2, 6.4);
    });
    P([[-30, 座面 + 8.2], [30, 座面 + 8.2]]);
  };
  throne();

  // ── 趺坐：雙膝外緣相去恰五十二指（盤線至白毫之距，經文之校驗律）──
  const lap = () => {
    ctx.beginPath();
    ctx.moveTo(-膝半 * u, Y(盤線));
    ctx.quadraticCurveTo(0, Y(盤線 - 4.5), 膝半 * u, Y(盤線));
    ctx.quadraticCurveTo(膝半 * 0.6 * u, Y(座面 + 0.6), 0, Y(座面 + 0.6));
    ctx.quadraticCurveTo(-膝半 * 0.6 * u, Y(座面 + 0.6), -膝半 * u, Y(盤線));
    ctx.stroke();
    thin(() => Q(5.5, 盤線 - 0.6, 10, 盤線 + 1.4, 14.5, 盤線 - 0.4)); // 上仰之足
  };
  lap();

  // ── 軀幹外輪廓：頸→肩→上臂外緣→肘。肩峰半闊十二指餘（中至腋十二之上）──
  const shoulder = 12.6, elbowZ = 47;
  P([[-2.6, 頦 + 1.2], [-2.8, 頸底]]); P([[2.6, 頦 + 1.2], [2.8, 頸底]]);
  for (const d of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(d * 2.8 * u, Y(頸底));
    ctx.bezierCurveTo(d * shoulder * 0.55 * u, Y(頸底 - 0.6), d * shoulder * 0.95 * u, Y(頸底 + 1.6), d * shoulder * u, Y(頸底 + 3.6));
    ctx.quadraticCurveTo(d * (shoulder + 1.4) * u, Y((頸底 + elbowZ) / 2 + 2), d * (shoulder + 1) * u, Y(elbowZ));
    ctx.stroke();
  }
  // 腰之收：肘下內斂入膝
  thin(() => { for (const d of [-1, 1]) Q(d * (shoulder + 1), elbowZ, d * 11, 55, d * 9.5, 盤線 - 3); });

  // ── 手之筆法 ──
  const fist = (x, z, r = 2.0) => thin(() => {
    A(x, z, r);
    P([[x - r * 0.8, z + r * 0.35], [x + r * 0.8, z + r * 0.35]]);
    P([[x - r * 0.7, z - r * 0.25], [x + r * 0.7, z - r * 0.25]]);
  });
  const palmOnLap = (x, z) => thin(() => {           // 仰掌安膝
    E(x, z, 2.4, 1.1);
    for (const f of [-1.2, -0.4, 0.4, 1.2]) P([[x + f, z - 0.6], [x + f * 1.5, z - 1.8]]);
  });
  const openHand = (x, z, dir) => thin(() => {       // 展掌：dir 'up'掌立指上 · 'down'垂指向下
    const sgn = dir === 'up' ? -1 : 1;
    E(x, z, 2.0, 2.5);
    for (let i = 0; i < 4; i++) {
      const fx = x - 1.4 + i * 0.93;
      const len = 3.2 - Math.abs(i - 1.4) * 0.5;     // 中指最長，成掌之勢
      P([[fx, z + sgn * 2.1], [fx + sgn * 0.14 * (i - 1.5), z + sgn * (2.1 + len)]]);
    }
    P([[x + (x < 0 ? 2.0 : -2.0), z + 0.4], [x + (x < 0 ? 3.1 : -3.1), z + sgn * -0.9]]); // 拇指side
  });
  const robeGrip = (x, z) => {                       // 腹前握衣端（金剛界四佛左手之相）
    fist(x, z, 1.7);
    thin(() => Q(x + 0.4, z - 1.6, x + 2.2, z - 6, x + 4.4, z - 11)); // 衣端上牽
  };

  // ── 印相：尊之右手在畫面之左（-x）──
  const forearmTo = (d, wx, wz) => thin(() => Q(d * (shoulder + 1), elbowZ, (d * (shoulder + 1) + wx) / 2, (elbowZ + wz) / 2 + 1.5, wx, wz));
  const MUDRA = {
    法界定印(opt) {
      forearmTo(-1, -4.5, 57.6); forearmTo(1, 4.5, 57.6);
      thin(() => {
        E(0, 58.4, 4.6, 1.7);                        // 下掌
        E(0, 57.0, 3.5, 1.4);                        // 上掌
        A(0, 55.7, 1.0, Math.PI * 0.95, Math.PI * 2.05); // 拇指相拄
      });
    },
    彌陀定印() {
      forearmTo(-1, -4.5, 57.8); forearmTo(1, 4.5, 57.8);
      thin(() => {
        E(0, 58.6, 4.6, 1.6);
        A(-1.15, 55.9, 0.95); A(1.15, 55.9, 0.95);   // 二指與拇指相捻成雙環
        P([[-2.6, 57.6], [-1.6, 56.6]]); P([[2.6, 57.6], [1.6, 56.6]]);
      });
    },
    智拳印() {
      forearmTo(1, 3.2, 41.0);                       // 左前臂入胸前
      forearmTo(-1, -3.0, 33.6);                     // 右前臂上抱
      fist(0, 40.2, 2.4);                            // 左拳當胸
      thin(() => { P([[-0.5, 37.6], [-0.5, 34.2]]); P([[0.5, 37.6], [0.5, 34.2]]); }); // 頭指直立（雙鉤）
      fist(0, 32.0, 2.1);                            // 右拳握其頭指
      thin(() => { P([[2.6, 41.4], [3.8, 42.2]]); P([[-2.8, 33.0], [-4.0, 33.8]]); }); // 腕線
    },
    觸地印(opt) {
      forearmTo(-1, -16.8, 59.6);
      thin(() => E(-17.2, 61.2, 1.5, 2.0, -0.25));   // 覆掌垂於膝前
      thin(() => {
        for (let i = 0; i < 4; i++) {
          const fx = -18.4 + i * 0.85;
          P([[fx, 62.8], [fx - 0.2, 65.2]]);         // 指尖觸地（及於座面）
        }
      });
      MUDRA._left(opt);
    },
    與願印(opt) {
      forearmTo(-1, -16.4, 58.8);
      openHand(-16.8, 60.8, 'down');                 // 掌向外垂示與
      MUDRA._left(opt);
    },
    施無畏印(opt) {
      forearmTo(-1, -10.2, 34.4);
      openHand(-9.8, 30.6, 'up');                    // 舉掌當胸示無畏
      MUDRA._left(opt);
    },
    _left(opt) {                                     // 閒手三式
      if (opt === 'robe') { forearmTo(1, 3.4, 50.4); robeGrip(3.0, 50.6); }
      else if (opt === 'fist') { forearmTo(1, 2.6, 49.8); fist(2.4, 49.8, 1.8); }
      else { forearmTo(1, 4.8, 57.6); palmOnLap(4.6, 57.8); }
    },
  };
  const leftOpt = (face.印法 || '').includes('握衣端') ? 'robe'
    : /拳.*臍/.test(face.印法 || '') ? 'fist' : 'lap';

  // ── 衣與莊嚴（形類之制）──
  const 菩薩 = face.形 === '菩薩形';
  if (!菩薩) {
    thin(() => {                                     // 通肩衲衣：開胸之領與垂褶
      Q(-9.6, 頸底 + 2.4, -3.6, 頸底 + 5.4, -0.8, 心窩 - 4.4);
      Q(9.6, 頸底 + 2.4, 3.6, 頸底 + 5.4, 0.8, 心窩 - 4.4);
      Q(11.6, 頸底 + 4.4, 4, 心窩 + 1, -2.2, 心窩 + 5.6); // 偏袒之褶
    });
    thin(() => {                                     // 膝上裾褶三重
      for (const [w, z] of [[22, 盤線 + 0.8], [16, 盤線 - 1.2], [10, 盤線 - 3]]) Q(-w, z, 0, z + 3, w, z);
    });
  } else {
    thin(() => {                                     // 條帛斜披（避胸前結印之地，行於側）與瓔珞
      Q(-10.4, 頸底 + 5.4, -7, 心窩 + 6, 7.8, 臍 + 2.4);
      Q(-10.4, 頸底 + 6.6, -6.4, 心窩 + 7.4, 7.4, 臍 + 3.6);
      A(0, 頸底 + 3.0, 4.2, Math.PI * 0.14, Math.PI * 0.86);   // 頸瓔貼頸
      dot(-3.4, 頸底 + 6.4, 0.6); dot(0, 頸底 + 7.6, 0.6); dot(3.4, 頸底 + 6.4, 0.6);
      P([[-(shoulder + 1.6), 40], [-(shoulder - 1.2), 39.2]]); // 臂釧
      P([[shoulder + 1.6, 40], [shoulder - 1.2, 39.2]]);
    });
    dim(0.8, () => thin(() => {                      // 天衣自肩而降
      B(-shoulder + 1, 頸底 + 4, -shoulder - 8, 心窩 + 2, -shoulder - 1, 臍 + 2, -shoulder - 6.5, 盤線 - 2);
      B(shoulder - 1, 頸底 + 4, shoulder + 8, 心窩 + 2, shoulder + 1, 臍 + 2, shoulder + 6.5, 盤線 - 2);
    }));
  }

  // ── 結印 ──
  (MUDRA[face.印] || MUDRA.法界定印)(leftOpt);

  // ── 頭部：面輪十二指（髮際8→頦20），三庭均分 ──
  const cheek = 5.2;
  ctx.beginPath();                                    // 顱面外輪廓
  ctx.moveTo(-cheek * u, Y(白毫 + 0.6));
  ctx.bezierCurveTo(-cheek * u, Y(髮際 - 2.6), cheek * u, Y(髮際 - 2.6), cheek * u, Y(白毫 + 0.6));
  ctx.bezierCurveTo(cheek * 0.94 * u, Y(鼻端()), cheek * 0.52 * u, Y(頦 - 0.4), 0, Y(頦 + 0.2));
  ctx.bezierCurveTo(-cheek * 0.52 * u, Y(頦 - 0.4), -cheek * 0.94 * u, Y(鼻端()), -cheek * u, Y(白毫 + 0.6));
  ctx.stroke();
  function 鼻端() { return M.鼻; }

  if (!菩薩) {
    A(0, M.肉髻, 3.2, Math.PI * 1.02, Math.PI * 1.98);          // 肉髻（高四指，積粟覆甌）
    thin(() => {                                                 // 螺髮沿髮際
      for (const hx of [-3.4, 0, 3.4]) A(hx, 髮際 - 0.8, 1.35, Math.PI, 0);
      A(-1.7, M.肉髻 - 0.6, 1.2, Math.PI, 0); A(1.7, M.肉髻 - 0.6, 1.2, Math.PI, 0);
    });
    thin(() => {                                                 // 長耳垂輪
      for (const d of [-1, 1]) {
        Q(d * cheek * 0.98, 白毫 - 0.6, d * (cheek + 1.4), M.鼻, d * (cheek - 0.4), 頦 + 1.2);
        A(d * (cheek - 0.5), 頦 + 1.0, 0.9);
      }
    });
    thin(() => {                                                 // 三道
      A(0, 頸底 + 3.2, 3.2, Math.PI * 1.28, Math.PI * 1.72);
      A(0, 頸底 + 4.6, 3.6, Math.PI * 1.3, Math.PI * 1.7);
    });
  } else {
    thin(() => {                                                 // 髻與五智寶冠
      E(0, M.肉髻 - 1.2, 1.9, 2.3);                              // 頂髻（菩薩不作肉髻）
      Q(-6.2, 髮際 - 0.6, 0, 髮際 - 2.2, 6.2, 髮際 - 0.6);        // 冠帶
      P([[-5.8, 髮際 - 1.0], [-4.4, 髮際 - 4.4], [-2.9, 髮際 - 1.6]]);
      P([[-2.3, 髮際 - 1.8], [0, 髮際 - 5.8], [2.3, 髮際 - 1.8]]); // 中峰最高：五峰表五智
      P([[2.9, 髮際 - 1.6], [4.4, 髮際 - 4.4], [5.8, 髮際 - 1.0]]);
      dot(0, 髮際 - 3.4, 0.55); dot(-4.3, 髮際 - 2.6, 0.45); dot(4.3, 髮際 - 2.6, 0.45);
      for (const d of [-1, 1]) {                                  // 垂髮離頰一分，拂肩而歇
        Q(d * (cheek + 0.5), 白毫 - 0.6, d * (cheek + 2.0), M.鼻 + 1.5, d * (cheek + 1.5), 頦 + 2.4);
        Q(d * (cheek + 1.5), 頦 + 2.4, d * (cheek + 2.4), 頸底 + 2.6, d * (cheek + 4.0), 頸底 + 4.8);
      }
      A(-cheek - 0.9, M.鼻 + 3.0, 0.8); A(cheek + 0.9, M.鼻 + 3.0, 0.8); // 耳璫垂於頷際外
    });
  }

  // ── 面相：白毫居頂下十二指；眼在白毫下二指，大眼角一指小眼角四指，形似長弓 ──
  // 長弓者上瞼之弧也：弓背向上而兩端垂，垂目入定之相；弝（眼寬）僅一足，故不畫下瞼。
  thin(() => {
    for (const d of [-1, 1]) {
      ctx.beginPath();                                           // 眉如初月：高懸而舒
      ctx.moveTo(d * 1.1 * u, Y(白毫 - 0.4));
      ctx.quadraticCurveTo(d * 2.7 * u, Y(白毫 - 1.4), d * 4.4 * u, Y(白毫 - 0.2));
      ctx.stroke();
      ctx.beginPath();                                           // 上瞼長弓：自大眼角(1)至小眼角(4)，弓背向上
      ctx.moveTo(d * 1.0 * u, Y(白毫 + 2.4));
      ctx.quadraticCurveTo(d * 2.4 * u, Y(白毫 + 1.5), d * 4.0 * u, Y(白毫 + 2.5));
      ctx.stroke();
    }
    P([[0, 白毫 + 1.6], [0, M.鼻 - 0.6]]);                        // 鼻樑至鼻端
    A(0, M.鼻 + 0.1, 0.8, Math.PI * 0.2, Math.PI * 0.8);          // 鼻底
    A(0, M.鼻 + 2.0, 1.4, Math.PI * 0.3, Math.PI * 0.7);          // 靜口（頦上）
  });
  dot(0, 白毫, 0.5);                                              // 白毫右旋，點以誌之

  ctx.restore();
}

// ── 薄適配（fenben docs/回填契約.md §五）────────────────────────────────────
// 先問粉本庫之閘（vendor/fenben，機出勿手改）：「已核＋有專筆＋非候審」三戒
// 同持乃上壇；null 則退壇城自藏之粉本（五佛十面），再無則還 false，
// 渲染層守佔位略相（寧缺毋誤）。
export function 落筆(ctx, R, id, side) {
  const 上 = 上壇之(id, side);
  if (上) { 白描(ctx, R, 上.面, 上.鍵); return true; }
  const fp = kosareta(id, side);
  if (fp) { drawFunpon(ctx, R, fp); return true; }
  return false;
}

// 三昧耶會之器（金剛界三十七尊）：有其器依粉本落筆，無則還 false 守現行示意
export { 三昧耶白描 as 器筆 };

// 是否有粉本可施：渲染層以此問訊
export { drawFunpon as default };
