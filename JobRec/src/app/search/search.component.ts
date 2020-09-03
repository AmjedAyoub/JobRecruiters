import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {
  faPlus,
  faTimes,
  faUserPlus,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import { DataService } from '../_services/data.service';
import { AlertifyService } from '../_services/alertify.service';
import { Subscription } from 'rxjs';
import { DocsService } from '../_services/doc.service';

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
  @ViewChild('agGrid4') agGrid4: AgGridAngular;
  @ViewChild('agGrid5') agGrid5: AgGridAngular;
  editJobMode = false;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private gridApi3;
  private gridColumnApi3;
  private gridApi4;
  private gridColumnApi4;
  private gridApi5;
  private gridColumnApi5;
  selectedJobs = [];
  searchForm: FormGroup;
  newJobForm: FormGroup;
  searchSubsForm: FormGroup;
  d = new Date().toLocaleString();
  rowData: any[];
  rowData2: any[];
  rowData3: any[];
  rowData4: any[];
  rowData5: any[];
  private docsSub: Subscription;
  prev;
  private statusBar;
  rowCount = 0;
  subCount = 0;
  domLayout = window.innerHeight;
  height;
  faPlus = faPlus;
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  faUserCog = faUserCog;

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
    skills: '',
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
      headerName: '',
      field: 'edit',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-warning" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="Edit Job">Edit</button>`;
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
        return `<button class="btn btn-outline-success" style="font: small; height: 29px; font-size: 12px; width: 100%; border-color: lime; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Job">${params.value}</button>`;
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
        return `<button class="btn btn-outline-warning" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Candidates">${params.value}</button>`;
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
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div class="descriptionCell" style="font: small; font-size: 12px; height: 29px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Job Details">${params.value}</div>`;
      },
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
        return `<div class="descriptionCell" style="font: small; font-size: 12px; height: 29px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Job Details">${params.value}</div>`;
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
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
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
          return `<a href="${params.value}" target="_blank" class="btn btn-info" style="font: small;  height: 29px; font-size: 12px; margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="font: small; font-size: 12px; height: 29px; color: darkgrey; margin: auto; text-align: center opacity: 0.4 !important; cursor: default !important; pointer-events: none !important;">Resume</a></div>`;
      },
    },
  ];

  columnDefs3 = [
    {
      headerName: '',
      field: '_id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 110,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-success" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto;" data-toggle="tooltip" data-placement="auto" title="Add for submissions">Select</button>`;
      },
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 170,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 190,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 170,
    },
    {
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
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
          return `<a href="${params.value}" target="_blank" class="btn btn-info" style="font: small; height: 29px; font-size: 12px; margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="font: small; font-size: 12px; height: 29px; color: darkgrey; gray margin: auto; text-align: center opacity: 0.4 !important; cursor: default !important; pointer-events: none !important;">Resume</a></div>`;
      },
    },
  ];

  columnDefs4 = [
    {
      headerName: '',
      field: 'delete',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-danger" style="font: small; height: 29px; font-size: 14px; width: 100%; margin: auto;" data-toggle="tooltip" data-placement="auto" title="Remove"><strong>X</strong></button>`;
      },
    },
    {
      headerName: '#',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
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
  ];

  columnDefs5 = [
    {
      headerName: '',
      field: 'delete',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-danger" style="font: small; height: 29px; font-size: 14px; width: 100%; margin: auto;" data-toggle="tooltip" data-placement="auto" title="Remove"><strong>X</strong></button>`;
      },
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
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
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
          return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="font: small; height: 29px; font-size: 12px; margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="font: small; font-size: 12px; height: 29px; color: darkgrey; gray margin: auto; text-align: center opacity: 0.4 !important; cursor: default !important; pointer-events: none !important;">Resume</a></div>`;
      },
    },
  ];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private docsService: DocsService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.searchSubsForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.rowData = [...this.dataService.getData()];
    this.dataService.getDataChangedListener().subscribe((res) => {
      this.rowData = res;
      this.agGrid.api.setRowData(this.rowData);
      this.agGrid.api.sizeColumnsToFit();
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
        skills: ['', Validators.required],
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

  searchSubs() {}

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
                results.unshift(job);
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
                  results.unshift(job);
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
                  results.unshift(job);
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

  editJob(job: any) {
    this.editJobMode = true;
    this.prev = job;
    this.newJobForm.patchValue({
      id: job.id,
      title: job.title,
      team: job.team,
      positions: job.position,
      status: job.status,
      manager: job.manager,
      createdBy: job.createdBy,
      skills: job.skills,
      description: job.description,
    });
    $('#newJob').modal('show');
  }

  async deleteJob() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      this.alertify.confirm(
        'Are you sure you want to delete job(s)?',
        async () => {
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
                candidate.skills,
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
        }
      );
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
      this.rowData4 = [];
      this.rowData5 = [];
      const selectedData = selectedNodes.map((node) => node.data);
      this.selectedJobs = selectedData;
      this.rowData4 = selectedData;
      this.gridApi3.sizeColumnsToFit();
      this.agGrid4.api.setRowData(this.rowData4);
      this.gridApi4.sizeColumnsToFit();
      this.agGrid5.api.setRowData(this.rowData5);
      this.gridApi5.sizeColumnsToFit();
      $('#viewSubs').modal('show');
    } else {
      this.alertify.error('Please select jobs to add submissions');
    }
  }

  async onAddSubs() {
    if (this.rowData4.length >= 1 && this.rowData5.length >= 1) {
      for (const candidate of this.rowData5) {
        for (const job of this.rowData4) {
          if (candidate.jobs.indexOf(job.id) < 0) {
            if (candidate.jobs.length === 0) {
              candidate.jobs[0] = job.id;
            } else {
              candidate.jobs.unshift(job.id);
            }
          }
        }
        await this.docsService
          .updateDoc(
            candidate._id,
            candidate.fullName,
            candidate.email,
            candidate.phone,
            candidate.skills,
            candidate.jobs,
            candidate.url
          )
          .subscribe(() => {
            this.search();
            this.dataService.getAllData();
          });
      }
      await this.dataService.addSubmissions();
      this.rowData = [...this.dataService.getData()];
      setTimeout(() => {
        if (
          this.searchForm.valid &&
          !this.searchForm.value.search.match(/^\s+$/)
        ) {
          this.rowData = [...this.dataService.getData()];
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
        skills: this.newJobForm.value.skills,
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
        skills: this.prev.skills,
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

  onSubClick(job: any) {
    this.prev = job;
    this.rowData3 = [];
    for (const candidate of this.rowData2) {
      for (const candidateJob of candidate.jobs) {
        if (candidateJob === job.id) {
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

  onViewDetails(job: any) {
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
    this.toViewJob.skills = job.skills;
    this.toViewJob.description = job.description;
    $('#viewJobDetails').modal('show');
  }

  getTableHeight() {
    if (window.innerWidth < 490) {
      return {
        height: window.innerHeight - 224 + 'px',
      };
    } else if (window.innerWidth >= 490 && window.innerWidth < 993) {
      return {
        height: window.innerHeight - 186 + 'px',
      };
    } else if (window.innerWidth >= 993 && window.innerWidth < 1297) {
      return {
        height: window.innerHeight - 170 + 'px',
      };
    } else if (window.innerWidth >= 1297) {
      return {
        height: window.innerHeight - 170 + 'px',
      };
    }
  }

  getHeight() {
    if (window.innerWidth < 993) {
      return {
        'margin-top': window.innerHeight - 221 + 'px',
      };
    } else if (window.innerWidth >= 993 && window.innerWidth < 1297) {
      return {
        'margin-top': window.innerHeight - 205 + 'px',
      };
    } else if (window.innerWidth >= 1297) {
      return {
        'margin-top': window.innerHeight - 205 + 'px',
      };
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        this.getTableHeight();
      });
    });

    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 500);

    this.agGrid.heightScaleChanged.subscribe(() => this.getTableHeight());
    this.agGrid.bodyHeightChanged.subscribe(() => this.getTableHeight());

    this.agGrid.selectionChanged.subscribe(() => {
      this.rowCount = this.agGrid.api.getSelectedRows().length;
    });
    this.agGrid.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'submission') {
        this.onSubClick(res.data);
      } else if (
        res.colDef.field === 'description' ||
        res.colDef.field === 'id' ||
        res.colDef.field === 'skills'
      ) {
        this.onViewDetails(res.data);
      } else if (res.colDef.field === 'edit') {
        this.editJob(res.data);
      }
    });
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;

    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        this.getTableHeight();
      });
    });
  }

  async onGridReady3(params) {
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        this.getTableHeight();
      });
    });
    this.docsService.getDocs();
    this.docsSub = await this.docsService
      .getDocsUpdateListener()
      .subscribe((res) => {
        this.rowData2 = res.docs;
      });
    this.agGrid3.selectionChanged.subscribe(() => {
      this.subCount = this.rowData5.length;
    });
    this.agGrid3.cellClicked.subscribe((res) => {
      if (res.colDef.field === '_id') {
        console.log(res.data);
        this.rowData5.unshift(res.data);
        this.agGrid5.api.setRowData(this.rowData5);
        this.gridApi5.sizeColumnsToFit();
        for (let i = 0; i < this.rowData2.length; i++) {
          if (this.rowData2[i]._id === res.data._id) {
            this.rowData2.splice(i, 1);
            this.agGrid3.api.setRowData(this.rowData2);
            this.gridApi3.sizeColumnsToFit();
          }
        }
      }
    });
  }

  onGridReady4(params): void {
    this.gridApi4 = params.api;
    this.gridColumnApi4 = params.columnApi;
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        this.getTableHeight();
      });
    });
    this.agGrid4.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'delete') {
        this.alertify.confirm(
          'Are you sure you want to remove this job from submissions?',
          () => {
            for (let i = 0; i < this.rowData4.length; i++) {
              if (this.rowData4[i].id === res.data.id) {
                this.rowData4.splice(i, 1);
                this.agGrid4.api.setRowData(this.rowData4);
                this.gridApi4.sizeColumnsToFit();
              }
            }
          }
        );
      }
    });
  }

  onGridReady5(params): void {
    this.gridApi5 = params.api;
    this.gridColumnApi5 = params.columnApi;
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
        this.getTableHeight();
      });
    });
    this.agGrid5.selectionChanged.subscribe(() => {
      this.subCount = this.rowData5.length;
    });
    this.agGrid5.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'delete') {
        this.rowData2.unshift(res.data);
        this.agGrid3.api.setRowData(this.rowData2);
        this.gridApi3.sizeColumnsToFit();
        for (let i = 0; i < this.rowData5.length; i++) {
          if (this.rowData5[i]._id === res.data._id) {
            this.rowData5.splice(i, 1);
            this.agGrid5.api.setRowData(this.rowData5);
            this.gridApi5.sizeColumnsToFit();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.docsSub.unsubscribe();
  }
}
