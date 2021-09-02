

// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isBoolean } from 'lodash';
import { useMemo } from 'react';
import DataTable from 'react-data-table-component';

import { TableProps } from '../../interfaces/table';

import customStyles from './main-table-styles';
import './style.scss';
// -----------------------------------------------------------------------------
//   Layout
// -----------------------------------------------------------------------------

// const perPage: Array<number> = [5];

export default function Table({ columns, data, withPagination }: TableProps): JSX.Element {
  const includePagination: boolean = useMemo((): boolean => (
    isBoolean(withPagination)
      ? withPagination
      : true
  ), [withPagination]);

  return (
    <div className="main-table-wrapper">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        className=""
        responsive
        // paginationPerPage={perPage[0]}
        // paginationRowsPerPageOptions={perPage}
        pagination={includePagination}
      />
    </div>
  );
}
