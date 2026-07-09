import type { 筆具 } from '../bi.js';
export declare function 頸瓔(bi: 筆具): void;
export declare function 胸瓔(bi: 筆具, 參?: {
    滴z?: number;
}): void;
export declare function 臂釧(bi: 筆具, d: -1 | 1, x0?: number, x1?: number, z?: number): void;
export declare function 腕釧(bi: 筆具, 環: ReadonlyArray<readonly [number, number, number, number, number, number]>, 珠: readonly [number, number]): void;
