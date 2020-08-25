import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';

import { DataService } from '../_services/data.service';


declare var $: any;
var l = 0;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  editJobMode = false;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  searchForm: FormGroup;
  newJobForm: FormGroup;
  private len = 0;

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

  columnDefs2 = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
    }
  ];

  d = new Date().toLocaleString();
  rowData: any[];
  rowData2: any[];
  // rowData: any;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.rowData = [...this.dataService.getData()];
    l = this.rowData.length;
    this.dataService.getDataChangedListener().subscribe((res) => {
      this.rowData = res;
      l = this.rowData.length;
      this.agGrid.api.setRowData(this.rowData);
    });
    this.rowData2 = [...this.dataService.getCandidates()];
    this.dataService.getCandidateChangedListener().subscribe((res) => {
      this.rowData2 = res;
      this.agGrid2.api.setRowData(this.rowData2);
    });
    this.createNewJobForm();
  }

  createNewJobForm() {
    this.newJobForm = this.fb.group(
      {
        id: ['', Validators.required],
        title: ['', Validators.required],
        positions: [null, Validators.required],
        status: ['Active', Validators.required],
        manager: ['', Validators.required],
        createdBy: ['', Validators.required],
      },
      // { validator: this.idCheckValidator }
    );
  }

  // idCheckValidator(form: FormGroup) {
  //   for (let i = 0; i < l; i++) {
  //     if (form.get('id').value === this.rowData[i].id) {
  //       return { exists: true };
  //     }
  //   }
  //   return null;
  // }

  search() {}

  prev;
  editJob() {
    this.editJobMode = true;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if(selectedNodes.length > 1){
      console.log('Sorry, you cant egit more than one job each time!, please select one job only!');
    }else if (selectedNodes.length === 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.prev = selectedData[0];
      console.log(selectedData);
      this.newJobForm.patchValue({
        id: selectedData[0].id,
        title: selectedData[0].title,
        positions: selectedData[0].position,
        status: selectedData[0].status,
        manager: selectedData[0].manager,
        createdBy: selectedData[0].createdBy
      });
      $('#newJob').modal('show');
    }else{
      console.log('Please select a job to edit');
    }
  }

  newJob(){
    this.editJobMode = false;
    this.newJobForm.reset();
    $('#newJob').modal('show');
  }

  addSubmission() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + ' ' + node.model)
      .join(', ');
    if (selectedDataStringPresentation) {
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    } else {
      alert(`please select rows`);
    }
  }
  onNewJob() {
    if (!this.editJobMode){
      const newd = new Date().toLocaleString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: this.newJobForm.value.id,
        title: this.newJobForm.value.title,
        position: this.newJobForm.value.positions,
        submissions: 0,
        status: this.newJobForm.value.status,
        dateUpdated: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: newd,
      };
      // this.rowData.push(newRow);
      // console.log(newRow);
      // console.log(this.rowData);
      this.dataService.addData(newRow);
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
    }
    else{
      const newd = new Date().toLocaleString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: this.newJobForm.value.id,
        title: this.newJobForm.value.title,
        position: this.newJobForm.value.positions,
        submissions: this.prev.submissions,
        status: this.newJobForm.value.status,
        dateUpdated: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: this.prev.createdAt
      };
      this.dataService.updateData(this.prev.id, newRow);
      this.rowData = this.dataService.getData();
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
    }
    this.newJobForm.reset();
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowData);
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

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;

    params.api.sizeColumnsToFit();
    document.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  }
}
