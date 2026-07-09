export declare const 單位: {
    readonly 麥: number;
    readonly 足: number;
    readonly 指: 1;
    readonly 搩: 12;
    readonly 肘: 24;
    readonly 尋: 96;
};
export interface 段目 {
    段: string;
    指: number;
}
export declare const 縱剖: readonly 段目[];
export declare const 橫剖: readonly 段目[];
export declare const 坐像: {
    readonly 盤線: 64;
    readonly 座面: 68;
    readonly 膝寬: 52;
    readonly 踵距: 4;
};
export declare const 面部: {
    readonly 面縱: 12;
    readonly 面橫: 12;
    readonly 眉: {
        readonly 前梢x: 0.375;
        readonly 起z: 12.4375;
        readonly 長: 4;
        readonly 中寬: 0.25;
    };
    readonly 眼: {
        readonly 中線z: 14;
        readonly 大眼角x: 1;
        readonly 小眼角x: 5;
        readonly 縫: 0.25;
        readonly 胞闊: 3;
        readonly 黑珠徑: 1;
        readonly 瞳徑: 0.2;
    };
    readonly 鼻: {
        readonly 準z: 16;
        readonly 總寬: 2.25;
        readonly 柱寬: 0.5;
        readonly 準高: 1.5;
    };
    readonly 口: {
        readonly 縫z: 17.5;
        readonly 長: 4;
        readonly 上唇厚: 1;
        readonly 下唇厚: 1;
        readonly 人中闊: number;
    };
    readonly 頦: {
        readonly 底z: 20;
        readonly 廣: 4;
    };
    readonly 耳: {
        readonly 洞門z: 14;
        readonly 洞門x: 6;
        readonly 尖z: 12.5;
        readonly 廣: 2;
        readonly 垂底z: 19;
    };
    readonly 白毫: {
        readonly z: 12;
        readonly 徑: 1;
    };
    readonly 頸紋: readonly [20.375, 21.625, 23.625];
};
export declare const 搩度: {
    readonly 佛: 10;
    readonly 菩薩: 10;
    readonly 佛母: 9;
    readonly 忿怒: 8;
    readonly 矮身: 6;
};
export type 尊格 = keyof typeof 搩度;
export type 搩度數 = (typeof 搩度)[尊格];
export declare function 錨點(): Record<string, number>;
export declare function 誦戒(): void;
export { 誦戒 as verify };
