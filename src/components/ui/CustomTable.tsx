import React, { useState, useEffect, useMemo, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { Grid, Button } from '@mui/material';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
// import { Loader } from '@takamol/react-qiwa-core';

import BoxWrapper from './BoxWrapper';
import '../../../public/css/table.css';
import '../../../public/css/mycss.css';

export const Datatable = forwardRef(({ columns, data, rowEvent, hasFilters, loading }: any, ref) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
  );
  const { globalFilter } = state;
  useImperativeHandle(ref, () => ({
    callGlobalFilter(value: string) {
      setGlobalFilter(value);
    },
  }));
  return (
    <div className="q-page-box q-table-list t-box">
      {!hasFilters && (
        <div className="q-page-box__header">
          <div className="q-page-box__header-l">
            {/* <input
              placeholder="Search"
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            /> */}
          </div>
          <div className="q-page-box__header-r"></div>
        </div>
      )}
      <div className="b-table q-page-box__table filters rows_even mytable">
        <div className="table-wrapper tablediv" style={{ height: 'auto' }}>
          <table {...getTableProps()} role="table" className="table-bordered">
            <thead>
              {headerGroups.map((headerGroup: any, indextTr: any) => (
                <tr key={indextTr} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any, indexTh: any) => (
                    <th key={indexTh} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        &nbsp;
                        {column.isSorted ? (column.isSortedDesc ? '▲' : '▼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {!loading && rows.length > 0 ? (
                rows.map((row: any, indexRow: any) => {
                  prepareRow(row);
                  return (
                    <tr key={indexRow} {...row.getRowProps()} onClick={() => rowEvent && rowEvent(indexRow)}>
                      {row.cells.map((cell: any, indexTd: any) => {
                        return (
                          <td key={indexTd} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  {loading ? (
                    <td colSpan={columns.length}>
                      {/* <Loader size={100} style={{ textAlign: 'center' }} thickness={6} /> */}
                    </td>
                  ) : (
                    <td colSpan={columns.length}>No Data Found</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
