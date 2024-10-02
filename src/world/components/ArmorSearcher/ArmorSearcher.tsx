import { ReactElement, useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Container, TextField } from '@mui/material';
import { DataContext, IDataContext } from '../../context/DataContext';
import {
  ARMOR_TYPE_CHEST,
  ARMOR_TYPE_GLOVES,
  ARMOR_TYPE_HEAD,
  ARMOR_TYPE_LEGS,
  ARMOR_TYPE_WAIST,
  IArmor,
} from '../../typings/Armor';
import { ISkill, ISkillRank } from '../../typings/Skills';
import { clamp } from 'lodash';

export const ArmorSearcher = (): ReactElement => {
  const { skills, armors } = useContext<IDataContext>(DataContext);

  const [head, setHead] = useState<IArmor | null>(null);
  const [chest, setChest] = useState<IArmor | null>(null);
  const [gloves, setGloves] = useState<IArmor | null>(null);
  const [waist, setWaist] = useState<IArmor | null>(null);
  const [legs, setLegs] = useState<IArmor | null>(null);

  const [skillRanks, setSkillRanks] = useState<ISkillRank[]>([]);

  useEffect(() => {
    const skillRankLevels: { [skillId: string]: number } = {};

    function addSkillRank(skillRank: ISkillRank) {
      if (skillRankLevels[skillRank.skill] === undefined) {
        skillRankLevels[skillRank.skill] = 0;
      }
      skillRankLevels[skillRank.skill] += skillRank.level;
    }

    head?.skills.forEach(addSkillRank);
    chest?.skills.forEach(addSkillRank);
    gloves?.skills.forEach(addSkillRank);
    waist?.skills.forEach(addSkillRank);
    legs?.skills.forEach(addSkillRank);

    const _skillRanks: ISkillRank[] = [];
    Object.entries(skillRankLevels).forEach(([skillId, level]) => {
      const skill: ISkill | undefined = skills.find(
        (skill: ISkill) => skill.id === Number(skillId)
      );

      if (!skill) {
        throw new Error(`Cannot determine skill with ID ${skillId}`);
      }

      _skillRanks.push(
        skill.ranks[clamp(level - 1, 0, skill.ranks.length - 1)]
      );
    });

    _skillRanks.sort(
      (skillRank1: ISkillRank, skillRank2: ISkillRank) =>
        // TODO this sorting can be better, needs to prioritize offensive skills first, showing the set bonuses first maybe, etc.
        skillRank2.level - skillRank1.level
    );

    setSkillRanks(_skillRanks);
  }, [head, chest, gloves, waist, legs]);

  function render(): ReactElement {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          gap: 2,
        }}
      >
        <Autocomplete
          sx={{ width: 500 }}
          options={armors.filter((armor) => armor.type === ARMOR_TYPE_HEAD)}
          // groupBy={(armor: IArmor) =>
          //   (armor.armorSet as unknown as IArmorSet).name
          // }
          getOptionLabel={(armor: IArmor) => armor.name}
          renderInput={(params) => <TextField {...params} label="Head" />}
          onChange={(_, armor: IArmor | null) => {
            setHead(armor);
          }}
        />
        <Autocomplete
          sx={{ width: 500 }}
          options={armors.filter((armor) => armor.type === ARMOR_TYPE_CHEST)}
          getOptionLabel={(armor: IArmor) => armor.name}
          renderInput={(params) => <TextField {...params} label="Chest" />}
          onChange={(_, armor: IArmor | null) => {
            setChest(armor);
          }}
        />
        <Autocomplete
          sx={{ width: 500 }}
          options={armors.filter((armor) => armor.type === ARMOR_TYPE_GLOVES)}
          getOptionLabel={(armor: IArmor) => armor.name}
          renderInput={(params) => <TextField {...params} label="Gloves" />}
          onChange={(_, armor: IArmor | null) => {
            setGloves(armor);
          }}
        />
        <Autocomplete
          sx={{ width: 500 }}
          options={armors.filter((armor) => armor.type === ARMOR_TYPE_WAIST)}
          getOptionLabel={(armor: IArmor) => armor.name}
          renderInput={(params) => <TextField {...params} label="Waist" />}
          onChange={(_, armor: IArmor | null) => {
            setWaist(armor);
          }}
        />
        <Autocomplete
          sx={{ width: 500 }}
          options={armors.filter((armor) => armor.type === ARMOR_TYPE_LEGS)}
          getOptionLabel={(armor: IArmor) => armor.name}
          renderInput={(params) => <TextField {...params} label="Legs" />}
          onChange={(_, armor: IArmor | null) => {
            setLegs(armor);
          }}
        />
        {/*<Box>Selected Head: {head?.name}</Box>*/}
        {/*<Box>Selected Head: {chest?.name}</Box>*/}
        {/*<Box>Selected Head: {gloves?.name}</Box>*/}
        {/*<Box>Selected Head: {waist?.name}</Box>*/}
        {/*<Box>Selected Head: {legs?.name}</Box>*/}
        <Box>
          Skills:
          {skillRanks.map((skillRank: ISkillRank) => (
            <Box key={skillRank.skillName}>
              {skillRank.skillName} Level {skillRank.level}
            </Box>
          ))}
        </Box>
      </Container>
    );
  }

  return render();
};
