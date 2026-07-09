import type { 筆具 } from '../bi.js';
export declare const 堅實心合掌: (bi: 筆具, x: number, z: number, 比?: number) => void;
export declare const 虛心合掌: (bi: 筆具, x: number, z: number, 比?: number) => void;
export declare const 未敷蓮合掌: (bi: 筆具, x: number, z: number, 比?: number) => void;
export declare const 初割蓮合掌: (bi: 筆具, x: number, z: number, 比?: number) => void;
export declare const 金剛合掌: (bi: 筆具, x: number, z: number, 比?: number) => void;
export interface 仰掌相 {
    斂?: number;
    中拄?: boolean;
    拇?: '傍' | '仰' | '無';
}
export declare function 仰掌橫(bi: 筆具, x: number, z: number, 比: number, 鏡?: number, 相?: 仰掌相): void;
export declare function 覆掌橫(bi: 筆具, x: number, z: number, 比: number, 鏡?: number, 相?: {
    中拄?: boolean;
}): void;
export declare function 顯露合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 持水合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 反叉合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 反背互相著合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 橫拄指合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 覆手向下合掌(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 覆手合掌(bi: 筆具, x: number, z: number, 比?: number): void;
