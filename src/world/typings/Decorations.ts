import { ISkillRank } from './Skills';

export interface IDecoration {
  id: number;
  name: string;
  rarity: number;
  slot: number;
  skills: ISkillRank[];
}
