import {
  IArmorAttributesJson,
  IArmorJson,
  IArmorSetJson,
  ICharmJson,
  ICharmRankJson,
  IDecorationJson,
  ISetInfoJson,
  ISkillJson,
  ISkillRankJson,
} from './mhw-db/Types';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';
import {
  HIGH_RANK,
  ISkillLevelsMap,
  LOW_RANK,
  MASTER_RANK,
  TRank,
} from '../typings/Shared';
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
import { ICharm, ICharmRank } from '../typings/Charms';
import { IDecoration } from '../typings/Decorations';

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
  const skillLevelsMap = buildSkillLevelsMap(armorJson.skills);

  return {
    ...armorJson,
    type: parseArmorTypeJson(armorJson.type),
    rank: parseRankJson(armorJson.rank),
    armorSet: parseSetInfoJson(armorJson.armorSet),
    attributes: parseArmorAttributesJson(armorJson.attributes),
    skillLevelsMap,
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

export function parseCharmsJson(charmsJson: ICharmJson[]): ICharm[] {
  return charmsJson.map(parseCharmJson);
}

function parseCharmJson(charmJson: ICharmJson): ICharm {
  return {
    ...charmJson,
    ranks: charmJson.ranks.map((charmRankJson: ICharmRankJson) =>
      parseCharmRankJson(charmRankJson)
    ),
  };
}

function parseCharmRankJson(charmRankJson: ICharmRankJson): ICharmRank {
  const skillLevelsMap = buildSkillLevelsMap(charmRankJson.skills);

  return {
    ...charmRankJson,
    skillLevelsMap,
  };
}

export function parseDecorationsJson(
  decorationsJson: IDecorationJson[]
): IDecoration[] {
  return decorationsJson.map(parseDecorationJson);
}

function parseDecorationJson(decorationJson: IDecorationJson): IDecoration {
  return {
    ...decorationJson,
  };
}

function buildSkillLevelsMap(skills: ISkillRankJson[]): ISkillLevelsMap {
  const skillLevelsMap: ISkillLevelsMap = {};
  skills.forEach((skillRankJson: ISkillRankJson) => {
    skillLevelsMap[skillRankJson.skill] = skillRankJson.level;
  });
  return skillLevelsMap;
}
