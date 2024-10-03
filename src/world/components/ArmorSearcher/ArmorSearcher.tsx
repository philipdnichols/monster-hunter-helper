import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';
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
import {
  calculateSkillRanks,
  findArmor,
  findArmorPossibilities,
  sortByBaseDefenseDescending,
} from './ArmorSearchUtil';
import { MASTER_RANK } from '../../typings/Shared';

export const ArmorSearcher = (): ReactElement => {
  const { skills, armors } = useContext<IDataContext>(DataContext);

  const [head, setHead] = useState<IArmor | null>(null);
  const [chest, setChest] = useState<IArmor | null>(null);
  const [gloves, setGloves] = useState<IArmor | null>(null);
  const [waist, setWaist] = useState<IArmor | null>(null);
  const [legs, setLegs] = useState<IArmor | null>(null);

  const [skillRanks, setSkillRanks] = useState<ISkillRank[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<(ISkill | null)[]>([]);

  useEffect(() => {
    const selectedArmor: IArmor[] = [];
    if (head) selectedArmor.push(head);
    if (chest) selectedArmor.push(chest);
    if (gloves) selectedArmor.push(gloves);
    if (waist) selectedArmor.push(waist);
    if (legs) selectedArmor.push(legs);

    setSkillRanks(calculateSkillRanks(selectedArmor, skills));
  }, [head, chest, gloves, waist, legs, skills]);

  function handleAddSkill() {
    setSelectedSkills([...selectedSkills, null]);
  }

  function handleChangeSelectedSkill(
    selectedSkill: ISkill | null,
    index: number
  ) {
    const _selectedSkills = [...selectedSkills];
    setSelectedSkills([
      ..._selectedSkills.slice(0, index),
      selectedSkill,
      ..._selectedSkills.slice(index + 1),
    ]);
  }

  function handleRemoveSkill(index: number) {
    const _selectedSkills = [...selectedSkills];
    _selectedSkills.splice(index, 1);
    setSelectedSkills(_selectedSkills);
  }

  function handleFindArmor() {
    const _selectedSkills: ISkill[] = selectedSkills.filter(
      (selectedSkill: ISkill | null) => !!selectedSkill
    ) as ISkill[];

    const foundArmor = findArmor(
      armors.filter((armor: IArmor) => armor.rank === MASTER_RANK),
      _selectedSkills
    );

    const armorPossibilities = findArmorPossibilities(
      foundArmor
        .filter((armor: IArmor) => armor.type === ARMOR_TYPE_HEAD)
        .sort(sortByBaseDefenseDescending),
      foundArmor
        .filter((armor: IArmor) => armor.type === ARMOR_TYPE_CHEST)
        .sort(sortByBaseDefenseDescending),
      foundArmor
        .filter((armor: IArmor) => armor.type === ARMOR_TYPE_GLOVES)
        .sort(sortByBaseDefenseDescending),
      foundArmor
        .filter((armor: IArmor) => armor.type === ARMOR_TYPE_WAIST)
        .sort(sortByBaseDefenseDescending),
      foundArmor
        .filter((armor: IArmor) => armor.type === ARMOR_TYPE_LEGS)
        .sort(sortByBaseDefenseDescending),
      _selectedSkills,
      skills,
      200
    );

    console.log(`Found ${armorPossibilities.length} possibilities`);
    armorPossibilities.forEach((armorSet: IArmor[]) => {
      const skillRanks = calculateSkillRanks(armorSet, skills);
      console.log(`Armor Set: ${armorSet.map((armor: IArmor) => armor.name)}`);
      console.log(
        `Skills: ${skillRanks.map((skillRank: ISkillRank) => `${skillRank.skillName} Level ${skillRank.level}`)}`
      );
    });
  }

  function render(): ReactElement {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          gap: 2,
          width: 500,
        }}
      >
        <Button variant="contained" onClick={handleAddSkill}>
          Add Skill
        </Button>
        {selectedSkills.map((selectedSkill: ISkill | null, index: number) => (
          <Box sx={{ display: 'flex', gap: 1 }} key={`selectedSkill-${index}`}>
            <Autocomplete
              sx={{ flex: '3' }}
              options={skills}
              // groupBy={(armor: IArmor) =>
              //   (armor.armorSet as unknown as IArmorSet).name
              // }
              getOptionLabel={(skill: ISkill) => skill.name}
              renderInput={(params) => <TextField {...params} label="Skill" />}
              onChange={(_, skill: ISkill | null) => {
                handleChangeSelectedSkill(skill, index);
              }}
              value={selectedSkill}
            />
            <Button onClick={() => handleRemoveSkill(index)}>❌</Button>
          </Box>
        ))}

        {/*<Autocomplete*/}
        {/*  sx={{ width: 500 }}*/}
        {/*  options={armors.filter((armor) => armor.type === ARMOR_TYPE_HEAD)}*/}
        {/*  // groupBy={(armor: IArmor) =>*/}
        {/*  //   (armor.armorSet as unknown as IArmorSet).name*/}
        {/*  // }*/}
        {/*  getOptionLabel={(armor: IArmor) => armor.name}*/}
        {/*  renderInput={(params) => <TextField {...params} label="Head" />}*/}
        {/*  onChange={(_, armor: IArmor | null) => {*/}
        {/*    setHead(armor);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Autocomplete*/}
        {/*  sx={{ width: 500 }}*/}
        {/*  options={armors.filter((armor) => armor.type === ARMOR_TYPE_CHEST)}*/}
        {/*  getOptionLabel={(armor: IArmor) => armor.name}*/}
        {/*  renderInput={(params) => <TextField {...params} label="Chest" />}*/}
        {/*  onChange={(_, armor: IArmor | null) => {*/}
        {/*    setChest(armor);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Autocomplete*/}
        {/*  sx={{ width: 500 }}*/}
        {/*  options={armors.filter((armor) => armor.type === ARMOR_TYPE_GLOVES)}*/}
        {/*  getOptionLabel={(armor: IArmor) => armor.name}*/}
        {/*  renderInput={(params) => <TextField {...params} label="Gloves" />}*/}
        {/*  onChange={(_, armor: IArmor | null) => {*/}
        {/*    setGloves(armor);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Autocomplete*/}
        {/*  sx={{ width: 500 }}*/}
        {/*  options={armors.filter((armor) => armor.type === ARMOR_TYPE_WAIST)}*/}
        {/*  getOptionLabel={(armor: IArmor) => armor.name}*/}
        {/*  renderInput={(params) => <TextField {...params} label="Waist" />}*/}
        {/*  onChange={(_, armor: IArmor | null) => {*/}
        {/*    setWaist(armor);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Autocomplete*/}
        {/*  sx={{ width: 500 }}*/}
        {/*  options={armors.filter((armor) => armor.type === ARMOR_TYPE_LEGS)}*/}
        {/*  getOptionLabel={(armor: IArmor) => armor.name}*/}
        {/*  renderInput={(params) => <TextField {...params} label="Legs" />}*/}
        {/*  onChange={(_, armor: IArmor | null) => {*/}
        {/*    setLegs(armor);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Box>Selected Head: {head?.name}</Box>*/}
        {/*<Box>Selected Head: {chest?.name}</Box>*/}
        {/*<Box>Selected Head: {gloves?.name}</Box>*/}
        {/*<Box>Selected Head: {waist?.name}</Box>*/}
        {/*<Box>Selected Head: {legs?.name}</Box>*/}
        <Button variant="contained" onClick={handleFindArmor}>
          Find Armor
        </Button>
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
