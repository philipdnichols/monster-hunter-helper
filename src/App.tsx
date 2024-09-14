import { ReactElement, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { SkillMapping } from './typings/Skills';
import { buildAllArmorSets, buildAllSkills } from './data/rise/RiseData';
import { ArmorSetMapping } from './typings/Armor';
import skillsJson from './data/rise/skills.json';
import armorJson from './data/rise/armor.json';

export const App = (): ReactElement => {
  const [allSkills, setAllSkills] = useState<SkillMapping>({});
  const [allArmorSets, setAllArmorSets] = useState<ArmorSetMapping>({});

  useEffect(() => {
    const _allSkills = buildAllSkills(skillsJson);
    const _allArmorSets = buildAllArmorSets(armorJson, _allSkills);

    setAllSkills(_allSkills);
    setAllArmorSets(_allArmorSets);
  }, []);

  function render(): ReactElement {
    return (
      <Container maxWidth={false}>
        <Box>{JSON.stringify(Object.keys(allSkills))}</Box>
        <Box>{JSON.stringify(Object.keys(allArmorSets))}</Box>
      </Container>
    );
  }

  return render();
};
