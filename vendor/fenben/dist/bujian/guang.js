import { 運筆 } from '../bi.js';
// 月輪：白月輪滿含全躯，細雙環
export function 月輪(bi, 參 = {}) {
    const { 心z = 39, 半徑 = 41.2, 環距 = 1.2, 淡 = 0.4 } = 參;
    const { 細 } = 運筆(bi);
    bi.dim(淡, () => 細(() => { bi.A(0, 心z, 半徑); bi.A(0, 心z, 半徑 + 環距); }));
}
// 頭光：細雙環居首，含冠而有餘
export function 頭光(bi, 參 = {}) {
    const { 心z = 11, 半徑 = 14.6, 環距 = 1.2, 淡 = 0.5 } = 參;
    const { 細 } = 運筆(bi);
    bi.dim(淡, () => 細(() => { bi.A(0, 心z, 半徑); bi.A(0, 心z, 半徑 + 環距); }));
}
