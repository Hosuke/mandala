// ─────────────────────────────────────────────────────────────────────────────
// 白描 · Baimiao — 格網驅動之如法筆法（粉本庫第三層；唯「已核」之尊得由此落筆）
//
// 骨架錨點悉出量度層（liangdu.js＝T1419 之數），儀軌特徵悉出儀軌層（yigui.js，
// 字段帶出典）。畫者不自作主張：格網定其骨，印法定其手，形類定其衣。
// 2026-07-03 自 mandala（js/funpon.js）析出入本庫；mandala 內之孿生曰 funpon，
// 同字兩讀——漢音 fenben，和音 funpon，金胎漢和兩土之音也。
// 名取「粉本」：歷代畫師刺孔扑粉、形隨本轉之底稿也（實物錨：大英博物館藏
// 敦煌五尊佛刺孔粉本 1919,0101,0.72）。此模塊即信息時代之粉本。
// 座標：原點為月輪心，+y 向下；單位「指」（自指），1 指 = u = R·0.0145。
// 縱錨自頂而下（畫像百二十指制）：頂0 肉髻底4 髮際8 白毫12 鼻端16 頦20
// 頸底24 心窩36 臍48 陰藏60 盤線64 座面68；膝寬52（盤線至白毫之距）。
// ─────────────────────────────────────────────────────────────────────────────
import { 錨點, 坐像 } from './liangdu.js';
import { 執筆 } from './bi.js';
import { 落筆簿, 候審筆 } from './zun/index.js';
import { 依號 } from './yigui.js';
import { 三昧耶目 } from './bujian/sanmaya.js';
const M = 錨點(); // { 肉髻:4, 頂髮:8, 額:12(=白毫), 鼻:16, 頦:20, 頸喉:24, 心窩... }
const 白毫 = M.白毫, 髮際 = M.頂髮, 頦 = M.頦, 頸底 = M.頸喉;
const 心窩 = M.喉至心窩, 臍 = M.心窩至臍;
const 盤線 = 坐像.盤線, 座面 = 坐像.座面, 膝半 = 坐像.膝寬 / 2;
// 白描總門：鍵（'尊號|側'，如 'fugen|k'）有專筆則用專筆，無則退通形
export function 白描(ctx, R, face, 鍵) {
    const bi = 執筆(ctx, R);
    ctx.save();
    ctx.lineWidth = bi.W_OUT;
    ctx.lineCap = 'round';
    const 專 = 鍵 ? 落筆簿[鍵] : undefined;
    if (專)
        專(bi, face);
    else
        通形(bi, face);
    ctx.restore();
}
// 通形：形類（如來形／菩薩形）之基準白描——專筆未立時之所依，亦可為專筆之底
export function 通形(bi, face) {
    const { ctx, u, Y, P, A, Q, B, E, dot, thin, dim } = bi;
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
            for (const dx of [-24, -12, 0, 12, 24])
                petal(dx, 座面, 座面 + 5, 6.4);
            for (const dx of [-18, -6, 6, 18])
                petal(dx, 座面 + 3.6, 座面 + 8.2, 6.4);
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
    P([[-2.6, 頦 + 1.2], [-2.8, 頸底]]);
    P([[2.6, 頦 + 1.2], [2.8, 頸底]]);
    for (const d of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(d * 2.8 * u, Y(頸底));
        ctx.bezierCurveTo(d * shoulder * 0.55 * u, Y(頸底 - 0.6), d * shoulder * 0.95 * u, Y(頸底 + 1.6), d * shoulder * u, Y(頸底 + 3.6));
        ctx.quadraticCurveTo(d * (shoulder + 1.4) * u, Y((頸底 + elbowZ) / 2 + 2), d * (shoulder + 1) * u, Y(elbowZ));
        ctx.stroke();
    }
    // 腰之收：肘下內斂入膝
    thin(() => { for (const d of [-1, 1])
        Q(d * (shoulder + 1), elbowZ, d * 11, 55, d * 9.5, 盤線 - 3); });
    // ── 手之筆法 ──
    const fist = (x, z, r = 2.0) => thin(() => {
        A(x, z, r);
        P([[x - r * 0.8, z + r * 0.35], [x + r * 0.8, z + r * 0.35]]);
        P([[x - r * 0.7, z - r * 0.25], [x + r * 0.7, z - r * 0.25]]);
    });
    const palmOnLap = (x, z) => thin(() => {
        E(x, z, 2.4, 1.1);
        for (const f of [-1.2, -0.4, 0.4, 1.2])
            P([[x + f, z - 0.6], [x + f * 1.5, z - 1.8]]);
    });
    const openHand = (x, z, dir) => thin(() => {
        const sgn = dir === 'up' ? -1 : 1;
        E(x, z, 2.0, 2.5);
        for (let i = 0; i < 4; i++) {
            const fx = x - 1.4 + i * 0.93;
            const len = 3.2 - Math.abs(i - 1.4) * 0.5; // 中指最長，成掌之勢
            P([[fx, z + sgn * 2.1], [fx + sgn * 0.14 * (i - 1.5), z + sgn * (2.1 + len)]]);
        }
        P([[x + (x < 0 ? 2.0 : -2.0), z + 0.4], [x + (x < 0 ? 3.1 : -3.1), z + sgn * -0.9]]); // 拇指side
    });
    const robeGrip = (x, z) => {
        fist(x, z, 1.7);
        thin(() => Q(x + 0.4, z - 1.6, x + 2.2, z - 6, x + 4.4, z - 11)); // 衣端上牽
    };
    // ── 印相：尊之右手在畫面之左（-x）──
    const forearmTo = (d, wx, wz) => thin(() => Q(d * (shoulder + 1), elbowZ, (d * (shoulder + 1) + wx) / 2, (elbowZ + wz) / 2 + 1.5, wx, wz));
    const MUDRA = {
        法界定印(opt) {
            forearmTo(-1, -4.5, 57.6);
            forearmTo(1, 4.5, 57.6);
            thin(() => {
                E(0, 58.4, 4.6, 1.7); // 下掌
                E(0, 57.0, 3.5, 1.4); // 上掌
                A(0, 55.7, 1.0, Math.PI * 0.95, Math.PI * 2.05); // 拇指相拄
            });
        },
        彌陀定印() {
            forearmTo(-1, -4.5, 57.8);
            forearmTo(1, 4.5, 57.8);
            thin(() => {
                E(0, 58.6, 4.6, 1.6);
                A(-1.15, 55.9, 0.95);
                A(1.15, 55.9, 0.95); // 二指與拇指相捻成雙環
                P([[-2.6, 57.6], [-1.6, 56.6]]);
                P([[2.6, 57.6], [1.6, 56.6]]);
            });
        },
        智拳印() {
            forearmTo(1, 3.2, 41.0); // 左前臂入胸前
            forearmTo(-1, -3.0, 33.6); // 右前臂上抱
            fist(0, 40.2, 2.4); // 左拳當胸
            thin(() => { P([[-0.5, 37.6], [-0.5, 34.2]]); P([[0.5, 37.6], [0.5, 34.2]]); }); // 頭指直立（雙鉤）
            fist(0, 32.0, 2.1); // 右拳握其頭指
            thin(() => { P([[2.6, 41.4], [3.8, 42.2]]); P([[-2.8, 33.0], [-4.0, 33.8]]); }); // 腕線
        },
        觸地印(opt) {
            forearmTo(-1, -16.8, 59.6);
            thin(() => E(-17.2, 61.2, 1.5, 2.0, -0.25)); // 覆掌垂於膝前
            thin(() => {
                for (let i = 0; i < 4; i++) {
                    const fx = -18.4 + i * 0.85;
                    P([[fx, 62.8], [fx - 0.2, 65.2]]); // 指尖觸地（及於座面）
                }
            });
            MUDRA._left(opt);
        },
        與願印(opt) {
            forearmTo(-1, -16.4, 58.8);
            openHand(-16.8, 60.8, 'down'); // 掌向外垂示與
            MUDRA._left(opt);
        },
        施無畏印(opt) {
            forearmTo(-1, -10.2, 34.4);
            openHand(-9.8, 30.6, 'up'); // 舉掌當胸示無畏
            MUDRA._left(opt);
        },
        _left(opt) {
            if (opt === 'robe') {
                forearmTo(1, 3.4, 50.4);
                robeGrip(3.0, 50.6);
            }
            else if (opt === 'fist') {
                forearmTo(1, 2.6, 49.8);
                fist(2.4, 49.8, 1.8);
            }
            else {
                forearmTo(1, 4.8, 57.6);
                palmOnLap(4.6, 57.8);
            }
        },
    };
    const leftOpt = (face.印法 || '').includes('握衣端') ? 'robe'
        : /拳.*臍/.test(face.印法 || '') ? 'fist' : 'lap';
    // ── 衣與莊嚴（形類之制）──
    const 菩薩 = face.形 === '菩薩形';
    if (!菩薩) {
        thin(() => {
            Q(-9.6, 頸底 + 2.4, -3.6, 頸底 + 5.4, -0.8, 心窩 - 4.4);
            Q(9.6, 頸底 + 2.4, 3.6, 頸底 + 5.4, 0.8, 心窩 - 4.4);
            Q(11.6, 頸底 + 4.4, 4, 心窩 + 1, -2.2, 心窩 + 5.6); // 偏袒之褶
        });
        thin(() => {
            for (const [w, z] of [[22, 盤線 + 0.8], [16, 盤線 - 1.2], [10, 盤線 - 3]])
                Q(-w, z, 0, z + 3, w, z);
        });
    }
    else {
        thin(() => {
            Q(-10.4, 頸底 + 5.4, -7, 心窩 + 6, 7.8, 臍 + 2.4);
            Q(-10.4, 頸底 + 6.6, -6.4, 心窩 + 7.4, 7.4, 臍 + 3.6);
            A(0, 頸底 + 3.0, 4.2, Math.PI * 0.14, Math.PI * 0.86); // 頸瓔貼頸
            dot(-3.4, 頸底 + 6.4, 0.6);
            dot(0, 頸底 + 7.6, 0.6);
            dot(3.4, 頸底 + 6.4, 0.6);
            P([[-(shoulder + 1.6), 40], [-(shoulder - 1.2), 39.2]]); // 臂釧
            P([[shoulder + 1.6, 40], [shoulder - 1.2, 39.2]]);
        });
        dim(0.8, () => thin(() => {
            B(-shoulder + 1, 頸底 + 4, -shoulder - 8, 心窩 + 2, -shoulder - 1, 臍 + 2, -shoulder - 6.5, 盤線 - 2);
            B(shoulder - 1, 頸底 + 4, shoulder + 8, 心窩 + 2, shoulder + 1, 臍 + 2, shoulder + 6.5, 盤線 - 2);
        }));
    }
    // ── 結印 ──
    (MUDRA[face.印] || MUDRA.法界定印)(leftOpt);
    // ── 頭部：面輪十二指（髮際8→頦20），三庭均分 ──
    const cheek = 5.2;
    ctx.beginPath(); // 顱面外輪廓
    ctx.moveTo(-cheek * u, Y(白毫 + 0.6));
    ctx.bezierCurveTo(-cheek * u, Y(髮際 - 2.6), cheek * u, Y(髮際 - 2.6), cheek * u, Y(白毫 + 0.6));
    ctx.bezierCurveTo(cheek * 0.94 * u, Y(鼻端()), cheek * 0.52 * u, Y(頦 - 0.4), 0, Y(頦 + 0.2));
    ctx.bezierCurveTo(-cheek * 0.52 * u, Y(頦 - 0.4), -cheek * 0.94 * u, Y(鼻端()), -cheek * u, Y(白毫 + 0.6));
    ctx.stroke();
    function 鼻端() { return M.鼻; }
    if (!菩薩) {
        A(0, M.肉髻, 3.2, Math.PI * 1.02, Math.PI * 1.98); // 肉髻（高四指，積粟覆甌）
        thin(() => {
            for (const hx of [-3.4, 0, 3.4])
                A(hx, 髮際 - 0.8, 1.35, Math.PI, 0);
            A(-1.7, M.肉髻 - 0.6, 1.2, Math.PI, 0);
            A(1.7, M.肉髻 - 0.6, 1.2, Math.PI, 0);
        });
        thin(() => {
            for (const d of [-1, 1]) {
                Q(d * cheek * 0.98, 白毫 - 0.6, d * (cheek + 1.4), M.鼻, d * (cheek - 0.4), 頦 + 1.2);
                A(d * (cheek - 0.5), 頦 + 1.0, 0.9);
            }
        });
        thin(() => {
            A(0, 頸底 + 3.2, 3.2, Math.PI * 1.28, Math.PI * 1.72);
            A(0, 頸底 + 4.6, 3.6, Math.PI * 1.3, Math.PI * 1.7);
        });
    }
    else {
        thin(() => {
            E(0, M.肉髻 - 1.2, 1.9, 2.3); // 頂髻（菩薩不作肉髻）
            Q(-6.2, 髮際 - 0.6, 0, 髮際 - 2.2, 6.2, 髮際 - 0.6); // 冠帶
            P([[-5.8, 髮際 - 1.0], [-4.4, 髮際 - 4.4], [-2.9, 髮際 - 1.6]]);
            P([[-2.3, 髮際 - 1.8], [0, 髮際 - 5.8], [2.3, 髮際 - 1.8]]); // 中峰最高：五峰表五智
            P([[2.9, 髮際 - 1.6], [4.4, 髮際 - 4.4], [5.8, 髮際 - 1.0]]);
            dot(0, 髮際 - 3.4, 0.55);
            dot(-4.3, 髮際 - 2.6, 0.45);
            dot(4.3, 髮際 - 2.6, 0.45);
            for (const d of [-1, 1]) { // 垂髮離頰一分，拂肩而歇
                Q(d * (cheek + 0.5), 白毫 - 0.6, d * (cheek + 2.0), M.鼻 + 1.5, d * (cheek + 1.5), 頦 + 2.4);
                Q(d * (cheek + 1.5), 頦 + 2.4, d * (cheek + 2.4), 頸底 + 2.6, d * (cheek + 4.0), 頸底 + 4.8);
            }
            A(-cheek - 0.9, M.鼻 + 3.0, 0.8);
            A(cheek + 0.9, M.鼻 + 3.0, 0.8); // 耳璫垂於頷際外
        });
    }
    // ── 面相：白毫居頂下十二指；眼在白毫下二指，大眼角一指小眼角四指，形似長弓 ──
    // 長弓者上瞼之弧也：弓背向上而兩端垂，垂目入定之相；弝（眼寬）僅一足，故不畫下瞼。
    thin(() => {
        for (const d of [-1, 1]) {
            ctx.beginPath(); // 眉如初月：高懸而舒
            ctx.moveTo(d * 1.1 * u, Y(白毫 - 0.4));
            ctx.quadraticCurveTo(d * 2.7 * u, Y(白毫 - 1.4), d * 4.4 * u, Y(白毫 - 0.2));
            ctx.stroke();
            ctx.beginPath(); // 上瞼長弓：自大眼角(1)至小眼角(4)，弓背向上
            ctx.moveTo(d * 1.0 * u, Y(白毫 + 2.4));
            ctx.quadraticCurveTo(d * 2.4 * u, Y(白毫 + 1.5), d * 4.0 * u, Y(白毫 + 2.5));
            ctx.stroke();
        }
        P([[0, 白毫 + 1.6], [0, M.鼻 - 0.6]]); // 鼻樑至鼻端
        A(0, M.鼻 + 0.1, 0.8, Math.PI * 0.2, Math.PI * 0.8); // 鼻底
        A(0, M.鼻 + 2.0, 1.4, Math.PI * 0.3, Math.PI * 0.7); // 靜口（頦上）
    });
    dot(0, 白毫, 0.5); // 白毫右旋，點以誌之
}
// ── 上壇之判：mandala 回填之唯一閘（docs/回填契約.md）──────────────────────
// 三戒同持乃得上壇：儀軌信已核・落筆簿有專筆（通形示意不上壇）・筆非候審
// （新筆必經主人過目）。不滿則 null——壇城遇 null 守其現行佔位，寧缺毋誤。
// 還 { 面, 鍵 } 而非獨面：白描必得鍵乃走專筆（獨傳面則退通形——契約之陷，Codex 審所指）。
export function 上壇之(id, side) {
    const g = 依號[id];
    const f = g && g[side];
    if (!f || f.信 !== '已核')
        return null;
    const 鍵 = `${id}|${side}`;
    const 有筆 = Object.prototype.hasOwnProperty.call(落筆簿, 鍵) && typeof 落筆簿[鍵] === 'function';
    return 有筆 && !候審筆.has(鍵) ? { 面: f, 鍵 } : null;
}
// ── 三昧耶白描：三昧耶會之器（金剛界三十七尊）——回填契約面（2026-07-09 增）──
// 鍵＝尊號（無側之分——三十七尊之器唯金剛界之制，胎藏諸尊之器未備勿混）。
// 置器於月輪心（z=37 器帶蓮座心微上，同譜頁之制），依各條展比而縮——
// 內情（座標・比）悉封於此，壇城不知譜頁之制。無其器還 false，壇守現行示意。
const 器簿 = Object.fromEntries(三昧耶目.map(條 => [條.鍵, 條]));
export function 三昧耶白描(ctx, R, id) {
    const 條 = 器簿[id];
    if (!條)
        return false;
    const bi = 執筆(ctx, R);
    ctx.save();
    ctx.lineWidth = bi.W_OUT;
    ctx.lineCap = 'round';
    條.筆(bi, 0, 37, 條.展比);
    ctx.restore();
    return true;
}
// 舊名之通（mandala 相容）
export { 白描 as drawFunpon, 白描 as default };
