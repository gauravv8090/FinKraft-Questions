// import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
// import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// const Grid = () => {

//  const gridRef = useRef(); // Optional - for accessing Grid's API
//  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

//  // Each Column Definition results in one Column.
//  const [columnDefs, setColumnDefs] = useState([
//    {field: 'make', filter: true, sortable: true, },
//    {field: 'model', filter: true},
//    {field: 'price'}
//  ]);

//  // DefaultColDef sets props common to all Columns
//  const defaultColDef = useMemo( ()=> ({
//      sortable: true
//    }));

//  // Example of consuming Grid Event
//  const cellClickedListener = useCallback( event => {
//    console.log('cellClicked', event);
//  }, []);

//  // Example load data from sever
//  useEffect(() => {
//    fetch('https://www.ag-grid.com/example-assets/row-data.json')
//    .then(result => result.json())
//    .then(rowData => setRowData(rowData))
//  }, []);

//  // Example using Grid's API
//  const buttonListener = useCallback( e => {
//    gridRef.current.api.deselectAll();
//  }, []);

//  return (
//    <div>

//      {/* Example using Grid's API */}
//      <button onClick={buttonListener}>Push Me</button>

//      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
//      <div className="ag-theme-alpine" style={{width: 700, height: 500, margin: 'auto'}}>

//        <AgGridReact 
//            ref={gridRef} // Ref for accessing Grid's API

//            rowData={rowData} // Row Data for Rows

//            columnDefs={columnDefs} // Column Defs for Columns
//            defaultColDef={defaultColDef} // Default Column Properties

//            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
//            rowSelection='multiple' // Options - allows click selection of rows

//            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
//            />
//      </div>
//    </div>
//  );
// };

// export default Grid;

// 'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

const setText = (selector, text) => {
  document.querySelector(selector).innerHTML = text;
};

const setLastButtonDisabled = (disabled) => {
  document.querySelector('#btLast').disabled = disabled;
};

const Grid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '80vh', width: '80%', margin :'auto' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: 'S.No',
      width: 100,
      valueFormatter: (params) => {
        return `${parseInt(params.node.id) + 1}`;
      },
    },
    { headerName: 'Athlete', field: 'athlete', width: 150 },
    { headerName: 'Age', field: 'age', width: 90 },
    { headerName: 'Country', field: 'country', width: 120 },
    { headerName: 'Year', field: 'year', width: 90 },
    { headerName: 'Date', field: 'date', width: 110 },
    { headerName: 'Sport', field: 'sport', width: 110 },
    { headerName: 'Gold', field: 'gold', width: 100 },
    { headerName: 'Silver', field: 'silver', width: 100 },
    { headerName: 'Bronze', field: 'bronze', width: 100 },
    { headerName: 'Total', field: 'total', width: 100 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      filter: true,
      sortable: true
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onPaginationChanged = useCallback(() => {
    console.log('onPaginationPageLoaded');
    // Workaround for bug in events order
    if (gridRef.current.api) {
      setText(
        '#lbLastPageFound',
        gridRef.current.api.paginationIsLastPageFound()
      );
      setText('#lbPageSize', gridRef.current.api.paginationGetPageSize());
      // we +1 to current page, as pages are zero based
      setText(
        '#lbCurrentPage',
        gridRef.current.api.paginationGetCurrentPage() + 1
      );
      setText('#lbTotalPages', gridRef.current.api.paginationGetTotalPages());
      setLastButtonDisabled(!gridRef.current.api.paginationIsLastPageFound());
    }
  }, []);

  const onBtFirst = useCallback(() => {
    gridRef.current.api.paginationGoToFirstPage();
  }, []);

  const onBtLast = useCallback(() => {
    gridRef.current.api.paginationGoToLastPage();
  }, []);

  const onBtNext = useCallback(() => {
    gridRef.current.api.paginationGoToNextPage();
  }, []);

  const onBtPrevious = useCallback(() => {
    gridRef.current.api.paginationGoToPreviousPage();
  }, []);

  const onBtPageFive = useCallback(() => {
    // we say page 4, as the first page is zero
    gridRef.current.api.paginationGoToPage(4);
  }, []);

  const onBtPageFifty = useCallback(() => {
    // we say page 49, as the first page is zero
    gridRef.current.api.paginationGoToPage(49);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <div>
            <button onClick={onBtFirst}>To First</button>
            <button onClick={onBtLast} id="btLast">
              To Last
            </button>
            <button onClick={onBtPrevious}>To Previous</button>
            <button onClick={onBtNext}>To Next</button>
            <button onClick={onBtPageFive}>To Page 5</button>
            <button onClick={onBtPageFifty}>To Page 50</button>
          </div>

          <div style={{ marginTop: '6px' }}>
            <span className="label">Last Page Found:</span>
            <span className="value" id="lbLastPageFound">
              -
            </span>
            <span className="label">Page Size:</span>
            <span className="value" id="lbPageSize">
              -
            </span>
            <span className="label">Total Pages:</span>
            <span className="value" id="lbTotalPages">
              -
            </span>
            <span className="label">Current Page:</span>
            <span className="value" id="lbCurrentPage">
              -
            </span>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'multiple'}
            paginationPageSize={50}
            pagination={true}
            suppressPaginationPanel={true}
            suppressScrollOnNewData={true}
            onGridReady={onGridReady}
            onPaginationChanged={onPaginationChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};
export default Grid

// render(<GridExample></GridExample>, document.querySelector('#root'));
