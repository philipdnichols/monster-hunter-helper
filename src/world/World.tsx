import { ReactElement, useEffect, useState } from 'react';
import { SkillDataGrid } from './components/SkillDataGrid/SkillDataGrid';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { ISkill } from './typings/Skills';
import skillsJson from './data/mhw-db/skills.json';
import { IArmorSet } from './typings/ArmorSets';
import armorSetsJson from './data/mhw-db/armor-sets.json';
import { ArmorSetDataGrid } from './components/ArmorSetDataGrid/ArmorSetDataGrid';
import { parseArmorSetsJson, parseSkillsJson } from './data/DataUtil';

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
    path: '/',
    element: <Navigate to="/skills" />,
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

  useEffect(() => {
    setSkills(parseSkillsJson(skillsJson));
    setArmorSets(parseArmorSetsJson(armorSetsJson));
  }, []);

  function render(): ReactElement {
    return (
      <DataContext.Provider value={{ skills, armorSets }}>
        <RouterProvider router={router} />
      </DataContext.Provider>
    );
  }

  return render();
};
