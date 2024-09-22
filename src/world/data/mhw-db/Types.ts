export interface IDefenseJson {
  base: number;
  max: number;
  augmented: number;
}

export interface IResistancesJson {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface ISetInfoJson {
  id: number;
  name: string;
  rank: string;
  pieces: number[];
}

export interface IArmorAttributesJson {
  requiredGender?: string;
}

export interface IArmorJson {
  id: number;
  name: string;
  type: string;
  rank: string;
  rarity: number;
  defense: IDefenseJson;
  resistances: IResistancesJson;
  slots: ISlotJson[];
  skills: ISkillRankJson[];
  armorSet: number | ISetInfoJson;
  // assets: TODO
  // crafting: TODO
  attributes: IArmorAttributesJson;
}

export interface IArmorSetBonusRankJson {
  pieces: number;
  skill: ISkillRankJson;
}

export interface IArmorSetBonusJson {
  id: number;
  name: string;
  ranks: IArmorSetBonusRankJson[];
}

export interface IArmorSetJson {
  id: number;
  name: string;
  rank: string;
  pieces: IArmorJson[];
  bonus: IArmorSetBonusJson | null;
}

export interface ICharmRankJson {
  level: number;
  rarity: number;
  skills: ISkillRankJson[];
  // crafting TODO
}

export interface ICharmJson {
  id: number;
  name: string;
  ranks: ICharmRankJson[];
}

export interface IDecorationJson {
  id: number;
  name: string;
  rarity: number;
  slot: number;
  skills: ISkillRankJson[];
}

export interface ISlotJson {
  rank: number;
}

export interface ISkillRankModifierJson {
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

export interface ISkillRankJson {
  id: number;
  level: number;
  description?: string;
  skill: number;
  skillName: string;
  modifiers: ISkillRankModifierJson;
}

export interface ISkillJson {
  id: number;
  name: string;
  description: string;
  ranks: ISkillRankJson[];
}

export interface IAttackJson {
  display: number;
  raw: number;
}

export interface IWeaponElementJson {
  type: string;
  damage: number;
  hidden: boolean;
}

export interface IWeaponSharpnessJson {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
}

export interface IWeaponAttributesJson {
  affinity: number;
  defense: number;
}

export interface IPhialTypeJson {
  type: string;
  damage: number;
}

export interface IShellingTypeJson {
  type: string;
  level: number;
}

export interface IAmmoJson {
  type: string;
  capacities: number[];
}

export interface IWeaponJson {
  id: number;
  name: string;
  type: string;
  rarity: number;
  attack: IAttackJson;
  slots: ISlotJson[];
  elements: IWeaponElementJson[];
  // crafting: TODO
  // assets: TODO
  durability: IWeaponSharpnessJson[];
  elderseal: string;
  damageType: string;
  attributes: IWeaponAttributesJson;
  coatings?: string[];
  phial?: IPhialTypeJson;
  shelling?: IShellingTypeJson;
  boostType?: string;
  ammo?: IAmmoJson;
  specialAmmo?: string;
  deviation?: string;
}
