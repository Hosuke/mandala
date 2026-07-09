import type { 搩度數 } from './liangdu.js';
export type 形類 = '如來形' | '菩薩形' | '明王形' | '天部形' | '天女形' | '童子形';
export type 印名 = '法界定印' | '彌陀定印' | '智拳印' | '觸地印' | '與願印' | '施無畏印' | '執杵鈴' | '二拳交臂' | '執箭' | '二拳當胸' | '掌承寶珠' | '承日輪' | '執幢' | '二拳舉耳' | '執蓮開瓣' | '執劍持篋' | '擎輪' | '承鈴' | '合掌頂上' | '二拳對指' | '二拳向外' | '左拳右觸地' | '執寶蓮持珠' | '定印上蓮' | '執寶蓮立羯磨' | '執鉤' | '執索' | '執鎖' | '執鈴' | '二拳置膝' | '執鬘' | '彈箜篌' | '舞勢' | '捧香爐' | '捧華盤' | '捧燈' | '塗香勢' | '執蓮上劍' | '執經杵蓮' | '執瓶蓮施無畏';
export type 信級 = '已核' | '待核';
export interface 出典條 {
    典: string;
    據?: string;
    引?: string;
    註?: string;
    卷?: string;
}
export interface 面 {
    尊: string;
    形: 形類;
    搩度: 搩度數;
    面臂: {
        面: number;
        臂: number;
        目?: number;
    };
    印: 印名;
    印法: string;
    持物: string[];
    身色: {
        経軌: string;
        現図: string;
    } | null;
    座: string;
    光: {
        頭光?: boolean;
        月輪?: boolean;
        舉身光?: boolean;
        火焰?: boolean;
    };
    出典: 出典條[];
    異說?: string;
    信: 信級;
}
export interface 尊條 {
    id: string;
    t?: 面;
    k?: 面;
    註?: string;
}
export declare const 儀軌: 尊條[];
export declare const 依號: Record<string, 尊條>;
export declare function 已核之(id: string, side: 't' | 'k'): 面 | null;
export { 儀軌 as GIKI, 依號 as gikiById, 已核之 as kosareta };
