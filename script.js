function actionCellRenderer(params) {
  let eGui = document.createElement("div");


  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
        <button  
          class="action-button update"
          data-action="update">
               update  
        </button>
        <button  
          class="action-button cancel"
          data-action="cancel">
               cancel
        </button>
        `;
  } else {
    eGui.innerHTML = `
        <button 
          class="action-button edit"  
          data-action="edit">
             edit 
          </button>
        <button 
          class="action-button delete"
          data-action="delete">
             delete
        </button>
        `;
  }

  return eGui;
}

var gridOptions = {
  suppressClickEdit: true,
  onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  },

  onRowEditingStarted: (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  },
  onRowEditingStopped: (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  },
  editType: "fullRow",
  columnDefs: [
    { field: "Test Case", minWidth: 150 },
    { field: "Element Name", maxWidth: 90 },
    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }
  ],
  defaultColDef: {
    editable: true
  }
};

// Keyboard navigation
// suppressing tabbing away from editing row

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  var myvar = {};

  new agGrid.Grid(gridDiv, gridOptions);

  agGrid
    .simpleHttpRequest({
      url: "https://www.ag-grid.com/example-assets/olympic-winners.json"
    })
    .then(function (data) {

      var dataMap = new Map(Object.entries(data));
      for (const key of dataMap.keys())  {
        console.log(key);
      }
      myvar = data;
      gridOptions.api.setRowData(data.slice(0, 20));
    });
});
