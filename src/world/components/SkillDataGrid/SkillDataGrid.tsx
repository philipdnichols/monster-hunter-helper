import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext, IDataContext } from '../../context/DataContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ISkill } from '../../typings/Skills';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 4,
  },
  {
    field: 'ranks',
    headerName: 'Ranks',
    valueGetter: (_, row: ISkill) => row.ranks.length,
    flex: 0.25,
  },
];

const initialState: GridInitialStateCommunity = {
  sorting: {
    sortModel: [
      {
        field: 'name',
        sort: 'asc',
      },
    ],
  },
  pagination: {
    paginationModel: {
      pageSize: 20,
    },
  },
};

export const SkillDataGrid = (): ReactElement => {
  const { skills } = useContext<IDataContext>(DataContext);

  const [skillRows, setSkillRows] = useState<ISkill[]>([]);

  useEffect(() => {
    setSkillRows(Object.values(skills));
  }, [skills]);

  function render(): ReactElement {
    return (
      <DataGrid
        columns={columns}
        rows={skillRows}
        initialState={initialState}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //   },
        // }}
      />
    );
  }

  return render();
};
