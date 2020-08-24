import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'app';

  columnDefs = [
    {headerName: 'Select', field: 'select', sortable: true, filter: true, checkboxSelection: true, resizable: true},
    {headerName: 'Make', field: 'make', sortable: true, filter: true,
    editable: true, resizable: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true, resizable: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true, resizable: true}
];
  // rowData = [
  //     { make: 'Toyota', model: 'Celica', price: 35000 },
  //     { make: 'Ford', model: 'Mondeo', price: 32000 },
  //     { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];
  rowData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
