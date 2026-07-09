import type { 筆具 } from '../bi.js';
export interface 月輪參 {
    心z?: number;
    半徑?: number;
    環距?: number;
    淡?: number;
}
export interface 頭光參 {
    心z?: number;
    半徑?: number;
    環距?: number;
    淡?: number;
}
export declare function 月輪(bi: 筆具, 參?: 月輪參): void;
export declare function 頭光(bi: 筆具, 參?: 頭光參): void;
