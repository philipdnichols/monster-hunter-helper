import { IArmor } from './Armor';
import { ISkillRank } from './Skills';
import { TRank } from './Shared';

export interface IArmorSetBonusRank {
  pieces: number;
  skill: ISkillRank;
}

export interface IArmorSetBonus {
  id: number;
  name: string;
  ranks: IArmorSetBonusRank[];
}

export interface IArmorSet {
  id: number;
  name: string;
  rank: TRank;
  pieces: IArmor[];
  bonus: IArmorSetBonus | null;
}
