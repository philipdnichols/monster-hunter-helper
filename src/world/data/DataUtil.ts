import {
  IArmorAttributesJson,
  IArmorJson,
  IArmorSetJson,
  ISetInfoJson,
  ISkillJson,
} from './mhw-db/Types';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';
import { HIGH_RANK, LOW_RANK, MASTER_RANK, TRank } from '../typings/Shared';
import {
  ARMOR_TYPE_CHEST,
  ARMOR_TYPE_GLOVES,
  ARMOR_TYPE_HEAD,
  ARMOR_TYPE_LEGS,
  ARMOR_TYPE_WAIST,
  EGender,
  IArmor,
  IArmorAttributes,
  ISetInfo,
  TArmorRank,
  TArmorType,
} from '../typings/Armor';

export function parseSkillsJson(skillsJson: ISkillJson[]): ISkill[] {
  return skillsJson.map((skillJson: ISkillJson) => {
    return {
      ...skillJson,
    };
  });
}

export function parseArmorSetsJson(
  armorSetsJson: IArmorSetJson[]
): IArmorSet[] {
  return armorSetsJson.map((armorSetJson: IArmorSetJson) => {
    return {
      ...armorSetJson,
      rank: parseRankJson(armorSetJson.rank),
      pieces: armorSetJson.pieces.map(parseArmorJson),
    };
  });
}

function parseRankJson(rankJson: string): TRank {
  switch (rankJson) {
    case 'low':
      return LOW_RANK;

    case 'high':
      return HIGH_RANK;

    case 'master':
      return MASTER_RANK;

    default:
      throw new Error(`Could not parse rank json: ${rankJson}`);
  }
}

export function parseArmorJson(armorJson: IArmorJson): IArmor {
  return {
    ...armorJson,
    type: parseArmorTypeJson(armorJson.type),
    rank: parseRankJson(armorJson.rank),
    armorSet: parseSetInfoJson(armorJson.armorSet),
    attributes: parseArmorAttributesJson(armorJson.attributes),
  };
}

function parseArmorTypeJson(armorTypeJson: string): TArmorType {
  switch (armorTypeJson) {
    case 'head':
      return ARMOR_TYPE_HEAD;

    case 'chest':
      return ARMOR_TYPE_CHEST;

    case 'gloves':
      return ARMOR_TYPE_GLOVES;

    case 'waist':
      return ARMOR_TYPE_WAIST;

    case 'legs':
      return ARMOR_TYPE_LEGS;

    default:
      throw new Error(`Could not parse armor type json: ${armorTypeJson}`);
  }
}

function parseSetInfoJson(
  setInfoJson: number | ISetInfoJson
): number | ISetInfo {
  if (typeof setInfoJson === 'number') {
    return setInfoJson;
  }

  return {
    ...setInfoJson,
    rank: parseArmorRankJson(setInfoJson.rank),
  };
}

function parseArmorAttributesJson(
  armorAttributesJson: IArmorAttributesJson
): IArmorAttributes {
  return {
    ...armorAttributesJson,
    requiredGender: parseGenderJson(armorAttributesJson.requiredGender),
  };
}

function parseArmorRankJson(armorRankJson: string): TArmorRank {
  switch (armorRankJson) {
    case 'low':
      return LOW_RANK;

    case 'high':
      return HIGH_RANK;

    case 'master':
      return MASTER_RANK;

    default:
      throw new Error(`Could not parse armor rank json: ${armorRankJson}`);
  }
}

function parseGenderJson(genderJson: string | undefined): EGender | undefined {
  if (!genderJson) {
    return undefined;
  }

  switch (genderJson) {
    case 'male':
      return EGender.Male;

    case 'female':
      return EGender.Female;

    default:
      throw new Error(`Could not parse gender json: ${genderJson}`);
  }
}

export function parseArmorsJson(armorsJson: IArmorJson[]): IArmor[] {
  return armorsJson.map(parseArmorJson);
}
