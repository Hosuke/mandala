// ─────────────────────────────────────────────────────────────────────────────
// 筆具 · Bi — 白描之共用筆法（格網座標之筆）
//
// 座標：原點為月輪心，+y 向下；單位「指」（自指），1 指 = u = R·0.0145；
// 頂之縱座標微沉（-R·0.565），使坐像安於輪心。
// 骨線 W_OUT 濃而鬚線 W_IN 淡（thin 內轉）——白描雙線之制。
// 筆鋒之制（造像標準九章，2026-07-04）：一筆()以路徑採樣・法線偏移・寬度包絡
// 渲染填充輪廓——鐵線描為基，起有藏尖、收有回出；微點小環仍以等寬弧筆。
// 逐尊專筆（src/zun/）與通形（baimiao.ts）皆執此筆，格網遂一。
// ─────────────────────────────────────────────────────────────────────────────
export function 執筆(ctx, R) {
    const u = R * 0.0145;
    const yT = -R * 0.565; // 頂之縱座標（微沉，使坐像安於輪心）
    const Y = (z) => yT + z * u; // 縱錨（指→畫布）
    const W_OUT = R * 0.0285, W_IN = R * 0.0163;
    const P = (pts, close = false) => {
        ctx.beginPath();
        pts.forEach(([x, z], i) => (i ? ctx.lineTo(x * u, Y(z)) : ctx.moveTo(x * u, Y(z))));
        if (close)
            ctx.closePath();
        ctx.stroke();
    };
    const A = (x, z, r, a0 = 0, a1 = 7) => {
        ctx.beginPath();
        ctx.arc(x * u, Y(z), r * u, a0, a1);
        ctx.stroke();
    };
    const Q = (x0, z0, cx, cz, x1, z1) => {
        ctx.beginPath();
        ctx.moveTo(x0 * u, Y(z0));
        ctx.quadraticCurveTo(cx * u, Y(cz), x1 * u, Y(z1));
        ctx.stroke();
    };
    const B = (x0, z0, c1x, c1z, c2x, c2z, x1, z1) => {
        ctx.beginPath();
        ctx.moveTo(x0 * u, Y(z0));
        ctx.bezierCurveTo(c1x * u, Y(c1z), c2x * u, Y(c2z), x1 * u, Y(z1));
        ctx.stroke();
    };
    const E = (x, z, rx, rz, rot = 0) => {
        ctx.beginPath();
        ctx.ellipse(x * u, Y(z), rx * u, rz * u, rot, 0, 7);
        ctx.stroke();
    };
    const dot = (x, z, r) => { ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, 0, 7); ctx.fill(); };
    const thin = (fn) => { ctx.save(); ctx.lineWidth = W_IN; fn(); ctx.restore(); };
    const dim = (a, fn) => { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
    const 一筆 = (法, 書) => {
        // 寬必有度：非有窮正數者，正之（誦戒之意，寬勿破圖）
        const 寬 = Number.isFinite(法.寬) && 法.寬 > 0 ? 法.寬 : W_IN;
        const 諸路 = [];
        let 路 = null;
        let 游 = { x: 0, y: 0 };
        const px = (x, z) => ({ x: x * u, y: Y(z) });
        const 起 = (b) => {
            if (路)
                return false;
            游 = b;
            路 = [游];
            諸路.push(路);
            return true;
        };
        const 採 = (n, f) => {
            for (let i = 1; i <= n; i++)
                路.push(f(i / n));
        };
        const 步 = Math.max(1.0, 寬 * 0.35);
        const p = {
            M(x, z) { 游 = px(x, z); 路 = [游]; 諸路.push(路); return p; },
            L(x, z) {
                const b = px(x, z), a = 游;
                if (起(b))
                    return p;
                採(Math.min(96, Math.max(2, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 步))), t => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }));
                游 = b;
                return p;
            },
            Q(cx, cz, x, z) {
                const a = 游, c = px(cx, cz), b = px(x, z);
                if (起(b))
                    return p;
                const l = Math.hypot(c.x - a.x, c.y - a.y) + Math.hypot(b.x - c.x, b.y - c.y);
                採(Math.min(96, Math.max(4, Math.ceil(l / 步))), t => {
                    const s = 1 - t;
                    return { x: s * s * a.x + 2 * s * t * c.x + t * t * b.x,
                        y: s * s * a.y + 2 * s * t * c.y + t * t * b.y };
                });
                游 = b;
                return p;
            },
            C(c1x, c1z, c2x, c2z, x, z) {
                const a = 游, c1 = px(c1x, c1z), c2 = px(c2x, c2z), b = px(x, z);
                if (起(b))
                    return p;
                const l = Math.hypot(c1.x - a.x, c1.y - a.y) + Math.hypot(c2.x - c1.x, c2.y - c1.y)
                    + Math.hypot(b.x - c2.x, b.y - c2.y);
                採(Math.min(96, Math.max(4, Math.ceil(l / 步))), t => {
                    const s = 1 - t;
                    return {
                        x: s * s * s * a.x + 3 * s * s * t * c1.x + 3 * s * t * t * c2.x + t * t * t * b.x,
                        y: s * s * s * a.y + 3 * s * s * t * c1.y + 3 * s * t * t * c2.y + t * t * t * b.y,
                    };
                });
                游 = b;
                return p;
            },
        };
        書(p);
        const ease = (t) => t * t * (3 - 2 * t);
        for (const 原 of 諸路) {
            // 去重相疊之點
            const q = [];
            for (const pt of 原) {
                const 末 = q[q.length - 1];
                if (!末 || Math.hypot(pt.x - 末.x, pt.y - 末.y) > 0.05)
                    q.push(pt);
            }
            if (q.length < 2)
                continue;
            // 弧長
            const s = [0];
            for (let i = 1; i < q.length; i++)
                s.push(s[i - 1] + Math.hypot(q[i].x - q[i - 1].x, q[i].y - q[i - 1].y));
            const L = s[q.length - 1];
            if (L < 0.4)
                continue;
            const s起 = Math.min(0.35 * L, Math.max(4 * 寬, 6));
            const s收 = Math.min(0.45 * L, Math.max(7 * 寬, 10));
            const 寬於 = (d) => {
                let w = 寬;
                if (法.起 === '尖' && d < s起)
                    w *= 0.10 + 0.90 * ease(d / s起);
                if (法.收 === '出' && d > L - s收)
                    w *= 0.06 + 0.94 * ease((L - d) / s收);
                return w / 2;
            };
            // 法線偏移之兩緣；對折尖點（弦塌縮）承前法線，不使輪廓夾扁
            const 左 = [], 右 = [];
            let 前nx = 0, 前ny = -1;
            for (let i = 0; i < q.length; i++) {
                const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)];
                const dx = b.x - a.x, dy = b.y - a.y, n = Math.hypot(dx, dy);
                let nx, ny;
                if (n > 0.01) {
                    nx = -dy / n;
                    ny = dx / n;
                    前nx = nx;
                    前ny = ny;
                }
                else {
                    nx = 前nx;
                    ny = 前ny;
                }
                const r = 寬於(s[i]);
                左.push({ x: q[i].x + nx * r, y: q[i].y + ny * r });
                右.push({ x: q[i].x - nx * r, y: q[i].y - ny * r });
            }
            // 輪廓：右緣起，首帽（藏鋒圓頓），左緣行，尾帽（回鋒圓收），歸右緣
            const N = q.length - 1;
            const θ0 = Math.atan2(q[1].y - q[0].y, q[1].x - q[0].x);
            const θN = Math.atan2(q[N].y - q[N - 1].y, q[N].x - q[N - 1].x);
            ctx.beginPath();
            ctx.moveTo(右[0].x, 右[0].y);
            if (法.起 !== '尖')
                ctx.arc(q[0].x, q[0].y, 寬於(0), θ0 - Math.PI / 2, θ0 + Math.PI / 2, true);
            else
                ctx.lineTo(左[0].x, 左[0].y);
            for (let i = 1; i <= N; i++)
                ctx.lineTo(左[i].x, 左[i].y);
            if (法.收 !== '出')
                ctx.arc(q[N].x, q[N].y, 寬於(L), θN + Math.PI / 2, θN - Math.PI / 2, true);
            else
                ctx.lineTo(右[N].x, 右[N].y);
            for (let i = N - 1; i >= 0; i--)
                ctx.lineTo(右[i].x, 右[i].y);
            ctx.closePath();
            ctx.fill();
        }
    };
    return { ctx, R, u, Y, W_OUT, W_IN, P, A, Q, B, E, dot, thin, dim, 一筆 };
}
export function 運筆(bi) {
    const { ctx, W_OUT } = bi;
    let 軌 = [];
    let 現寬 = W_OUT * 0.34; // 初值同骨（二段之制）
    let 現起 = '藏';
    let 現收 = '回';
    const 執 = (w, 起, 收, fn) => {
        const [w0, q0, s0] = [現寬, 現起, 現收];
        ctx.save();
        ctx.lineWidth = w;
        現寬 = w;
        現起 = 起;
        現收 = 收;
        try {
            fn();
        }
        finally {
            ctx.restore();
            現寬 = w0;
            現起 = q0;
            現收 = s0;
        }
    };
    return {
        M(x, z) { 軌.push(p => p.M(x, z)); },
        L(x, z) { 軌.push(p => p.L(x, z)); },
        C(c1x, c1z, c2x, c2z, x, z) { 軌.push(p => p.C(c1x, c1z, c2x, c2z, x, z)); },
        Qk(cx, cz, x, z) { 軌.push(p => p.Q(cx, cz, x, z)); },
        S() {
            const 錄 = 軌;
            軌 = [];
            bi.一筆({ 寬: 現寬, 起: 現起, 收: 現收 }, p => { for (const f of 錄)
                f(p); });
        },
        以(w, fn) { 執(w, 現起, 現收, fn); },
        // 筆之二段（2026-07-04）：對勘漢藏諸家（五部心観・Met図樣・法海寺），
        // 線寬對身形之比皆在 1:100–200；舊制（0.60/0.36/0.24）約 1:57，線粗三倍，
        // 密處相互遮蔽、遠近盡失——三等全局減重，鋒乃見利，層次乃出。
        骨(fn) { 執(W_OUT * 0.34, '藏', '回', fn); },
        衣(fn) { 執(W_OUT * 0.21, '藏', '回', fn); },
        細(fn) { 執(W_OUT * 0.14, '尖', '出', fn); },
        逸(fn) { 執(現寬, '尖', '出', fn); },
        // 陰陽線寬（2026-07-04，文藝復興—犍陀羅之採，造像標準 9.2 追記）：
        // 光自畫面左上來——形之右下緣為陰、左上緣為陽；陰邊重而陽邊輕，
        // 體積遂自線寬出。倍率相對現階，可與三等筆複合。
        陰(fn) { 執(現寬 * 1.25, 現起, 現收, fn); },
        陽(fn) { 執(現寬 * 0.78, 現起, 現收, fn); },
    };
}
