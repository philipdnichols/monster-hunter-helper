import { ArmorSetMapping, ArmorSetMappingJson } from '../../typings/Armor';
import { SkillMapping, SkillMappingJson } from '../../typings/Skills';
import { parseArmorSetJson, parseSkillJson } from '../DataUtil';

export function buildAllSkills(
  skillMappingJson: SkillMappingJson
): SkillMapping {
  const allSkills: SkillMapping = {};

  Object.keys(skillMappingJson).forEach((skillName: string) => {
    allSkills[skillName] = parseSkillJson(skillMappingJson[skillName]);
  });

  return allSkills;
}

export function buildAllArmorSets(
  armorSetMappingJson: ArmorSetMappingJson,
  allSkills: SkillMapping
): ArmorSetMapping {
  const allArmorSets: ArmorSetMapping = {};

  Object.keys(armorSetMappingJson).forEach((armorSetName: string) => {
    allArmorSets[armorSetName] = parseArmorSetJson(
      armorSetMappingJson[armorSetName],
      allSkills
    );
  });

  return allArmorSets;
}
