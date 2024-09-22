export interface ISkillRankModifier {
  affinity?: number;
  attack?: number;
  damageFire?: number | string;
  damageWater?: number | string;
  damageIce?: number | string;
  damageThunder?: number | string;
  damageDragon?: number | string;
  defense?: number;
  health?: number;
  sharpnessBonus?: number;
  resistAll?: number;
  resistFire?: number;
  resistWater?: number;
  resistIce?: number;
  resistThunder?: number;
  resistDragon?: number;
}

export interface ISkillRank {
  id: number;
  level: number;
  description?: string;
  skill: number;
  skillName: string;
  modifiers: ISkillRankModifier;
}

export interface ISkill {
  id: number;
  name: string;
  description: string;
  ranks: ISkillRank[];
}
