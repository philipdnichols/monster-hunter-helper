import { IArmor } from '../../typings/Armor';
import { ISkill, ISkillRank } from '../../typings/Skills';
import { clamp } from 'lodash';

export function calculateSkillRanks(armor: IArmor[], skills: ISkill[]) {
  const skillRankLevels: { [skillId: string]: number } = {};

  function addSkillRank(skillRank: ISkillRank) {
    if (skillRankLevels[skillRank.skill] === undefined) {
      skillRankLevels[skillRank.skill] = 0;
    }
    skillRankLevels[skillRank.skill] += skillRank.level;
  }

  armor.forEach((armor: IArmor) => armor.skills.forEach(addSkillRank));

  const skillRanks: ISkillRank[] = [];
  Object.entries(skillRankLevels).forEach(([skillId, level]) => {
    const skill: ISkill | undefined = skills.find(
      (skill: ISkill) => skill.id === Number(skillId)
    );

    if (!skill) {
      throw new Error(`Cannot determine skill with ID ${skillId}`);
    }

    skillRanks.push(skill.ranks[clamp(level - 1, 0, skill.ranks.length - 1)]);
  });

  skillRanks.sort(
    (skillRank1: ISkillRank, skillRank2: ISkillRank) =>
      // TODO this sorting can be better, needs to prioritize offensive skills first, showing the set bonuses first maybe, etc.
      skillRank2.level - skillRank1.level
  );

  return skillRanks;
}

export function findArmor(
  availableArmor: IArmor[],
  skills: ISkill[]
): IArmor[] {
  return availableArmor.filter((armor: IArmor) => {
    const armorSkillIds = armor.skills.map(
      (skillRank: ISkillRank) => skillRank.skill
    );
    return (
      skills.findIndex((skill: ISkill) => armorSkillIds.includes(skill.id)) !==
      -1
    );
  });
}

export function findArmorPossibilities(
  headArmors: IArmor[],
  chestArmors: IArmor[],
  gloveArmors: IArmor[],
  waistArmors: IArmor[],
  legArmors: IArmor[],
  desiredSkills: ISkill[],
  skills: ISkill[],
  limit: number
): IArmor[][] {
  const armorSets: IArmor[][] = [];

  for (const head of headArmors) {
    for (const chest of chestArmors) {
      for (const gloves of gloveArmors) {
        for (const waist of waistArmors) {
          for (const legs of legArmors) {
            const armorSet = [head, chest, gloves, waist, legs];
            const skillRanks = calculateSkillRanks(armorSet, skills);
            const skillIds = skillRanks.map(
              (skillRank: ISkillRank) => skillRank.skill
            );

            let armorSetContainsDesiredSkills = true;
            for (const desiredSkill of desiredSkills) {
              if (!skillIds.includes(desiredSkill.id)) {
                armorSetContainsDesiredSkills = false;
                break;
              }
            }

            if (armorSetContainsDesiredSkills) {
              armorSets.push(armorSet);
            }

            if (armorSets.length >= limit) {
              break;
            }
          }

          if (armorSets.length >= limit) {
            break;
          }
        }

        if (armorSets.length >= limit) {
          break;
        }
      }

      if (armorSets.length >= limit) {
        break;
      }
    }

    if (armorSets.length >= limit) {
      break;
    }
  }

  return armorSets;
}

export function sortByBaseDefenseDescending(armor1: IArmor, armor2: IArmor) {
  return armor2.defense.base - armor1.defense.base;
}
