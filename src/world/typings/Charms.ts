import { ISkillRank } from './Skills';
import { ISkillLevelsMap } from './Shared';

export interface ICharmRank {
  level: number;
  rarity: number;
  skills: ISkillRank[];
  skillLevelsMap: ISkillLevelsMap;
  // crafting TODO
}

export interface ICharm {
  id: number;
  name: string;
  ranks: ICharmRank[];
}
