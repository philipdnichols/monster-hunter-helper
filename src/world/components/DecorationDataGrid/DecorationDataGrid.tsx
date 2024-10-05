import { ReactElement, useContext } from 'react';
import { DataContext, IDataContext } from '../../context/DataContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'slot',
    headerName: 'Slot',
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

export const DecorationDataGrid = (): ReactElement => {
  const { decorations } = useContext<IDataContext>(DataContext);

  function render(): ReactElement {
    return (
      <DataGrid
        columns={columns}
        rows={decorations}
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
