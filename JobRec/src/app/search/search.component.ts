import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

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
  toViewJob = {
    id: '',
    title: '',
    team: '',
    manager: '',
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    status: '',
    position: '',
    submission: '',
    description: '',
  };

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  d = new Date().toLocaleString();
  rowData: any[];
  rowData2: any[];
  rowData3: any[];

  columnDefs = [
    {
      headerName: ' ',
      field: 'select',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      resizable: true,
      width: 30,
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: '#',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><button class="btn btn-outline-success" style="width: 100%; border-color: lime; margin: auto; color: white" data-toggle="tooltip" data-placement="auto" title="View Job">${params.value}</button></div>`;
      },
    },
    {
      headerName: 'Job Title',
      field: 'title',
      sortable: true,
      filter: true,
      resizable: true,
      width: 145,
    },
    {
      headerName: 'Team',
      field: 'team',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: '#Pos.',
      field: 'position',
      sortable: true,
      filter: true,
      resizable: true,
      width: 85,
    },
    {
      headerName: '#Subs.',
      field: 'submission',
      sortable: true,
      filter: true,
      resizable: true,
      width: 95,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><button class="btn btn-outline-warning" style="width: 100%; margin: auto; color: white" data-toggle="tooltip" data-placement="auto" title="View Candidates">${params.value}</button></div>`;
      },
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      resizable: true,
      width: 95,
    },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
      resizable: true,
      width: 240,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div class="descriptionCell" style="width: 100%; margin: auto; color: white" data-toggle="tooltip" data-placement="auto" title="View Job Details">${params.value}</div>`;
      },
    },
    {
      headerName: 'Updated At',
      field: 'updatedAt',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Manager',
      field: 'manager',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Created By',
      field: 'createdBy',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
  ];

  columnDefs2 = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 240
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 223
    },
    {
      headerName: 'Resume',
      field: 'resume',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
      },
    },
  ];

  columnDefs3 = [
    {
      headerName: ' ',
      field: 'select',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      resizable: true,
      width: 30,
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 225
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 185
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 201
    },
    {
      headerName: 'Resume',
      field: 'resume',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
      },
    },
  ];


  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {}

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

  sizeGrid(param){
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
  }

  createNewCandidateForm() {
    this.newCandidateForm = this.fb.group(
      {
        id: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
      }
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
        team: ['', Validators.required],
        positions: [null, Validators.required],
        status: ['Active', Validators.required],
        manager: ['', Validators.required],
        createdBy: ['', Validators.required],
        description: ['', Validators.required],
      }
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

  async search() {
    if (this.searchForm.valid && !this.searchForm.value.search.match(/^\s+$/)) {
      let initialData = await [...this.dataService.getData()];
      let queries = this.searchForm.value.search.split(',');
      let results = [];
      for (let query of queries) {
        query = query.toLowerCase().trim();
        if (
          !isNaN(query) &&
          query !== '' &&
          !query.match(/^\s+$/) &&
          query !== null
        ) {
          // Numbers
          for (const job of initialData) {
            let dd = job.id + '';
            if (dd.includes(query)) {
              if (results.indexOf(job) < 0) {
                results.push(job);
              }
            }
          }
        } else if (query !== '' && !query.match(/^\s+$/) && query !== null) {
          if (!isNaN(Date.parse(query))) {
            // Dates
            for (const job of initialData) {
              if (
                job.createdAt.includes(query) ||
                job.updatedAt.includes(query)
              ) {
                if (results.indexOf(job) < 0) {
                  results.push(job);
                }
              }
            }
          } else {
            // String
            // tslint:disable-next-line: max-line-length
            for (const job of initialData) {
              if (
                job.title.toLowerCase().includes(query) ||
                job.team.toLowerCase().includes(query) ||
                job.manager.toLowerCase().includes(query) ||
                job.createdBy.toLowerCase().includes(query) ||
                job.status.toLowerCase().includes(query)
              ) {
                if (results.indexOf(job) < 0) {
                  results.push(job);
                }
              }
            }
          }
        }
      }
      this.rowData = results;
      // console.log(this.rowData);
    } else {
      this.rowData = [...this.dataService.getData()];
    }
  }

  prev;
  editJob() {
    this.editJobMode = true;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length > 1) {
      this.alertify.error(
        'Sorry, you cant edit more than one job each time!, please select one job only!'
      );
    } else if (selectedNodes.length === 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.prev = selectedData[0];
      console.log(selectedData);
      this.newJobForm.patchValue({
        id: selectedData[0].id,
        title: selectedData[0].title,
        team: selectedData[0].team,
        positions: selectedData[0].position,
        status: selectedData[0].status,
        manager: selectedData[0].manager,
        createdBy: selectedData[0].createdBy,
        description: selectedData[0].description,
      });
      $('#newJob').modal('show');
    } else {
      this.alertify.error('Please select a job to edit');
    }
  }

  deleteJob() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.prev = selectedData[0];
      console.log(selectedData);
      for (const job of selectedData) {
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].id === job.id) {
            this.dataService.deleteData(i);
            break;
          }
        }
      }
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
    } else {
      this.alertify.error('Please select jobs to delete');
    }
  }

  newJob() {
    this.editJobMode = false;
    this.newJobForm.reset();
    $('#newJob').modal('show');
  }

  viewCandidates() {
    $('#viewCandidate').modal('show');
    this.gridApi2.sizeColumnsToFit();
  }

  addSubmission() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.selectedJobs = selectedData;
      $('#viewSubs').modal('show');
      this.gridApi3.sizeColumnsToFit();
    } else {
      this.alertify.error('Please select jobs to add submissions');
    }
  }

  onAddSubs() {
    const selectedNodes = this.agGrid3.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.dataService.addSubmissions(this.selectedJobs, selectedData);
      $('#viewSubs').modal('hide');
    } else {
      this.alertify.error('Please select candidates to add submissions');
    }
  }

  onNewCandidate() {
    const newRow = {
      id: this.newCandidateForm.value.id,
      fullName: this.newCandidateForm.value.fullName,
      email: this.newCandidateForm.value.email,
      phone: this.newCandidateForm.value.phone,
      jobs: [],
    };
    this.dataService.addNewCandidate(newRow);
    this.dataService.getCandidateChangedListener().subscribe((res) => {
      this.rowData2 = res;
    });
    this.newCandidateForm.reset();
    $('.modal').modal('hide');
  }

  onNewJob() {
    if (!this.editJobMode) {
      const newd = new Date().toLocaleString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: +this.newJobForm.value.id,
        title: this.newJobForm.value.title,
        team: this.newJobForm.value.team,
        position: this.newJobForm.value.positions,
        submissions: 0,
        status: this.newJobForm.value.status,
        updatedAt: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: newd,
        description: this.newJobForm.value.description,
      };
      // this.rowData.push(newRow);
      // console.log(newRow);
      // console.log(this.rowData);
      this.dataService.addData(newRow);
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
    } else {
      const newd = new Date().toLocaleDateString("en-US");
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: +this.newJobForm.value.id,
        title: this.newJobForm.value.title,
        team: this.newJobForm.value.team,
        position: this.newJobForm.value.positions,
        submissions: this.prev.submissions,
        status: this.newJobForm.value.status,
        updatedAt: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: this.prev.createdAt,
        description: this.newJobForm.value.description,
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

  async onSubClick(id: number){
    let candidates = await [...this.dataService.getCandidates()];
    this.rowData3 = [];
    for (const candidate of candidates) {
      for (const job of candidate.jobs) {
        if (job === id){
          if (this.rowData3.indexOf(candidate) < 0){
            this.rowData3.push(candidate);
          }
          break;
        }
      }
    }
    $('#viewCandidate').modal('show');
    this.gridApi2.sizeColumnsToFit();
  }

  onViewDetails(id: number){
    for (const job of this.rowData) {
      if (id === job.id){
        this.toViewJob.id = job.id;
        this.toViewJob.title = job.title;
        this.toViewJob.team = job.team;
        this.toViewJob.manager = job.manager;
        this.toViewJob.status = job.status;
        this.toViewJob.position = job.position;
        this.toViewJob.submission = job.submission;
        this.toViewJob.createdAt = job.createdAt;
        this.toViewJob.createdBy = job.createdBy;
        this.toViewJob.updatedAt = job.updatedAt;
        this.toViewJob.description = job.description;
        break;
      }
    }
    $('#viewJobDetails').modal('show');
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 500);

    this.agGrid.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'submission'){
        this.onSubClick(res.data.id);
      }
      else if(res.colDef.field === 'description' || res.colDef.field === 'id'){
        this.onViewDetails(res.data.id);
      }
    });
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
  }

  onGridReady3(params): void {
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;

    this.dataService.getCandidateChangedListener().subscribe((data) => {
      this.rowData2 = data;
    });
  }
}
