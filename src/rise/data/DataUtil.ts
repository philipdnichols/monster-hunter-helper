import {
  Skill,
  SkillJson,
  SkillLevel,
  SkillLevelJson,
  SkillMapping,
} from '../typings/Skills';
import {
  ArmorPiece,
  ArmorPieceJson,
  ArmorSet,
  ArmorSetJson,
  ArmorSkill,
  ArmorSkillJson,
} from '../typings/Armor';
import {
  DecorationSlot,
  DecorationSlotJson,
  HIGH_RANK,
  LOW_RANK,
  MASTER_RANK,
  Rank,
  Rarity,
  RARITY_1,
  RARITY_10,
  RARITY_2,
  RARITY_3,
  RARITY_4,
  RARITY_5,
  RARITY_6,
  RARITY_7,
  RARITY_8,
  RARITY_9,
} from '../typings/Shared';

export function parseSkillJson(skillJson: SkillJson): Skill {
  return {
    name: skillJson.name,
    description: skillJson.description,
    levels: skillJson.levels.map(parseSkillLevelJson),
  };
}

function parseSkillLevelJson(skillLevelJson: SkillLevelJson): SkillLevel {
  return {
    level: skillLevelJson.level,
    description: skillLevelJson.description,
  };
}

export function parseArmorSetJson(
  armorSetJson: ArmorSetJson,
  allSkills: SkillMapping
): ArmorSet {
  return {
    names: armorSetJson.names,
    rank: parseRankRef(armorSetJson.rankRef),
    helm: armorSetJson.helm
      ? parseArmorPieceJson(armorSetJson.helm, allSkills)
      : null,
    chest: armorSetJson.chest
      ? parseArmorPieceJson(armorSetJson.chest, allSkills)
      : null,
    gloves: armorSetJson.gloves
      ? parseArmorPieceJson(armorSetJson.gloves, allSkills)
      : null,
    waist: armorSetJson.waist
      ? parseArmorPieceJson(armorSetJson.waist, allSkills)
      : null,
    legs: armorSetJson.legs
      ? parseArmorPieceJson(armorSetJson.legs, allSkills)
      : null,
  };
}

function parseRankRef(rankRef: string): Rank {
  switch (rankRef) {
    case 'LOW_RANK':
      return LOW_RANK;

    case 'HIGH_RANK':
      return HIGH_RANK;

    case 'MASTER_RANK':
      return MASTER_RANK;

    default:
      throw new Error(`Could not parse rank: ${rankRef}`);
  }
}

function parseArmorPieceJson(
  armorPieceJson: ArmorPieceJson,
  allSkills: SkillMapping
): ArmorPiece {
  return {
    names: armorPieceJson.names,
    description: armorPieceJson.description,
    rarity: parseRarityRef(armorPieceJson.rarityRef),
    defense: armorPieceJson.defense,
    slots: armorPieceJson.slots.map(parseDecorationSlotJson),
    fireResistance: armorPieceJson.fireResistance,
    waterResistance: armorPieceJson.waterResistance,
    thunderResistance: armorPieceJson.thunderResistance,
    iceResistance: armorPieceJson.iceResistance,
    dragonResistance: armorPieceJson.dragonResistance,
    skills: armorPieceJson.skills.map((armorSkillJson: ArmorSkillJson) =>
      parseArmorSkillJson(armorSkillJson, allSkills)
    ),
  };
}

function parseRarityRef(rarityRef: string): Rarity {
  switch (rarityRef) {
    case 'RARITY_1':
      return RARITY_1;

    case 'RARITY_2':
      return RARITY_2;

    case 'RARITY_3':
      return RARITY_3;

    case 'RARITY_4':
      return RARITY_4;

    case 'RARITY_5':
      return RARITY_5;

    case 'RARITY_6':
      return RARITY_6;

    case 'RARITY_7':
      return RARITY_7;

    case 'RARITY_8':
      return RARITY_8;

    case 'RARITY_9':
      return RARITY_9;

    case 'RARITY_10':
      return RARITY_10;

    default:
      throw new Error(`Could not parse rarity: ${rarityRef}`);
  }
}

function parseDecorationSlotJson(
  decorationSlotJson: DecorationSlotJson
): DecorationSlot {
  return {
    level: decorationSlotJson.level,
  };
}

function parseArmorSkillJson(
  armorSkillJson: ArmorSkillJson,
  allSkills: SkillMapping
): ArmorSkill {
  const skill: Skill = allSkills[armorSkillJson.skillRef];

  if (!skill) {
    throw new Error(`Could not parse skill: ${armorSkillJson.skillRef}`);
  }

  return {
    level: armorSkillJson.level,
    skill: allSkills[armorSkillJson.skillRef],
  };
}
