import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import {
  faPlus,
  faTimes,
  faUserPlus,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import { DataService } from '../_services/data.service';
import { AlertifyService } from '../_services/alertify.service';
import { DocsService } from '../_services/doc.service';
import { environment } from '../../environments/environment';

declare var $: any;

const BACKEND_URL = environment.apiUrl + '/candidates';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;
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
  newCandidateForm: FormGroup;
  uploadImgForm: FormGroup;
  searchSubsForm: FormGroup;
  d = new Date().toLocaleString();
  rowData: any[];
  rowData2: any[];
  rowData3: any[];
  rowData4: any[];
  rowData5: any[];
  prev;
  fileToUpload: File = null;
  docs: any[];
  private docsSub: Subscription;
  candidateCount = 0;
  rowCount = 0;
  domLayout = window.innerHeight;
  height;
  faPlus = faPlus;
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  faUserCog = faUserCog;

  toViewCandidate = {
    _id: '',
    fullName: '',
    email: '',
    phone: '',
    url: '',
    skills: [],
    jobs: [],
  };

  toViewCandiateJobs = [];

  columnDefs = [
    {
      headerName: '#',
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 70,
    },
    {
      headerName: 'Job Title',
      field: 'title',
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: 'Team',
      field: 'team',
      sortable: true,
      filter: true,
      resizable: true,
      width: 110,
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
      headerName: '#Subs',
      field: 'submission',
      sortable: true,
      filter: true,
      resizable: true,
      width: 85,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
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
      headerName: '',
      field: 'id',
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
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
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
      headerName: '',
      field: 'edit',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-warning" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="Edit Candidate">Edit</button>`;
      },
    },
    {
      headerName: 'ID',
      field: '_id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
      cellRenderer: () => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-success" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto;" data-toggle="tooltip" data-placement="auto" title="View Candidate Details">View</button>`;
      },
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 300,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-warning" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Jobs">${
          params.value?.length - 1 || 0
        }</button>`;
      },
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

  ngOnInit() {
    this.docsService.getDocs().subscribe((res) => {
      this.rowData2 = res.docs;
    });
    this.docsSub = this.docsService.getDocsUpdateListener().subscribe((res) => {
      this.rowData2 = res.docs;
    });
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.uploadImgForm = new FormGroup({
      image: new FormControl(null),
    });
    this.searchSubsForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.createNewCandidateForm();
  }

  createNewCandidateForm() {
    this.newCandidateForm = this.fb.group({
      fullName: ['', Validators.required],
      _id: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      skills: ['', Validators.required],
      resume: [null],
    });
  }

  sizeGrid(param) {
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
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

  addSubmission() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      this.rowData4 = [];
      this.rowData5 = [];
      const selectedData = selectedNodes.map((node) => node.data);
      this.rowData = [...this.dataService.getData()];
      this.agGrid3.api.setRowData(this.rowData);
      this.gridApi3.sizeColumnsToFit();
      this.selectedJobs = selectedData;
      this.rowData5 = selectedData;
      this.gridApi5.sizeColumnsToFit();
      this.agGrid5.api.setRowData(this.rowData5);
      this.gridApi5.sizeColumnsToFit();
      this.agGrid4.api.setRowData(this.rowData4);
      this.gridApi4.sizeColumnsToFit();
      $('#viewSubs').modal('show');
    } else {
      this.alertify.error('Please select candiates to add submissions');
    }
  }

  async onAddSubs() {
    if (this.rowData5.length <= 0) {
      this.alertify.error('Please add candidates!');
    } else if (this.rowData4.length <= 0) {
      this.alertify.error('Please add jobs!');
    } else {
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
      this.rowCount = 0;
      $('#viewSubs').modal('hide');
    }
  }

  autoMatch() {
    if (this.rowData5.length >= 1) {
      let skills = [];
      let oldInitialData;
      let oldResults = [];
      let results = [];
      for (const can of this.rowData5) {
        for (const skill of can.skills) {
          if (skills.indexOf(skill) < 0) {
            skills.push(skill);
          }
        }
      }
      oldInitialData = [...this.dataService.getData()];
      for (let query of skills) {
        query = query.toLowerCase().trim();
        for (const job of oldInitialData) {
          for (let skill of job.skills) {
            skill = skill.toLowerCase().trim();
            if (skill.includes(query)) {
              if (oldResults.indexOf(job) < 0) {
                if (results.length === 0) {
                  results[0] = { ...job, priority: 1 };
                  oldResults[0] = job;
                } else {
                  results.unshift({ ...job, priority: 1 });
                  oldResults.unshift(job);
                }
              } else {
                const newP =
                  results[oldResults.indexOf(job)].priority + 1;
                results[oldResults.indexOf(job)] = {
                  ...job,
                  priority: newP,
                };
              }
            }
          }
        }
      }
      if (results.length > 0) {
        results.sort((a, b) => b.priority - a.priority);
        if (this.rowData4.length === 0) {
          this.rowData = results;
        } else {
          for (let job of this.rowData4) {
            for (let i = 0; i < results.length; i++) {
              if (job.id === results[i].id) {
                results.splice(i, 1);
                break;
              }
            }
          }
          this.rowData = results;
        }
      } else {
        this.alertify.error('No matches found!');
      }
    } else {
      this.alertify.error(
        'Please go back and select candidates for auto match!'
      );
    }
  }

  async searchSubs() {
    if (
      this.searchSubsForm.valid &&
      !this.searchSubsForm.value.search.match(/^\s+$/)
    ) {
      let oldInitialData = await [...this.dataService.getData()];
      let queries = this.searchSubsForm.value.search.split(',');
      let oldResults = [];
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
          for (const job of oldInitialData) {
            let dd = job.id + '';
            if (dd.includes(query)) {
              if (oldResults.indexOf(job) < 0) {
                if (results.length === 0) {
                  results[0] = { ...job, priority: 1 };
                  oldResults[0] = job;
                } else {
                  results.unshift({ ...job, priority: 1 });
                  oldResults.unshift(job);
                }
              } else {
                const newP = results[oldResults.indexOf(job)].priority + 1;
                results[oldResults.indexOf(job)] = {
                  ...job,
                  priority: newP,
                };
              }
            }
          }
        } else if (query !== '' && !query.match(/^\s+$/) && query !== null) {
          if (!isNaN(Date.parse(query))) {
            // Dates
            for (const job of oldInitialData) {
              if (
                job.createdAt.includes(query) ||
                job.updatedAt.includes(query)
              ) {
                if (oldResults.indexOf(job) < 0) {
                  if (results.length === 0) {
                    results[0] = { ...job, priority: 1 };
                    oldResults[0] = job;
                  } else {
                    results.unshift({ ...job, priority: 1 });
                    oldResults.unshift(job);
                  }
                } else {
                  const newP = results[oldResults.indexOf(job)].priority + 1;
                  results[oldResults.indexOf(job)] = {
                    ...job,
                    priority: newP,
                  };
                }
              }
            }
          } else {
            // String
            // tslint:disable-next-line: max-line-length
            for (const job of oldInitialData) {
              if (
                job.title.toLowerCase().includes(query) ||
                job.team.toLowerCase().includes(query) ||
                job.manager.toLowerCase().includes(query) ||
                job.createdBy.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.status.toLowerCase().includes(query)
              ) {
                if (oldResults.indexOf(job) < 0) {
                  if (results.length === 0) {
                    results[0] = { ...job, priority: 1 };
                    oldResults[0] = job;
                  } else {
                    results.unshift({ ...job, priority: 1 });
                    oldResults.unshift(job);
                  }
                } else {
                  const newP = results[oldResults.indexOf(job)].priority + 1;
                  results[oldResults.indexOf(job)] = {
                    ...job,
                    priority: newP,
                  };
                }
              }
              for (let skill of job.skills) {
                skill = skill.toLowerCase().trim();
                if (skill.includes(query)) {
                  if (oldResults.indexOf(job) < 0) {
                    if (results.length === 0) {
                      results[0] = { ...job, priority: 1 };
                      oldResults[0] = job;
                    } else {
                      results.unshift({ ...job, priority: 1 });
                      oldResults.unshift(job);
                    }
                  } else {
                    const newP = results[oldResults.indexOf(job)].priority + 1;
                    results[oldResults.indexOf(job)] = {
                      ...job,
                      priority: newP,
                    };
                  }
                }
              }
            }
          }
        }
      }
      if (results.length > 0) {
        results.sort((a, b) => b.priority - a.priority);
        if (this.rowData4.length === 0) {
          this.rowData = results;
        } else {
          for (let job of this.rowData4) {
            for (let i = 0; i < results.length; i++) {
              if (job.id === results[i].id) {
                results.splice(i, 1);
                break;
              }
            }
          }
          this.rowData = results;
        }
      } else {
        if (this.rowData4.length === 0) {
          this.rowData = [...this.dataService.getData()];
        } else {
          let newData = [...this.dataService.getData()];
          for (let job of this.rowData4) {
            for (let i = 0; i < newData.length; i++) {
              if (job.id === newData[i].id) {
                newData.splice(i, 1);
                break;
              }
            }
          }
          this.rowData = newData;
        }
      }
    } else {
      if (this.rowData4.length === 0) {
        this.rowData = [...this.dataService.getData()];
      } else {
        let newData = [...this.dataService.getData()];
        for (let job of this.rowData4) {
          for (let i = 0; i < newData.length; i++) {
            if (job.id === newData[i].id) {
              newData.splice(i, 1);
              break;
            }
          }
        }
        this.rowData = newData;
      }
    }
  }

  async search() {
    if (this.searchForm.valid && !this.searchForm.value.search.match(/^\s+$/)) {
      let oldInitialData;
      let queries = this.searchForm.value.search.split(',');
      let oldResults = [];
      let results = [];
      this.docsService.getDocs().subscribe((res) => {
        oldInitialData = res.docs;
        for (let query of queries) {
          query = query.toLowerCase().trim();
          if (
            !isNaN(query) &&
            query !== '' &&
            !query.match(/^\s+$/) &&
            query !== null
          ) {
            // Numbers
            for (const candidate of oldInitialData) {
              if (
                candidate._id.includes(query) ||
                candidate.phone.includes(query)
              ) {
                if (oldResults.indexOf(candidate) < 0) {
                  if (results.length === 0) {
                    results[0] = { ...candidate, priority: 1 };
                    oldResults[0] = candidate;
                  } else {
                    results.unshift({ ...candidate, priority: 1 });
                    oldResults.unshift(candidate);
                  }
                } else {
                  const newP =
                    results[oldResults.indexOf(candidate)].priority + 1;
                  results[oldResults.indexOf(candidate)] = {
                    ...candidate,
                    priority: newP,
                  };
                }
              }
              for (let job of candidate.jobs) {
                job = job + '';
                if (job.includes(query)) {
                  if (results.indexOf(candidate) < 0) {
                    if (results.length === 0) {
                      results[0] = { ...candidate, priority: 1 };
                      oldResults[0] = candidate;
                    } else {
                      results.unshift({ ...candidate, priority: 1 });
                      oldResults.unshift(candidate);
                    }
                    break;
                  } else {
                    const newP =
                      results[oldResults.indexOf(candidate)].priority + 1;
                    results[oldResults.indexOf(candidate)] = {
                      ...candidate,
                      priority: newP,
                    };
                    break;
                  }
                }
              }
            }
          } else if (query !== '' && !query.match(/^\s+$/) && query !== null) {
            if (!isNaN(Date.parse(query))) {
              // Dates
            } else {
              // String
              // tslint:disable-next-line: max-line-length
              for (const candidate of oldInitialData) {
                if (
                  candidate.fullName.toLowerCase().includes(query) ||
                  candidate.email.toLowerCase().includes(query) ||
                  candidate.phone.toLowerCase().includes(query) ||
                  candidate._id.toLowerCase().includes(query)
                ) {
                  if (oldResults.indexOf(candidate) < 0) {
                    if (results.length === 0) {
                      results[0] = { ...candidate, priority: 1 };
                      oldResults[0] = candidate;
                    } else {
                      results.unshift({ ...candidate, priority: 1 });
                      oldResults.unshift(candidate);
                    }
                  } else {
                    const newP =
                      results[oldResults.indexOf(candidate)].priority + 1;
                    results[oldResults.indexOf(candidate)] = {
                      ...candidate,
                      priority: newP,
                    };
                  }
                }
                for (let skill of candidate.skills) {
                  skill = skill.toLowerCase().trim();
                  if (skill.includes(query)) {
                    if (oldResults.indexOf(candidate) < 0) {
                      if (results.length === 0) {
                        results[0] = { ...candidate, priority: 1 };
                        oldResults[0] = candidate;
                      } else {
                        results.unshift({ ...candidate, priority: 1 });
                        oldResults.unshift(candidate);
                      }
                    } else {
                      const newP =
                        results[oldResults.indexOf(candidate)].priority + 1;
                      results[oldResults.indexOf(candidate)] = {
                        ...candidate,
                        priority: newP,
                      };
                    }
                  }
                }
              }
            }
          }
        }
        if (results.length > 0) {
          results.sort((a, b) => b.priority - a.priority);
          this.rowData2 = results;
        } else {
          this.docsService.getDocs().subscribe((res) => {
            this.rowData2 = res.docs;
          });
        }
      });
    } else {
      this.docsService.getDocs().subscribe((res) => {
        this.rowData2 = res.docs;
      });
    }
  }

  editCandidate(candidate: any) {
    this.editJobMode = true;
    this.prev = candidate;
    this.newCandidateForm.patchValue({
      _id: candidate._id,
      fullName: candidate.fullName,
      email: candidate.email,
      phone: candidate.phone,
      skills: candidate.skills,
      jobs: [],
      resume: candidate.url,
    });
    $('#newCandidate').modal('show');
  }

  newCandidate() {
    this.editJobMode = false;
    this.newCandidateForm.reset();
    $('#newCandidate').modal('show');
  }

  onNewCandidate() {
    if (!this.editJobMode) {
      this.newCandidateForm.value.skills += '';
      let newSkills = this.newCandidateForm.value.skills.split(',');
      for (let newSkill of newSkills) {
        newSkill = newSkill.trim();
      }
      // tslint:disable-next-line: max-line-length
      if (this.uploadImgForm.value.image !== null) {
        this.docsService
          .addDoc(
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            newSkills,
            [],
            this.uploadImgForm.value.image
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been added successfully');
            this.docsService.getDocs().subscribe((response) => {
              this.rowData2 = response.docs;
            });
            this.search();
          });
      } else {
        this.docsService
          .addDoc(
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            newSkills,
            [],
            'null'
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been added successfully');
            this.docsService.getDocs().subscribe((response) => {
              this.rowData2 = response.docs;
            });
            this.search();
          });
      }
    } else {
      this.newCandidateForm.value.skills += '';
      let newSkills = this.newCandidateForm.value.skills.split(',');
      for (let newSkill of newSkills) {
        newSkill = newSkill.trim();
      }
      // tslint:disable-next-line: max-line-length
      if (this.uploadImgForm.value.image !== null) {
        this.docsService
          .updateDoc(
            this.newCandidateForm.value._id,
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            newSkills,
            this.prev.jobs,
            this.uploadImgForm.value.image
          )
          .subscribe(
            (res) => {
              this.alertify.success('Candidate has been updated successfully');
              this.docsService.getDocs().subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this.docsService
          .updateDoc(
            this.newCandidateForm.value._id,
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            newSkills,
            this.prev.jobs,
            this.prev.url
          )
          .subscribe(
            (res) => {
              this.alertify.success('Candidate has been updated successfully');
              this.docsService.getDocs().subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            },
            (err) => {
              console.log(err);
            }
          );
      }
    }
    this.newCandidateForm.reset();
    this.rowCount = 0;
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowData);
  }

  deleteCandidate() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      this.alertify.confirm(
        'Are you sure you want to delete candidate(s)?',
        async () => {
          const selectedData = selectedNodes.map((node) => node.data);
          for (const candidate of selectedData) {
            this.docsService.deleteDoc(candidate._id).subscribe((res) => {
              this.alertify.success('Candidate has been deleted successfully');
              this.rowCount = 0;
              this.docsService.getDocs().subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            });
          }
        }
      );
    } else {
      this.alertify.error('Please select candidates to delete');
    }
  }

  async onJobsClick(candidate: any) {
    this.prev = candidate;
    this.docsService.getDocs().subscribe((response) => {
      this.rowData2 = response.docs;
    });
    let jobs = await [...this.dataService.getData()];
    this.rowData3 = [];
    for (const job of candidate.jobs) {
      for (const resJob of jobs) {
        if (job === resJob.id) {
          if (this.rowData3.indexOf(resJob) < 0) {
            this.rowData3.push(resJob);
          }
          break;
        }
      }
    }
    $('#viewJobs').modal('show');
    this.gridApi2.sizeColumnsToFit();
    this.search();
  }

  async onViewDetails(candidate: any) {
    this.toViewCandidate._id = candidate._id;
    this.toViewCandidate.fullName = candidate.fullName;
    this.toViewCandidate.email = candidate.email;
    this.toViewCandidate.phone = candidate.phone;
    this.toViewCandidate.url = candidate.url;
    this.toViewCandidate.skills = candidate.skills;
    this.toViewCandidate.jobs = candidate.jobs;
    let data = await [...this.dataService.getData()];
    this.toViewCandiateJobs = [];
    for (const job of candidate.jobs) {
      for (const toAddJob of data) {
        if (job === toAddJob.id) {
          const newJob = {
            id: toAddJob.id,
            title: toAddJob.title,
            team: toAddJob.team,
            manager: toAddJob.manager,
            createdAt: toAddJob.createdAt,
            updatedAt: toAddJob.updatedAt,
            createdBy: toAddJob.createdBy,
            status: toAddJob.status,
          };
          this.toViewCandiateJobs.unshift(newJob);
        }
      }
    }
    $('#viewCandidateDetails').modal('show');
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

    this.agGrid.heightScaleChanged.subscribe(() => this.getTableHeight());
    this.agGrid.bodyHeightChanged.subscribe(() => this.getTableHeight());

    params.api.sizeColumnsToFit();

    this.agGrid.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'jobs') {
        this.onJobsClick(res.data);
      } else if (res.colDef.field === '_id') {
        this.onViewDetails(res.data);
      } else if (res.colDef.field === 'edit') {
        this.editCandidate(res.data);
      }
    });
    this.agGrid.selectionChanged.subscribe(() => {
      this.rowCount = this.agGrid.api.getSelectedRows().length;
    });
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
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
    this.agGrid3.selectionChanged.subscribe(() => {
      this.candidateCount = this.rowData4.length;
    });
    this.agGrid3.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'id') {
        this.rowData4.unshift(res.data);
        this.agGrid4.api.setRowData(this.rowData4);
        this.gridApi4.sizeColumnsToFit();
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].id === res.data.id) {
            this.rowData.splice(i, 1);
            this.agGrid3.api.setRowData(this.rowData);
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
    this.agGrid4.selectionChanged.subscribe(() => {
      this.candidateCount = this.rowData4.length;
    });
    this.agGrid4.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'delete') {
        this.rowData.unshift(res.data);
        this.agGrid3.api.setRowData(this.rowData);
        this.gridApi3.sizeColumnsToFit();
        for (let i = 0; i < this.rowData4.length; i++) {
          if (this.rowData4[i].id === res.data.id) {
            this.rowData4.splice(i, 1);
            this.agGrid4.api.setRowData(this.rowData4);
            this.gridApi4.sizeColumnsToFit();
          }
        }
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
    this.agGrid5.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'delete') {
        this.alertify.confirm(
          'Are you sure you want to remove this candidate from submissions?',
          () => {
            for (let i = 0; i < this.rowData5.length; i++) {
              if (this.rowData5[i]._id === res.data._id) {
                this.rowData5.splice(i, 1);
                this.agGrid5.api.setRowData(this.rowData5);
                this.gridApi5.sizeColumnsToFit();
              }
            }
          }
        );
      }
    });
  }

  onResumePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadImgForm.patchValue({ image: file });
    this.uploadImgForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.docsSub.unsubscribe();
  }
}
