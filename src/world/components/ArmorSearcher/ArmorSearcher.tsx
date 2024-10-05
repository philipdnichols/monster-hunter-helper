import { ReactElement, useContext, useEffect, useState } from 'react';
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
  findArmor,
  findCharms,
  sortByBaseDefenseDescending,
  useFindArmorPossibilities,
} from './ArmorSearchUtil';
import { ICharm, ICharmRank } from '../../typings/Charms';
import { HIGH_RANK, LOW_RANK } from '../../typings/Shared';

export const ArmorSearcher = (): ReactElement => {
  const { skills, armors, charms } = useContext<IDataContext>(DataContext);

  // const [head, setHead] = useState<IArmor | null>(null);
  // const [chest, setChest] = useState<IArmor | null>(null);
  // const [gloves, setGloves] = useState<IArmor | null>(null);
  // const [waist, setWaist] = useState<IArmor | null>(null);
  // const [legs, setLegs] = useState<IArmor | null>(null);

  const [skillRanks, setSkillRanks] = useState<ISkillRank[]>([]);
  const [armorArray, setArmorArray] = useState<IArmor[]>([]);
  const [charmArray, setCharmArray] = useState<ICharm[]>([]);

  const [selectedSkillRanks, setSelectedSkillRanks] = useState<
    (ISkillRank | null)[]
  >([]);

  const findArmorPossibilities = useFindArmorPossibilities();

  useEffect(() => {
    const _skillRanks: ISkillRank[] = [];

    Object.values(skills).forEach((skill: ISkill) => {
      _skillRanks.push(...skill.ranks);
    });

    setSkillRanks(_skillRanks);
  }, [skills]);

  useEffect(() => {
    setArmorArray(Object.values(armors));
  }, [armors]);

  useEffect(() => {
    setCharmArray(Object.values(charms));
  }, [charms]);

  // useEffect(() => {
  //   const selectedArmor: IArmor[] = [];
  //   if (head) selectedArmor.push(head);
  //   if (chest) selectedArmor.push(chest);
  //   if (gloves) selectedArmor.push(gloves);
  //   if (waist) selectedArmor.push(waist);
  //   if (legs) selectedArmor.push(legs);
  //
  //   setSkillRanks(calculateSkillRanks(selectedArmor, skills));
  // }, [head, chest, gloves, waist, legs, skills]);

  function handleAddSkillRank() {
    setSelectedSkillRanks([...selectedSkillRanks, null]);
  }

  function handleChangeSelectedSkillRank(
    selectedSkillRank: ISkillRank | null,
    index: number
  ) {
    const _selectedSkillRanks = [...selectedSkillRanks];
    setSelectedSkillRanks([
      ..._selectedSkillRanks.slice(0, index),
      selectedSkillRank,
      ..._selectedSkillRanks.slice(index + 1),
    ]);
  }

  function handleRemoveSkillRank(index: number) {
    const _selectedSkillRanks = [...selectedSkillRanks];
    _selectedSkillRanks.splice(index, 1);
    setSelectedSkillRanks(_selectedSkillRanks);
  }

  function handleFindArmor() {
    const _selectedSkillRanks: ISkillRank[] = selectedSkillRanks.filter(
      (selectedSkillRank: ISkillRank | null) => !!selectedSkillRank
    ) as ISkillRank[];
    const desiredSkills = _selectedSkillRanks.map(
      (selectedSkillRank: ISkillRank) => skills[selectedSkillRank.skill]
    );

    let time = new Date().getTime();
    const foundArmor = findArmor(
      armorArray.filter(
        (armor: IArmor) => armor.rank === LOW_RANK || armor.rank === HIGH_RANK
      ),
      desiredSkills
    );
    console.log(`findArmor took ${new Date().getTime() - time} milliseconds`);

    time = new Date().getTime();
    const foundCharms = findCharms(charmArray, desiredSkills);
    console.log(`findCharms took ${new Date().getTime() - time} milliseconds`);

    time = new Date().getTime();
    const headArmors: IArmor[] = foundArmor
      .filter((armor: IArmor) => armor.type === ARMOR_TYPE_HEAD)
      .sort(sortByBaseDefenseDescending);
    const chestArmors: IArmor[] = foundArmor
      .filter((armor: IArmor) => armor.type === ARMOR_TYPE_CHEST)
      .sort(sortByBaseDefenseDescending);
    const gloveArmors: IArmor[] = foundArmor
      .filter((armor: IArmor) => armor.type === ARMOR_TYPE_GLOVES)
      .sort(sortByBaseDefenseDescending);
    const waistArmors: IArmor[] = foundArmor
      .filter((armor: IArmor) => armor.type === ARMOR_TYPE_WAIST)
      .sort(sortByBaseDefenseDescending);
    const legArmors: IArmor[] = foundArmor
      .filter((armor: IArmor) => armor.type === ARMOR_TYPE_LEGS)
      .sort(sortByBaseDefenseDescending);
    const charmRanks = foundCharms
      .map((charm: ICharm) => charm.ranks)
      .flat()
      .filter((charmRank: ICharmRank) => charmRank.rarity <= 8);

    console.log(`Head Armor: ${headArmors.map((armor: IArmor) => armor.name)}`);
    console.log(
      `Chest Armor: ${chestArmors.map((armor: IArmor) => armor.name)}`
    );
    console.log(
      `Glove Armor: ${gloveArmors.map((armor: IArmor) => armor.name)}`
    );
    console.log(
      `Waist Armor: ${waistArmors.map((armor: IArmor) => armor.name)}`
    );
    console.log(`Leg Armor: ${legArmors.map((armor: IArmor) => armor.name)}`);
    console.log(
      `Charms: ${foundCharms.map((charm: ICharm) => charm.ranks.filter((charmRank: ICharmRank) => charmRank.rarity <= 8).map((charmRank: ICharmRank) => `${charm.name} ${charmRank.level}`))}`
    );
    const armorPossibilities = findArmorPossibilities(
      headArmors,
      chestArmors,
      gloveArmors,
      waistArmors,
      legArmors,
      charmRanks,
      _selectedSkillRanks,
      200
    );
    console.log(
      `findArmorPossibilities took ${new Date().getTime() - time} milliseconds`
    );

    console.log(`Found ${armorPossibilities.length} possibilities`);
    // armorPossibilities.forEach((armorSet: IArmor[]) => {
    //   const skillRanks = calculateSkillRanks(armorSet, skills);
    //   console.log(`Armor Set: ${armorSet.map((armor: IArmor) => armor.name)}`);
    //   console.log(
    //     `Skills: ${skillRanks.map((skillRank: ISkillRank) => `${skillRank.skillName} Level ${skillRank.level}`)}`
    //   );
    // });
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
        <Button variant="contained" onClick={handleAddSkillRank}>
          Add Skill
        </Button>
        {selectedSkillRanks.map(
          (selectedSkillRank: ISkillRank | null, index: number) => (
            <Box
              sx={{ display: 'flex', gap: 1 }}
              key={`selectedSkillRank-${index}`}
            >
              <Autocomplete
                sx={{ flex: '3' }}
                options={skillRanks}
                // TODO add filtering for other skill ranks selected in the UI,
                //  but not the rank that is selected in THIS autocomplete,
                //  so that you can't have two skill ranks for the same skill
                //  selected
                // options={skillRanks.filter((skillRank: ISkillRank) => {
                //   return (
                //     selectedSkillRank === null ||
                //     skillRank.skill !== selectedSkillRank.skill
                //   );
                // })}
                // groupBy={(armor: IArmor) =>
                //   (armor.armorSet as unknown as IArmorSet).name
                // }
                getOptionLabel={(skillRank: ISkillRank) =>
                  `${skillRank.skillName} Level ${skillRank.level}`
                }
                renderInput={(params) => (
                  <TextField {...params} label="Skill Rank" />
                )}
                onChange={(_, skillRank: ISkillRank | null) => {
                  handleChangeSelectedSkillRank(skillRank, index);
                }}
                value={selectedSkillRank}
              />
              <Button onClick={() => handleRemoveSkillRank(index)}>❌</Button>
            </Box>
          )
        )}

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
        {/*<Box>*/}
        {/*  Skills:*/}
        {/*  {skillRanks.map((skillRank: ISkillRank) => (*/}
        {/*    <Box key={skillRank.skillName}>*/}
        {/*      {skillRank.skillName} Level {skillRank.level}*/}
        {/*    </Box>*/}
        {/*  ))}*/}
        {/*</Box>*/}
      </Container>
    );
  }

  return render();
};
