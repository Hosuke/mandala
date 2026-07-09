import type { 筆具 } from '../bi.js';
export type 如來印 = '觸地' | '與願' | '施無畏' | '定印';
export interface 如來相參 {
    月輪?: boolean;
    左手?: '握衣' | '拳臍';
}
export declare function 如來坐身(bi: 筆具, 印: 如來印, 相?: 如來相參): void;
