import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext, IDataContext } from '../../context/DataContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { ICharm } from '../../typings/Charms';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'ranks',
    headerName: 'Ranks',
    valueGetter: (_, row: ICharm) => row.ranks.length,
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

export const CharmDataGrid = (): ReactElement => {
  const { charms } = useContext<IDataContext>(DataContext);

  const [charmRows, setCharmRows] = useState<ICharm[]>([]);

  useEffect(() => {
    setCharmRows(Object.values(charms));
  }, [charms]);

  function render(): ReactElement {
    return (
      <DataGrid
        columns={columns}
        rows={charmRows}
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
