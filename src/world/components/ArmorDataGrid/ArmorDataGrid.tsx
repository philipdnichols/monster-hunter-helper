import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext, IDataContext } from '../../context/DataContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { IArmor } from '../../typings/Armor';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'rank',
    headerName: 'Rank',
    flex: 1,
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

export const ArmorDataGrid = (): ReactElement => {
  const { armors } = useContext<IDataContext>(DataContext);

  const [armorRows, setArmorRows] = useState<IArmor[]>([]);

  useEffect(() => {
    setArmorRows(Object.values(armors));
  }, [armors]);

  function render(): ReactElement {
    return (
      <DataGrid
        columns={columns}
        rows={armorRows}
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
