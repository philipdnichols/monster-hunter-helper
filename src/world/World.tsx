import { ReactElement, useEffect, useState } from 'react';
import { SkillDataGrid } from './components/SkillDataGrid/SkillDataGrid';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  DataContext,
  IArmorMapping,
  IArmorSetMapping,
  ICharmMapping,
  IDecorationMapping,
  ISkillMapping,
} from './context/DataContext';
import { ArmorSetDataGrid } from './components/ArmorSetDataGrid/ArmorSetDataGrid';
import {
  parseArmorSetsJson,
  parseArmorsJson,
  parseCharmsJson,
  parseDecorationsJson,
  parseSkillsJson,
} from './data/DataUtil';
import { ArmorSearcher } from './components/ArmorSearcher/ArmorSearcher';
import { ArmorDataGrid } from './components/ArmorDataGrid/ArmorDataGrid';
import { CharmDataGrid } from './components/CharmDataGrid/CharmDataGrid';
import { DecorationDataGrid } from './components/DecorationDataGrid/DecorationDataGrid';
import skillsJson from './data/mhw-db/skills.json';
import armorSetsJson from './data/mhw-db/armor-sets.json';
import armorJson from './data/mhw-db/armor.json';
import charmsJson from './data/mhw-db/charms.json';
import decorationsJson from './data/mhw-db/decorations.json';
import { Tab, Tabs } from '@mui/material';
import { IArmorSet } from './typings/ArmorSets';
import { IArmor } from './typings/Armor';
import { ICharm } from './typings/Charms';
import { IDecoration } from './typings/Decorations';
import { ISkill } from './typings/Skills';

const ARMOR_SEARCHER_ROUTE = '/armor-searcher';
const ARMOR_SETS_ROUTE = '/armor-sets';
const ARMOR_ROUTE = '/armor';
const CHARMS_ROUTE = '/charms';
const DECORATIONS_ROUTE = '/decorations';
const SKILLS_ROUTE = '/skills';

export const World = (): ReactElement => {
  const { pathname } = useLocation();

  const [skills, setSkills] = useState<ISkillMapping>({});
  const [armorSets, setArmorSets] = useState<IArmorSetMapping>({});
  const [armors, setArmors] = useState<IArmorMapping>({});
  const [charms, setCharms] = useState<ICharmMapping>({});
  const [decorations, setDecorations] = useState<IDecorationMapping>({});

  useEffect(() => {
    const reducer = (
      acc: object,
      value: ISkill | IArmorSet | IArmor | ICharm | IDecoration
    ) => ({
      ...acc,
      [value.id]: value,
    });

    setSkills(
      parseSkillsJson(skillsJson).reduce(
        reducer,
        {}
      ) as unknown as ISkillMapping
    );
    setArmorSets(
      parseArmorSetsJson(armorSetsJson).reduce(
        reducer,
        {}
      ) as unknown as IArmorSetMapping
    );
    setArmors(
      parseArmorsJson(armorJson).reduce(reducer, {}) as unknown as IArmorMapping
    );
    setCharms(
      parseCharmsJson(charmsJson).reduce(
        reducer,
        {}
      ) as unknown as ICharmMapping
    );
    setDecorations(
      parseDecorationsJson(decorationsJson).reduce(
        reducer,
        {}
      ) as unknown as IDecorationMapping
    );
  }, []);

  function render(): ReactElement {
    return (
      <DataContext.Provider
        value={{ skills, armorSets, armors, charms, decorations }}
      >
        <Tabs value={pathname}>
          <Tab
            label="Armor Searcher"
            value={ARMOR_SEARCHER_ROUTE}
            component={Link}
            to={ARMOR_SEARCHER_ROUTE}
          />
          <Tab
            label="Armor Sets"
            value={ARMOR_SETS_ROUTE}
            component={Link}
            to={ARMOR_SETS_ROUTE}
          />
          <Tab
            label="Armor"
            value={ARMOR_ROUTE}
            component={Link}
            to={ARMOR_ROUTE}
          />
          <Tab
            label="Charms"
            value={CHARMS_ROUTE}
            component={Link}
            to={CHARMS_ROUTE}
          />
          <Tab
            label="Decorations"
            value={DECORATIONS_ROUTE}
            component={Link}
            to={DECORATIONS_ROUTE}
          />
          <Tab
            label="Skills"
            value={SKILLS_ROUTE}
            component={Link}
            to={SKILLS_ROUTE}
          />
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
