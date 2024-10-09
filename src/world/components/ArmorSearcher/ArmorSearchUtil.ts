import { IArmor } from '../../typings/Armor';
import { ISkill, ISkillRank } from '../../typings/Skills';
import { clamp } from 'lodash';
import { ICharm, ICharmRank } from '../../typings/Charms';
import { DataContext, IDataContext } from '../../context/DataContext';
import { useContext } from 'react';

export const useCalculateSkillRanks = () => {
  const { skills } = useContext<IDataContext>(DataContext);

  return (armor: IArmor[], charm: ICharmRank) => {
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
      const skill: ISkill | undefined = skills[Number(skillId)];

      if (!skill) {
        throw new Error(`Cannot determine skill with ID ${skillId}`);
      }

      skillRanks.push(skill.ranks[clamp(level - 1, 0, skill.ranks.length - 1)]);
    });

    // skillRanks.sort(
    //   (skillRank1: ISkillRank, skillRank2: ISkillRank) =>
    //     // TODO this sorting can be better, needs to prioritize offensive skills first, showing the set bonuses first maybe, etc.
    //     skillRank2.level - skillRank1.level
    // );

    return skillRanks;
  };
};

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
  // const calculateSkillRanks = useCalculateSkillRanks();

  return (
    headArmors: IArmor[],
    chestArmors: IArmor[],
    gloveArmors: IArmor[],
    waistArmors: IArmor[],
    legArmors: IArmor[],
    charmRanks: ICharmRank[],
    desiredSkillRanks: ISkillRank[],
    limit: number
  ): { armor: IArmor[]; charm: ICharmRank }[] => {
    // TODO return charm
    const armorSets: { armor: IArmor[]; charm: ICharmRank }[] = [];

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
                //const armorSet = [head, chest, gloves, waist, legs];
                // const skillRanks = calculateSkillRanks(armorSet, charm);
                // const skillToRankLevelMapping: { [skillId: number]: number } =
                //   {};
                // skillRanks.forEach((skillRank: ISkillRank) => {
                //   skillToRankLevelMapping[skillRank.skill] = skillRank.level;
                // });

                let armorSetContainsDesiredSkills = true;
                for (const desiredSkillRank of desiredSkillRanks) {
                  const skillRankLevel: number =
                    (head.skillLevelsMap[desiredSkillRank.skill] || 0) +
                    (chest.skillLevelsMap[desiredSkillRank.skill] || 0) +
                    (gloves.skillLevelsMap[desiredSkillRank.skill] || 0) +
                    (waist.skillLevelsMap[desiredSkillRank.skill] || 0) +
                    (legs.skillLevelsMap[desiredSkillRank.skill] || 0) +
                    (charm.skillLevelsMap[desiredSkillRank.skill] || 0);

                  if (skillRankLevel < desiredSkillRank.level) {
                    armorSetContainsDesiredSkills = false;
                    break;
                  }
                }

                if (armorSetContainsDesiredSkills) {
                  armorSets.push({
                    armor: [head, chest, gloves, waist, legs],
                    charm,
                  });
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
