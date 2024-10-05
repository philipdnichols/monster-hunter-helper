import { ReactElement, useEffect, useState } from 'react';
import { SkillDataGrid } from './components/SkillDataGrid/SkillDataGrid';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { ISkill } from './typings/Skills';
import { IArmorSet } from './typings/ArmorSets';
import { ArmorSetDataGrid } from './components/ArmorSetDataGrid/ArmorSetDataGrid';
import {
  parseArmorSetsJson,
  parseArmorsJson,
  parseCharmsJson,
  parseDecorationsJson,
  parseSkillsJson,
} from './data/DataUtil';
import { ArmorSearcher } from './components/ArmorSearcher/ArmorSearcher';
import { IArmor } from './typings/Armor';
import { ArmorDataGrid } from './components/ArmorDataGrid/ArmorDataGrid';
import { CharmDataGrid } from './components/CharmDataGrid/CharmDataGrid';
import { ICharm } from './typings/Charms';
import { IDecoration } from './typings/Decorations';
import { DecorationDataGrid } from './components/DecorationDataGrid/DecorationDataGrid';
import skillsJson from './data/mhw-db/skills.json';
import armorSetsJson from './data/mhw-db/armor-sets.json';
import armorJson from './data/mhw-db/armor.json';
import charmsJson from './data/mhw-db/charms.json';
import decorationsJson from './data/mhw-db/decorations.json';
import { Tab, Tabs } from '@mui/material';

const ARMOR_SEARCHER_ROUTE = '/armor-searcher';
const ARMOR_SETS_ROUTE = '/armor-sets';
const ARMOR_ROUTE = '/armor';
const CHARMS_ROUTE = '/charms';
const DECORATIONS_ROUTE = '/decorations';
const SKILLS_ROUTE = '/skills';

export const World = (): ReactElement => {
  const { pathname } = useLocation();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [armorSets, setArmorSets] = useState<IArmorSet[]>([]);
  const [armors, setArmors] = useState<IArmor[]>([]);
  const [charms, setCharms] = useState<ICharm[]>([]);
  const [decorations, setDecorations] = useState<IDecoration[]>([]);

  useEffect(() => {
    setSkills(parseSkillsJson(skillsJson));
    setArmorSets(parseArmorSetsJson(armorSetsJson));
    setArmors(parseArmorsJson(armorJson));
    setCharms(parseCharmsJson(charmsJson));
    setDecorations(parseDecorationsJson(decorationsJson));
  }, []);

  function render(): ReactElement {
    return (
      <DataContext.Provider
        value={{ skills, armorSets, armors, charms, decorations }}
      >
        <Tabs value={pathname}>
          <Tab
            label="Armor Searcher"
            component={Link}
            to={ARMOR_SEARCHER_ROUTE}
          />
          <Tab label="Armor Sets" component={Link} to={ARMOR_SETS_ROUTE} />
          <Tab label="Armor" component={Link} to={ARMOR_ROUTE} />
          <Tab label="Charms" component={Link} to={CHARMS_ROUTE} />
          <Tab label="Decorations" component={Link} to={DECORATIONS_ROUTE} />
          <Tab label="Skills" component={Link} to={SKILLS_ROUTE} />
        </Tabs>

        <Routes>
          <Route index element={<Navigate to={ARMOR_SEARCHER_ROUTE} />} />
          <Route path={ARMOR_SEARCHER_ROUTE} element={<ArmorSearcher />} />
          <Route path={ARMOR_SETS_ROUTE} element={<ArmorSetDataGrid />} />
          <Route path={ARMOR_ROUTE} element={<ArmorDataGrid />} />
          <Route path={CHARMS_ROUTE} element={<CharmDataGrid />} />
          <Route path={DECORATIONS_ROUTE} element={<DecorationDataGrid />} />
          <Route path={SKILLS_ROUTE} element={<SkillDataGrid />} />
        </Routes>
      </DataContext.Provider>
    );
  }

  return render();
};
