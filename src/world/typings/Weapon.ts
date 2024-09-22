import { ISlot, STUN, TElementType } from './Shared';

export const GREAT_SWORD = 'great-sword';
export const LONG_SWORD = 'long-sword';
export const SWORD_AND_SHIELD = 'sword-and-shield';
export const DUAL_BLADES = 'dual-blades';
export const HAMMER = 'hammer';
export const HUNTING_HORN = 'hunting-horn';
export const LANCE = 'lance';
export const GUNLANCE = 'gunlance';
export const SWITCH_AXE = 'switch-axe';
export const CHARGE_BLADE = 'charge-blade';
export const INSECT_GLAIVE = 'insect-glaive';
export const LIGHT_BOWGUN = 'light-bowgun';
export const HEAVY_BOWGUN = 'heavy-bowgun';
export const BOW = 'bow';
export type TWeaponType =
  | typeof GREAT_SWORD
  | typeof LONG_SWORD
  | typeof SWORD_AND_SHIELD
  | typeof DUAL_BLADES
  | typeof HAMMER
  | typeof HUNTING_HORN
  | typeof LANCE
  | typeof GUNLANCE
  | typeof SWITCH_AXE
  | typeof CHARGE_BLADE
  | typeof INSECT_GLAIVE
  | typeof LIGHT_BOWGUN
  | typeof HEAVY_BOWGUN
  | typeof BOW;

export interface IAttack {
  display: number;
  raw: number;
}

export interface IWeaponElement {
  type: Exclude<TElementType, typeof STUN>;
  damage: number;
  hidden: boolean;
}

export interface IWeaponSharpness {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
}

export const ELDERSEAL_LOW = 'low';
export const ELDERSEAL_AVERAGE = 'average';
export const ELDERSEAL_HIGH = 'high';
export type TEldersealType =
  | typeof ELDERSEAL_LOW
  | typeof ELDERSEAL_AVERAGE
  | typeof ELDERSEAL_HIGH;

export const DAMAGE_TYPE_BLUNT = 'blunt';
export const DAMAGE_TYPE_PIERCING = 'piercing';
export const DAMAGE_TYPE_SLASHING = 'slashing';
export type TDamageType =
  | typeof DAMAGE_TYPE_BLUNT
  | typeof DAMAGE_TYPE_PIERCING
  | typeof DAMAGE_TYPE_SLASHING;

export interface IWeaponAttributes {
  affinity: number;
  defense: number;
}

export const COATING_CLOSE_RANGE = 'close range';
export const COATING_PARALYSIS = 'paralysis';
export const COATING_POISON = 'poison';
export const COATING_SLEEP = 'sleep';
export const COATING_BLAST = 'blast';
export const COATING_POWER = 'power';
export type TBowCoating =
  | typeof COATING_CLOSE_RANGE
  | typeof COATING_PARALYSIS
  | typeof COATING_POISON
  | typeof COATING_SLEEP
  | typeof COATING_BLAST
  | typeof COATING_POWER;

export const PHIAL_IMPACT = 'impact';
export const PHIAL_ELEMENT = 'element';
export const PHIAL_POWER = 'power';
export const PHIAL_POWER_ELEMENT = 'power element';
export const PHIAL_DRAGON = 'dragon';
export const PHIAL_EXHAUST = 'exhaust';
export const PHIAL_PARA = 'para';
export const PHIAL_POISON = 'poison';
export type TPhialType =
  | typeof PHIAL_IMPACT
  | typeof PHIAL_ELEMENT
  | typeof PHIAL_POWER
  | typeof PHIAL_POWER_ELEMENT
  | typeof PHIAL_DRAGON
  | typeof PHIAL_EXHAUST
  | typeof PHIAL_PARA
  | typeof PHIAL_POISON;

export interface IPhialType {
  type: TPhialType;
  damage: number;
}

export const SHELLING_LONG = 'long';
export const SHELLING_NORMAL = 'normal';
export const SHELLING_WIDE = 'wide';
export type TShellingType =
  | typeof SHELLING_LONG
  | typeof SHELLING_NORMAL
  | typeof SHELLING_WIDE;

