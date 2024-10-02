import { ReactElement, useEffect, useState } from 'react';
import { SkillDataGrid } from './components/SkillDataGrid/SkillDataGrid';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { ISkill } from './typings/Skills';
import { IArmorSet } from './typings/ArmorSets';
import { ArmorSetDataGrid } from './components/ArmorSetDataGrid/ArmorSetDataGrid';
import {
  parseArmorSetsJson,
  parseArmorsJson,
  parseSkillsJson,
} from './data/DataUtil';
import { ArmorSearcher } from './components/ArmorSearcher/ArmorSearcher';
import skillsJson from './data/mhw-db/skills.json';
import armorSetsJson from './data/mhw-db/armor-sets.json';
import armorJson from './data/mhw-db/armor.json';
import { IArmor } from './typings/Armor';
import { ArmorDataGrid } from './components/ArmorDataGrid/ArmorDataGrid';

const router = createBrowserRouter([
  {
    path: '/skills',
    element: <SkillDataGrid />,
  },
  {
    path: '/armor-sets',
    element: <ArmorSetDataGrid />,
  },
  {
    path: '/armor',
    element: <ArmorDataGrid />,
  },
  {
    path: '/armor-searcher',
    element: <ArmorSearcher />,
  },
  {
    path: '/',
    element: <Navigate to="/armor-searcher" />,
  },
]);

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/calculation" replace /> },
      { path: "calculation", element: <Calculation /> },
      { path: "calendar", element: <Calendar /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
 */

export const World = (): ReactElement => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [armorSets, setArmorSets] = useState<IArmorSet[]>([]);
  const [armors, setArmors] = useState<IArmor[]>([]);

  useEffect(() => {
    setSkills(parseSkillsJson(skillsJson));
    setArmorSets(parseArmorSetsJson(armorSetsJson));
    setArmors(parseArmorsJson(armorJson));
  }, []);

  function render(): ReactElement {
    return (
      <DataContext.Provider value={{ skills, armorSets, armors }}>
        <RouterProvider router={router} />
      </DataContext.Provider>
    );
  }

  return render();
};
