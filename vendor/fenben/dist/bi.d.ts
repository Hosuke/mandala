export interface 鋒法 {
    寬: number;
    起?: '藏' | '尖';
    收?: '回' | '出';
}
export interface 鋒路 {
    M(x: number, z: number): 鋒路;
    L(x: number, z: number): 鋒路;
    Q(cx: number, cz: number, x: number, z: number): 鋒路;
    C(c1x: number, c1z: number, c2x: number, c2z: number, x: number, z: number): 鋒路;
}
export interface 筆具 {
    ctx: CanvasRenderingContext2D;
    R: number;
    u: number;
    Y: (z: number) => number;
    W_OUT: number;
    W_IN: number;
    P: (pts: Array<[number, number]>, close?: boolean) => void;
    A: (x: number, z: number, r: number, a0?: number, a1?: number) => void;
    Q: (x0: number, z0: number, cx: number, cz: number, x1: number, z1: number) => void;
    B: (x0: number, z0: number, c1x: number, c1z: number, c2x: number, c2z: number, x1: number, z1: number) => void;
    E: (x: number, z: number, rx: number, rz: number, rot?: number) => void;
    dot: (x: number, z: number, r: number) => void;
    thin: (fn: () => void) => void;
    dim: (a: number, fn: () => void) => void;
    一筆: (法: 鋒法, 書: (p: 鋒路) => void) => void;
}
export declare function 執筆(ctx: CanvasRenderingContext2D, R: number): 筆具;
export interface 運筆具 {
    M(x: number, z: number): void;
    L(x: number, z: number): void;
    C(c1x: number, c1z: number, c2x: number, c2z: number, x: number, z: number): void;
    Qk(cx: number, cz: number, x: number, z: number): void;
    S(): void;
    以(w: number, fn: () => void): void;
    骨(fn: () => void): void;
    衣(fn: () => void): void;
    細(fn: () => void): void;
    逸(fn: () => void): void;
    陰(fn: () => void): void;
    陽(fn: () => void): void;
}
export declare function 運筆(bi: 筆具): 運筆具;