export interface IShellingType {
  type: TShellingType;
  level: number;
}

export const BOOST_SEVER = 'sever';
export const BOOST_SPEED = 'speed';
export const BOOST_ELEMENT = 'element';
export const BOOST_HEALTH = 'health';
export const BOOST_STAMINA = 'stamina';
export const BOOST_BLUNT = 'blunt';
export type TBoostType =
  | typeof BOOST_SEVER
  | typeof BOOST_SPEED
  | typeof BOOST_ELEMENT
  | typeof BOOST_HEALTH
  | typeof BOOST_STAMINA
  | typeof BOOST_BLUNT;

export const AMMO_NORMAL = 'normal';
export const AMMO_PIERCING = 'piercing';
export const AMMO_SPREAD = 'spread';
export const AMMO_STICKY = 'sticky';
export const AMMO_CLUSTER = 'cluster';
export const AMMO_RECOVER = 'recover';
export const AMMO_POISON = 'poison';
export const AMMO_PARALYSIS = 'paralysis';
export const AMMO_SLEEP = 'sleep';
export const AMMO_EXHAUST = 'exhaust';
export const AMMO_FLAMING = 'flaming';
export const AMMO_WATER = 'water';
export const AMMO_FREEZE = 'freeze';
export const AMMO_THUNDER = 'thunder';
export const AMMO_DRAGON = 'dragon';
export const AMMO_SLICING = 'slicing';
export const AMMO_WYVERN = 'wyvern';
export const AMMO_DEMON = 'demon';
export const AMMO_ARMOR = 'armor';
export const AMMO_TRANQ = 'tranq';
export type TAmmoType =
  | typeof AMMO_NORMAL
  | typeof AMMO_PIERCING
  | typeof AMMO_SPREAD
  | typeof AMMO_STICKY
  | typeof AMMO_CLUSTER
  | typeof AMMO_RECOVER
  | typeof AMMO_POISON
  | typeof AMMO_PARALYSIS
  | typeof AMMO_SLEEP
  | typeof AMMO_EXHAUST
  | typeof AMMO_FLAMING
  | typeof AMMO_WATER
  | typeof AMMO_FREEZE
  | typeof AMMO_THUNDER
  | typeof AMMO_DRAGON
  | typeof AMMO_SLICING
  | typeof AMMO_WYVERN
  | typeof AMMO_DEMON
  | typeof AMMO_ARMOR
  | typeof AMMO_TRANQ;

export interface IAmmo {
  type: TAmmoType;
  capacities: number[];
}

export const SPECIAL_AMMO_WYVERNBLAST = 'wyvernblast';
export const SPECIAL_AMMO_WYVERNHEART = 'wyvernheart';
export const SPECIAL_AMMO_WYVERNSNIPE = 'wyvernsnipe';
export type TSpecialAmmo =
  | typeof SPECIAL_AMMO_WYVERNBLAST
  | typeof SPECIAL_AMMO_WYVERNHEART
  | typeof SPECIAL_AMMO_WYVERNSNIPE;

export const DEVIATION_NONE = 'none';
export const DEVIATION_LOW = 'low';
export const DEVIATION_AVERAGE = 'average';
export const DEVIATION_HIGH = 'high';
export type TDeviation =
  | typeof DEVIATION_NONE
  | typeof DEVIATION_LOW
  | typeof DEVIATION_AVERAGE
  | typeof DEVIATION_HIGH;

export interface IWeapon {
  id: number;
  name: string;
  type: TWeaponType;
  rarity: number;
  attack: IAttack;
  slots: ISlot[];
  elements: IWeaponElement[];
  // crafting: TODO
  // assets: TODO
  durability: IWeaponSharpness[];
  elderseal: TEldersealType;
  damageType: TDamageType;
  attributes: IWeaponAttributes;
  coatings?: TBowCoating[];
  phial?: IPhialType;
  shelling?: IShellingType;
  boostType?: TBoostType;
  ammo?: IAmmo;
  specialAmmo?: TSpecialAmmo;
  deviation?: TDeviation;
}
