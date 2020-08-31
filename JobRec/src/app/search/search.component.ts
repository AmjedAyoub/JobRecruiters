import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import { DataService } from '../_services/data.service';
import { AlertifyService } from '../_services/alertify.service';
import { Subscription } from 'rxjs';
import { DocsService } from '../_services/doc.service';
import { async } from 'rxjs/internal/scheduler/async';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
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
  d = new Date().toLocaleString();
  rowData: any[];
  rowData2: any[];
  rowData3: any[];
  private docsSub: Subscription;
  prev;
  private statusBar;
  rowCount = 0;
  subCount = 0;

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

  columnDefs = [
    {
      headerName: ' ',
      field: 'select',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      resizable: true,
      width: 30,
      headerCheckboxSelection: function (params) {
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
      field: '_id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 240,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190,
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 223,
    },
    {
      headerName: 'Resume',
      field: 'url',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        if (params.value !== 'null') {
          return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="margin: auto; text-align: center">Resume</a></div>`;
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
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: 'ID',
      field: '_id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 225,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 185,
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 201,
    },
    {
      headerName: 'Resume',
      field: 'url',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        if (params.value !== 'null') {
          return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="margin: auto; text-align: center">Resume</a></div>`;
      },
    },
  ];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private docsService: DocsService
  ) {}

  showCount() {
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: this.rowCount,
          align: 'left',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.rowData = [...this.dataService.getData()];
    this.dataService.getDataChangedListener().subscribe((res) => {
      this.rowData = res;
      this.agGrid.api.setRowData(this.rowData);
    });
    this.docsService.getDocs();
    this.docsSub = this.docsService.getDocsUpdateListener().subscribe((res) => {
      this.rowData2 = res.docs;
      this.agGrid3.api.setRowData(this.rowData2);
    });
    this.createNewJobForm();
  }

  sizeGrid(param) {
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
  }

  createNewJobForm() {
    this.newJobForm = this.fb.group(
      {
        id: [null, Validators.required],
        title: ['', Validators.required],
        team: ['', Validators.required],
        positions: [null, Validators.required],
        status: ['Active', Validators.required],
        manager: ['', Validators.required],
        createdBy: ['', Validators.required],
        description: ['', Validators.required],
      }
      // { asyncValidators: this.idCheckValidator }
    );
  }

  // idCheckValidator(form: FormGroup) {
  //   for (let i = 0; i < this.rowData.length; i++) {
  //     if (+form.get('id').value === this.rowData[i].id) {
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
    } else {
      this.rowData = [...this.dataService.getData()];
    }
  }

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

  async deleteJob() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      this.alertify.confirm('Are you sure you want to delete job(s)?', async () => {
        const selectedData = selectedNodes.map((node) => node.data);
        for (const candidate of this.rowData2) {
          for (const job of selectedData) {
            for (let i = 0; i < candidate.jobs.length; i++) {
              if (job.id === candidate.jobs[i]) {
                candidate.jobs.splice(i, 1);
                break;
              }
            }
          }
          await this.docsService
            .updateDoc(
              candidate._id,
              candidate.fullName,
              candidate.email,
              candidate.phone,
              candidate.jobs,
              candidate.url
            )
            .subscribe(() => {
              this.search();
            });
        }
        await this.dataService.deleteData(selectedNodes);
        await this.dataService.getDataChangedListener().subscribe((res) => {
          this.rowData = res;
        });
        setTimeout(() => {
          if (
            this.searchForm.valid &&
            !this.searchForm.value.search.match(/^\s+$/)
          ) {
            this.search();
          }
        }, 500);
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

  async onAddSubs() {
    const selectedNodes = this.agGrid3.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      for (const candidate of selectedData) {
        for (const job of this.selectedJobs) {
          if (candidate.jobs.indexOf(job.id) < 0) {
            candidate.jobs.unshift(job.id);
          }
        }
        await this.docsService
          .updateDoc(
            candidate._id,
            candidate.fullName,
            candidate.email,
            candidate.phone,
            candidate.jobs,
            candidate.url
          )
          .subscribe(() => {
            this.search();
          });
      }
      this.dataService.addSubmissions();
      await this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
      setTimeout(() => {
        if (
          this.searchForm.valid &&
          !this.searchForm.value.search.match(/^\s+$/)
        ) {
          this.search();
        }
      }, 400);
      $('#viewSubs').modal('hide');
    } else {
      this.alertify.error('Please select candidates to add submissions');
    }
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
      this.dataService.addData(newRow);
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData = res;
      });
      if (
        this.searchForm.valid &&
        !this.searchForm.value.search.match(/^\s+$/)
      ) {
        this.search();
      }
    } else {
      const newd = new Date().toLocaleDateString('en-US');
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
      if (
        this.searchForm.valid &&
        !this.searchForm.value.search.match(/^\s+$/)
      ) {
        this.search();
      }
    }
    this.newJobForm.reset();
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowData);
  }

  onSubClick(id: number) {
    this.rowData3 = [];
    for (const candidate of this.rowData2) {
      for (const job of candidate.jobs) {
        if (job === id) {
          if (this.rowData3.indexOf(candidate) < 0) {
            this.rowData3.push(candidate);
          }
          break;
        }
      }
    }
    $('#viewCandidate').modal('show');
    this.agGrid2.api.setRowData(this.rowData3);
    this.gridApi2.sizeColumnsToFit();
    this.search();
  }

  onViewDetails(id: number) {
    for (const job of this.rowData) {
      if (id === job.id) {
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
    this.agGrid.selectionChanged.subscribe(() => {
      this.rowCount = this.agGrid.api.getSelectedRows().length;
    });
    this.agGrid.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'submission') {
        this.onSubClick(res.data.id);
      } else if (
        res.colDef.field === 'description' ||
        res.colDef.field === 'id'
      ) {
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

  async onGridReady3(params) {
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;
    this.docsService.getDocs();
    this.docsSub = await this.docsService
      .getDocsUpdateListener()
      .subscribe((res) => {
        this.rowData2 = res.docs;
      });
    this.agGrid3.selectionChanged.subscribe(() => {
      this.subCount = this.agGrid3.api.getSelectedRows().length;
    });
  }

  ngOnDestroy() {
    this.docsSub.unsubscribe();
  }
}
