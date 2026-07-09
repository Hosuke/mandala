export interface 型制層 {
    名: string;
    z0: number;
    z1: number;
    徑?: number | [number, number];
    註?: string;
}
export interface 型制條 {
    鍵: string;
    器: string;
    旋: '全旋' | '雙側' | '板狀' | '複合';
    比: {
        高: number;
        寬: number;
        厚?: number;
    };
    層: 型制層[];
    註?: string;
}
export declare const 型制表: 型制條[];
