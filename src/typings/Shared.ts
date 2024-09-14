export const LOW_RANK = 'LOW_RANK';
export const HIGH_RANK = 'HIGH_RANK';
export const MASTER_RANK = 'MASTER_RANK';
export type Rank = typeof LOW_RANK | typeof HIGH_RANK | typeof MASTER_RANK;

export const RARITY_1 = 1;
export const RARITY_2 = 2;
export const RARITY_3 = 3;
export const RARITY_4 = 4;
export const RARITY_5 = 5;
export const RARITY_6 = 6;
export const RARITY_7 = 7;
export const RARITY_8 = 8;
export const RARITY_9 = 9;
export const RARITY_10 = 10;
export type Rarity =
  | typeof RARITY_1
  | typeof RARITY_2
  | typeof RARITY_3
  | typeof RARITY_4
  | typeof RARITY_5
  | typeof RARITY_6
  | typeof RARITY_7
  | typeof RARITY_8
  | typeof RARITY_9
  | typeof RARITY_10;

export interface DecorationSlot {
  level: number;
}

export interface DecorationSlotJson {
  level: number;
}
