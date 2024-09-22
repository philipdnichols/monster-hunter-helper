import { ISkillRank } from './Skills';

export interface ICharmRank {
  level: number;
  rarity: number;
  skills: ISkillRank[];
  // crafting TODO
}

export interface ICharm {
  id: number;
  name: string;
  ranks: ICharmRank[];
}
