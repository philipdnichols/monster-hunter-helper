import {
  HIGH_RANK,
  ISkillLevelsMap,
  ISlot,
  LOW_RANK,
  MASTER_RANK,
  TRank,
} from './Shared';
import { ISkillRank } from './Skills';

export const ARMOR_TYPE_HEAD = 'head';
export const ARMOR_TYPE_CHEST = 'chest';
export const ARMOR_TYPE_GLOVES = 'gloves';
export const ARMOR_TYPE_WAIST = 'waist';
export const ARMOR_TYPE_LEGS = 'legs';
export type TArmorType =
  | typeof ARMOR_TYPE_HEAD
  | typeof ARMOR_TYPE_CHEST
  | typeof ARMOR_TYPE_GLOVES
  | typeof ARMOR_TYPE_WAIST
  | typeof ARMOR_TYPE_LEGS;

export type TArmorRank =
  | typeof LOW_RANK
  | typeof HIGH_RANK
  | typeof MASTER_RANK;

export interface IDefense {
  base: number;
  max: number;
  augmented: number;
}

export interface IResistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface ISetInfo {
  id: number;
  name: string;
  rank: TArmorRank;
  pieces: number[];
}

export enum EGender {
  Male = 'male',
  Female = 'female',
}

export interface IArmorAttributes {
  requiredGender?: EGender;
}

export interface IArmor {
  id: number;
  name: string;
  type: TArmorType;
  rank: TRank;
  rarity: number;
  defense: IDefense;
  resistances: IResistances;
  slots: ISlot[];
  skills: ISkillRank[];
  skillLevelsMap: ISkillLevelsMap;
  armorSet: number | ISetInfo;
  // assets: TODO
  // crafting: TODO
  attributes: IArmorAttributes;
}
