export const LOW_RANK = 'low';
export const HIGH_RANK = 'high';
export const MASTER_RANK = 'master';
export type TRank = 'low' | 'high' | 'master';

export interface ISlot {
  rank: number;
}

export const FIRE = 'fire';
export const WATER = 'water';
export const ICE = 'ice';
export const THUNDER = 'thunder';
export const DRAGON = 'dragon';
export const BLAST = 'blast';
export const POISON = 'poison';
export const SLEEP = 'sleep';
export const PARALYSIS = 'paralysis';
export const STUN = 'stun';
export type TElementType =
  | typeof FIRE
  | typeof WATER
  | typeof ICE
  | typeof THUNDER
  | typeof DRAGON
  | typeof BLAST
  | typeof POISON
  | typeof SLEEP
  | typeof PARALYSIS
  | typeof STUN;

export interface ISkillLevelsMap {
  [id: number]: number;
}
