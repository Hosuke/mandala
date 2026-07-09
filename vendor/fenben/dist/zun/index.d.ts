import type { 筆具 } from '../bi.js';
import type { 面 } from '../yigui.js';
export type 筆 = (bi: 筆具, mian: 面) => void;
export declare const 落筆簿: Record<string, 筆>;
export declare const 候審筆: Set<string>;
