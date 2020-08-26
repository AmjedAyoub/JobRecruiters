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
import { AlertifyService } from '../_services/alertify.service';


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
  @ViewChild('agGrid3') agGrid3: AgGridAngular;
  editJobMode = false;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private gridApi3;
  private gridColumnApi3;
  selectedJobs = [];
  searchForm: FormGroup;
  newJobForm: FormGroup;
  newCandidateForm: FormGroup;
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

  columnDefs3 = [
    {
      headerName: 'Select',
      field: 'select',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      resizable: true,
    },
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

  constructor(private dataService: DataService, private fb: FormBuilder, private alertify: AlertifyService) {}

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
      this.agGrid3.api.setRowData(this.rowData2);
    });
    this.createNewJobForm();
    this.createNewCandidateForm();
  }

  createNewCandidateForm(){
    this.newCandidateForm = this.fb.group(
      {
        id: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      },
      // { validator: this.idCheckValidator2 }
    );
  }

  // idCheckValidator2(form: FormGroup) {
  //   for (let i = 0; i < l; i++) {
  //     if (form.get('id').value === this.rowData2[i].id) {
  //       return { exists: true };
  //     }
  //   }
  //   return null;
  // }

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
      this.alertify.error('Sorry, you cant edit more than one job each time!, please select one job only!');
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
      this.alertify.error('Please select a job to edit');
    }
  }

  newJob(){
    this.editJobMode = false;
    this.newJobForm.reset();
    $('#newJob').modal('show');
  }

  viewCandidates(){
    $('#viewCandidate').modal('show');
    this.gridApi2.sizeColumnsToFit();
  }

  addSubmission() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1){
      const selectedData = selectedNodes.map((node) => node.data);
      this.selectedJobs = selectedData;
      $('#viewSubs').modal('show');
      this.gridApi3.sizeColumnsToFit();
    }else{
      this.alertify.error('Please select jobs to add submissions');
    }
  }

  onAddSubs(){

  }

  onNewCandidate(){
    const newRow = {
      id: this.newCandidateForm.value.id,
      fullName: this.newCandidateForm.value.fullName,
      email: this.newCandidateForm.value.email,
      phone: this.newCandidateForm.value.phone,
      jobs: []
    };
    this.dataService.addNewCandidate(newRow);
    this.dataService.getCandidateChangedListener().subscribe((res) => {
      this.rowData2 = res;
    });
    this.newCandidateForm.reset();
    $('.modal').modal('hide');
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

    this.dataService.getCandidateChangedListener()
      .subscribe(data => {
        this.rowData2 = data;
      });
  }

  onGridReady3(params): void {
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;

    this.dataService.getCandidateChangedListener()
      .subscribe(data => {
        this.rowData2 = data;
      });
  }
}
