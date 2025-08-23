export type RawStars = Record<string, string[][]>;
export declare function loadRawStars(): RawStars;
export declare function saveRawStars(data: RawStars): void;
export declare function registerStars(abbr: string, stars: string[][]): void;
