import { ReactElement, useEffect, useState } from 'react';
import { Skill, SkillMapping } from '../../typings/Skills';
import { buildAllSkills } from '../../data/RiseData';
import skillsJson from '../../data/skills.json';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: true,
  },
  {
    field: 'maxLevel',
    headerName: 'Max Level',
    valueGetter: (_, row: Skill) => row.levels.length,
  },
];

export const SkillDataGrid = (): ReactElement => {
  const [allSkills, setAllSkills] = useState<SkillMapping>({});

  useEffect(() => {
    const _allSkills = buildAllSkills(skillsJson);

    setAllSkills(_allSkills);
  }, []);

  function render(): ReactElement {
    return (
      <DataGrid
        editMode="row"
        columns={columns}
        rows={Object.entries(allSkills).map(([skillName, skill]) => {
          return { id: skillName, ...skill };
        })}
      />
    );
  }

  return render();
};
