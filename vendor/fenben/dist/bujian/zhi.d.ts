import type { 筆具, 運筆具 } from '../bi.js';
export type 點 = [number, number];
export declare function 指鏈(x0: number, z0: number, θ0: number, 節長: number[], 節角?: number[]): 點[];
export declare function 佈(列: 點[], x: number, z: number, 比: number, 鏡?: number): 點[];
export interface 指相 {
    紋?: boolean;
    甲?: boolean;
    腹?: number;
    斂?: boolean;
    蔽?: boolean;
}
export declare function 畫指(運: 運筆具, 鏈: 點[], w根: number, w梢: number, 相?: 指相, bi?: 筆具): void;
export declare const 指寬: {
    readonly 根: 0.95;
    readonly 梢: 0.72;
    readonly 拇根: 1.18;
    readonly 拇梢: 0.92;
    readonly 小根: 0.8;
    readonly 小梢: 0.6;
};
export interface 手勢具 {
    運: 運筆具;
    w: (v: number) => number;
    M: (a: number, b: number) => void;
    L: (a: number, b: number) => void;
    Qk: (ca: number, cb: number, a: number, b: number) => void;
    C: (c1a: number, c1b: number, c2a: number, c2b: number, a: number, b: number) => void;
    S: () => void;
    骨: (fn: () => void) => void;
    衣: (fn: () => void) => void;
    細: (fn: () => void) => void;
    逸: (fn: () => void) => void;
    弧: (a: number, b: number, r: number, a0?: number, a1?: number) => void;
    指: (x0: number, z0: number, θ0: number, 節長: number[], 節角?: number[]) => 點[];
    畫: (鏈點: 點[], w根: number, w梢: number, 相?: 指相) => void;
    蔽: (郭: 點[]) => void;
}
export declare function 手勢(bi: 筆具, x: number, z: number, 比: number, 鏡?: number): 手勢具;
