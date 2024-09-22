import { DecorationSlot, DecorationSlotJson, Rank, Rarity } from './Shared';
import { Skill } from './Skills';

export interface ArmorSetMapping {
  [key: string]: ArmorSet;
}

export interface ArmorSet {
  names: string[];
  rank: Rank;
  helm: ArmorPiece | null;
  chest: ArmorPiece | null;
  gloves: ArmorPiece | null;
  waist: ArmorPiece | null;
  legs: ArmorPiece | null;
}

export interface ArmorPiece {
  names: string[];
  description: string;
  rarity: Rarity;
  defense: number;
  slots: DecorationSlot[];
  fireResistance: number;
  waterResistance: number;
  thunderResistance: number;
  iceResistance: number;
  dragonResistance: number;
  skills: ArmorSkill[];
}

export interface ArmorSkill {
  level: number;
  skill: Skill;
}

export interface ArmorSetMappingJson {
  [key: string]: ArmorSetJson;
}

export interface ArmorSetJson {
  names: string[];
  rankRef: string;
  helm: ArmorPieceJson | null;
  chest: ArmorPieceJson | null;
  gloves: ArmorPieceJson | null;
  waist: ArmorPieceJson | null;
  legs: ArmorPieceJson | null;
}

export interface ArmorPieceJson {
  names: string[];
  description: string;
  rarityRef: string;
  defense: number;
  slots: DecorationSlotJson[];
  fireResistance: number;
  waterResistance: number;
  thunderResistance: number;
  iceResistance: number;
  dragonResistance: number;
  skills: ArmorSkillJson[];
}

export interface ArmorSkillJson {
  level: number;
  skillRef: string;
}
