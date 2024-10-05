import { IArmor } from '../../typings/Armor';
import { ISkill, ISkillRank } from '../../typings/Skills';
import { clamp } from 'lodash';
import { ICharm, ICharmRank } from '../../typings/Charms';
import {
  DataContext,
  IDataContext,
  ISkillMapping,
} from '../../context/DataContext';
import { useContext } from 'react';

export function calculateSkillRanks(
  armor: IArmor[],
  charm: ICharmRank,
  allSkills: ISkillMapping
) {
  const skillRankLevels: { [skillId: string]: number } = {};

  function addSkillRank(skillRank: ISkillRank) {
    if (skillRankLevels[skillRank.skill] === undefined) {
      skillRankLevels[skillRank.skill] = 0;
    }
    skillRankLevels[skillRank.skill] += skillRank.level;
  }

  armor.forEach((armor: IArmor) => armor.skills.forEach(addSkillRank));
  charm.skills.forEach(addSkillRank);

  const skillRanks: ISkillRank[] = [];
  Object.entries(skillRankLevels).forEach(([skillId, level]) => {
    const skill: ISkill | undefined = allSkills[Number(skillId)];

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
  desiredSkills: ISkill[]
): IArmor[] {
  return availableArmor.filter((armor: IArmor) => {
    const armorSkillIds = armor.skills.map(
      (skillRank: ISkillRank) => skillRank.skill
    );
    return (
      desiredSkills.findIndex((skill: ISkill) =>
        armorSkillIds.includes(skill.id)
      ) !== -1
    );
  });
}

export function findCharms(
  availableCharms: ICharm[],
  desiredSkills: ISkill[]
): ICharm[] {
  return availableCharms.filter((charm: ICharm) => {
    // TODO do we need to check all the ranks, or maybe just one is enough?
    const armorSkillIds = charm.ranks
      .map((charmRank: ICharmRank) => charmRank.skills)
      .flat()
      .map((skillRank: ISkillRank) => skillRank.skill);
    return (
      desiredSkills.findIndex((skill: ISkill) =>
        armorSkillIds.includes(skill.id)
      ) !== -1
    );
  });
}

export const useFindArmorPossibilities = () => {
  const { skills } = useContext<IDataContext>(DataContext);

  return (
    headArmors: IArmor[],
    chestArmors: IArmor[],
    gloveArmors: IArmor[],
    waistArmors: IArmor[],
    legArmors: IArmor[],
    charmRanks: ICharmRank[],
    desiredSkillRanks: ISkillRank[],
    limit: number
  ): IArmor[][] => {
    // TODO return charm
    const armorSets: IArmor[][] = [];

    // TODO possible optimization - build the set and add and remove skill ranks
    //  as the iteration happens?
    console.log(
      `Checking ${headArmors.length * chestArmors.length * gloveArmors.length * waistArmors.length * legArmors.length * charmRanks.length} armor sets for solutions, limiting to ${limit} solutions`
    );
    for (const head of headArmors) {
      for (const chest of chestArmors) {
        for (const gloves of gloveArmors) {
          for (const waist of waistArmors) {
            for (const legs of legArmors) {
              for (const charm of charmRanks) {
                const armorSet = [head, chest, gloves, waist, legs];
                const skillRanks = calculateSkillRanks(armorSet, charm, skills);
                const skillToRankLevelMapping: { [skillId: number]: number } =
                  {};
                skillRanks.forEach((skillRank: ISkillRank) => {
                  skillToRankLevelMapping[skillRank.skill] = skillRank.level;
                });

                let armorSetContainsDesiredSkills = true;
                for (const desiredSkillRank of desiredSkillRanks) {
                  const skillRankLevel: number | undefined =
                    skillToRankLevelMapping[desiredSkillRank.skill];

                  if (
                    !skillRankLevel ||
                    skillRankLevel < desiredSkillRank.level
                  ) {
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

      if (armorSets.length >= limit) {
        break;
      }
    }

    return armorSets;
  };
};

export function sortByBaseDefenseDescending(armor1: IArmor, armor2: IArmor) {
  return armor2.defense.base - armor1.defense.base;
}
