import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  searchForm: FormGroup;

  columnDefs = [
    {
      headerName: 'Select',
      field: 'select',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      resizable: true,
    },
    {
      headerName: 'Job ID',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Job Title',
      field: 'title',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: '# Positions',
      field: 'position',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: '# Submissions',
      field: 'submissions',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Date Updated',
      field: 'dateUpdated',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Manager',
      field: 'manager',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Created By',
      field: 'createdBy',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];

  d = new Date().toLocaleString();
  rowData = [
    // tslint:disable-next-line: max-line-length
    {
      id: '654',
      title: 'Software Developer',
      position: 2,
      submissions: 6,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '548',
      title: 'UI Developer',
      position: 1,
      submissions: 7,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '698',
      title: 'Back-End Developer',
      position: 6,
      submissions: 12,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '235',
      title: 'Software Developer',
      position: 3,
      submissions: 9,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '145',
      title: 'UI Developer',
      position: 5,
      submissions: 10,
      status: 'Inactive',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
  ];
  // rowData: any;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, {validators: [Validators.required]})
    });
  }

  search() {

  }

  addSubmission(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + ' ' + node.model)
      .join(', ');
    if (selectedDataStringPresentation){
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
      }
      else{
        alert(`please select rows`);
      }
  }

  addRow(): void {
    const newd = new Date().toLocaleString();
    // tslint:disable-next-line: max-line-length
    const newRow = {
      id: '654',
      title: 'Software Developer',
      position: 2,
      submissions: 6,
      status: 'Active',
      dateUpdated: newd,
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: newd,
    };
    this.rowData.push(newRow);
    console.log(newRow);
    console.log(this.rowData);
    // this.agGrid.api.setRowData(this.rowData);
    this.agGrid.api.setRowData(this.rowData);
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  }
}
