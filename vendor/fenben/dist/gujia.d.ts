import type { 筆具, 運筆具 } from './bi.js';
export interface 節 {
    x: number;
    z: number;
    d: number;
}
export declare const 節之: (x: number, z: number, d?: number) => 節;
export interface 肢 {
    a: 節;
    b: 節;
    ra: number;
    rb: number;
    弓?: number;
    肉?: number;
}
export declare function 沿(l: 肢, t: number): {
    x: number;
    z: number;
    r: number;
    ux: number;
    uz: number;
};
export declare function 肢面(l: 肢, t: number, s: number): [number, number];
export declare function 輪廓(bi: 筆具, 筆: 運筆具, l: 肢, t0?: number, t1?: number, 側?: -1 | 1 | 0): void;
export declare function 環褶(bi: 筆具, 筆: 運筆具, l: 肢, t: number, 幅?: number, 垂?: number): void;
export declare function 序(...諸: Array<{
    d: number;
    畫: () => void;
}>): void;
