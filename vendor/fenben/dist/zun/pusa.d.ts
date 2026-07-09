import type { 筆具, 運筆具 } from '../bi.js';
export declare const 肩錨: {
    readonly 峰x: 13.4;
    readonly 峰z: 28.6;
    readonly 腋x: 10.9;
    readonly 腋z: 32.4;
};
export declare function 上臂常勢(筆: 運筆具, d: -1 | 1, 肘z?: number): void;
export declare function 前臂(bi: 筆具, 筆: 運筆具, 肘: readonly [number, number], 腕: readonly [number, number], 相?: {
    寬根?: number;
    寬梢?: number;
    弓?: number;
    蔽?: boolean;
    肘帽?: boolean;
}): void;
export interface 菩薩相參 {
    臂: (bi: 筆具, 筆: 運筆具) => void;
    冠?: ((bi: 筆具) => void) | '無';
    髻?: '寶髻' | '天髻' | '五髻';
    胸瓔滴z?: number;
    天衣?: boolean;
    條帛?: boolean;
    髮先?: boolean;
    冠髻先?: boolean;
    嚴先?: boolean;
    月輪?: boolean;
}
export declare function 三峰寶冠(bi: 筆具): void;
export declare function 菩薩坐身(bi: 筆具, 參: 菩薩相參): void;
