import type { 筆具 } from '../bi.js';
export declare function 金剛拳(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 忿怒拳(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 蓮華拳(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 內縛(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 外縛(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 如來拳(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 智拳印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 法界定印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 彌陀定印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 施無畏印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 與願印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 觸地印(bi: 筆具, x: number, z: number, 比?: number, 飾?: boolean): void;
export declare function 說法印(bi: 筆具, x: number, z: number, 比?: number): void;
export declare function 期剋印(bi: 筆具, x: number, z: number, 比?: number): void;
export interface 手印條 {
    鍵: string;
    名: string;
    梵: string | null;
    類: '十二合掌' | '六種拳' | '常用印';
    法: string;
    典: string;
    注: string | null;
    筆: (bi: 筆具, x: number, z: number, 比?: number) => void;
    展比: number;
}
export declare const 手印目: 手印條[];
