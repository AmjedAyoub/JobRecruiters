import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Subject } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import {
  faPlus,
  faTimes,
  faUserPlus,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { PageSizeItem } from '@progress/kendo-angular-grid';
import { SelectableSettings } from '@progress/kendo-angular-grid';

import { JobService } from '../_services/job.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { CandidatesService } from '../_services/candidate.service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  private jobChangedListener = new Subject<
    {
      _id: string;
      title: string;
      team: string;
      position: number;
      createdAt: string;
      updatedAt: string;
      createdBy: string;
      manager: string;
      status: string;
      skills: string[];
      candidates: string[];
      description: string;
    }[]
  >();
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  @ViewChild('agGrid3') agGrid3: AgGridAngular;
  @ViewChild('agGrid4') agGrid4: AgGridAngular;
  @ViewChild('agGrid5') agGrid5: AgGridAngular;
  @ViewChild('kGrid') kGrid: AgGridAngular;
  editJobMode = false;
  private gridApi: { doLayout: () => void; sizeColumnsToFit: () => void; };
  private gridColumnApi: any;
  private gridApi2: any;
  private gridColumnApi2: any;
  private gridApi3: any;
  private gridColumnApi3: any;
  private gridApi4: any;
  private gridColumnApi4: any;
  private gridApi5: any;
  private gridColumnApi5: any;
  selectedJobs = [];
  searchForm: FormGroup;
  newJobForm: FormGroup;
  searchSubsForm: FormGroup;
  d = new Date().toLocaleDateString('en-US').toString();
  rowJobsData: any[];
  rowJobsCandidatesData: any[];
  rowSelectedJobsData: any[];
  rowSelectedCandidatesData: any[];
  rowSubCandidatesData: any[];
  prev: any;
  rowCount = 0;
  subCount = 0;
  domLayout = window.innerHeight;
  height: any;
  faPlus = faPlus;
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  faUserCog = faUserCog;
  noMatch = false;
  isDark = false;
  public sort: SortDescriptor[] = [
    {
      field: 'updatedAt',
      dir: 'desc',
    },
  ];
  public sort2: SortDescriptor[] = [
    {
      field: '_id',
      dir: 'asc',
    },
  ];
  public  jobsData: GridDataResult;
  public  jobsCandidatesData: GridDataResult;
  public  subCandidatesData: GridDataResult;
  public  subSelectedCandidatesData: GridDataResult;
  public  subSelectedJobsData: GridDataResult;
  public pageSize = 25;
  public skip = 0;
  public pageSizes: PageSizeItem[] = [
    {
      text: '25',
      value: 25,
    },
    {
      text: '50',
      value: 50,
    },
    {
      text: '100',
      value: 100,
    },
    {
      text: 'All',
      value: 'all',
    },
  ];
  public mySelection: any[] = [];

  toViewJob = {
    _id: '',
    title: '',
    team: '',
    manager: '',
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    status: '',
    position: '',
    candidates: '',
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
      headerCheckboxSelection (
        params: {
          columnApi: {
            getRowGroupColumns: () => {
              (): any;
              new(): any;
              length: number;
            };
          };
        })
        {
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
      field: '_id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 90,
      cellRenderer: (params: any) => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-success" style="font: small; height: 29px; font-size: 12px; width: 100%; border-color: lime; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Job">View</button>`;
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
      width: 95,
    },
    {
      headerName: '#Subs.',
      field: 'candidates',
      sortable: true,
      filter: true,
      resizable: true,
      width: 105,
      cellRenderer: (params: { value: any; }) => {
        // tslint:disable-next-line: max-line-length
        return `<button class="btn btn-outline-warning" style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black" data-toggle="tooltip" data-placement="auto" title="View Candidates">${params.value?.length || 0}</button>`;
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
      width: 130,
      cellRenderer: (params: { value: any; }) => {
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
      width: 150,
      cellRenderer: (params: { value: any; }) => {
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
      width: 125,
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
      width: 125,
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
      cellRenderer: (params: { value: string; }) => {
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
      cellRenderer: (params: { value: string; }) => {
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
      field: '_id',
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
      field: 'candidates',
      sortable: true,
      filter: true,
      resizable: true,
      width: 95,
      cellRenderer: (params: { value: any; }) => {
        // tslint:disable-next-line: max-line-length
        return `<div style="font: small; height: 29px; font-size: 12px; width: 100%; margin: auto; color: black">${params.value?.length || 0}</div>`;
      }
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
      width: 95,
      cellRenderer: (params: { value: any; }) => {
        // tslint:disable-next-line: max-line-length
        return `<div style="font: small; font-size: 12px; height: 29px; width: 100%; margin: auto; color: black">${ params.value }</div>`;
      }
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
      cellRenderer: (params: { value: string; }) => {
        // tslint:disable-next-line: max-line-length
        if (params.value !== 'null') {
          return `<div><a href="${params.value}" target="_blank" class="btn btn-info" style="font: small; height: 29px; font-size: 12px; margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</a></div>`;
        }
        return `<div class="disabledResume"><a class="btn btn-info disabledResume" style="font: small; font-size: 12px; height: 29px; color: darkgrey; gray margin: auto; text-align: center opacity: 0.4 !important; cursor: default !important; pointer-events: none !important;">Resume</a></div>`;
      },
    },
  ];

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private candidatesService: CandidatesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isDark = this.authService.getisDark();
    this.authService.getisDarkListener().subscribe(res => {
      this.isDark = res;
    });
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.searchSubsForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.jobService.getData().subscribe((res) => {
      this.rowJobsData = res.jobs;
      if (!this.isDark) {
        this.loadJobsData();
      }else{
        this.agGrid.api.setRowData(this.rowJobsData);
      }
    });
    this.jobService.getjobChangedListener().subscribe((res) => {
      this.jobChangedListener.next([...this.rowJobsData]);
      if (!this.isDark) {
        this.loadJobsData();
      }else{
        this.agGrid.api.setRowData(this.rowJobsData);
      }
    });
    this.createNewJobForm();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadJobsData();
  }

  public sortChange2(sort: SortDescriptor[]): void {
    this.sort2 = sort;
    this.loadJobsCandidatesData();
  }

  public sortChange3(sort: SortDescriptor[]): void {
    this.sort2 = sort;
    this.loadSubCandidatesData();
  }

  private loadJobsCandidatesData(): void {
    this.jobsCandidatesData = {
      data: orderBy(this.rowJobsCandidatesData, this.sort2),
      total: this.rowJobsCandidatesData.length,
    };
  }

  private loadSubCandidatesData(): void {
    this.subCandidatesData = {
      data: this.rowSubCandidatesData,
      total: this.rowSubCandidatesData.length,
    };
  }

  private loadSubSelectedCandidatesData(): void {
    this.subSelectedCandidatesData = {
      data: this.rowSelectedCandidatesData,
      total: this.rowSelectedCandidatesData.length,
    };
  }

  private loadSubSelectedJobsData(): void {
    this.subSelectedJobsData = {
      data: orderBy(this.rowSelectedJobsData, this.sort2),
      total: this.rowSelectedJobsData.length,
    };
  }

  private loadJobsData(): void {
    this.jobsData = {
      data: orderBy(this.rowJobsData, this.sort),
      total: this.rowJobsData.length,
    };
  }

  public sliderChange(pageIndex: number): void {
    this.skip = (pageIndex - 1) * this.pageSize;
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  sizeGrid(param: any) {
    this.gridApi.doLayout();
    this.gridApi.sizeColumnsToFit();
  }

  createNewJobForm() {
    this.newJobForm = this.fb.group(
      {
        id: [''],
        title: ['', Validators.required],
        team: ['', Validators.required],
        positions: [null, Validators.required],
        status: ['Active', Validators.required],
        manager: ['', Validators.required],
        createdBy: ['', Validators.required],
        skills: ['', Validators.required],
        description: ['', Validators.required],
      }
    );
  }

  autoMatch() {
    if (this.rowSelectedJobsData.length >= 1) {
      const skills = [];
      let oldInitialData: any;
      const oldResults = [];
      const results = [];
      for (const job of this.rowSelectedJobsData) {
        for (const skill of job.skills) {
          if (skills.indexOf(skill) < 0) {
            skills.push(skill);
          }
        }
      }
      this.candidatesService.getCandidates().subscribe((res) => {
        oldInitialData = res.docs;
        for (let query of skills) {
          query = query.toLowerCase().trim();
          for (const candidate of oldInitialData) {
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
        if (results.length > 0) {
          results.sort((a, b) => b.priority - a.priority);
          if (this.rowSelectedCandidatesData.length === 0) {
            this.rowSubCandidatesData = results;
          } else {
            for (const cand of this.rowSelectedCandidatesData) {
              for (let i = 0; i < results.length; i++) {
                if (cand._id === results[i]._id) {
                  results.splice(i, 1);
                  break;
                }
              }
            }
            this.rowSubCandidatesData = results;
          }
        } else {
          this.alertify.error(
            'No matches found based on job(s) required skills!'
          );
        }
      });
    } else {
      this.alertify.error('Please go back and select jobs for auto match!');
    }
  }

  async searchSubs() {
    if (
      this.searchSubsForm.valid &&
      !this.searchSubsForm.value.search.match(/^\s+$/)
    ) {
      this.noMatch = false;
      let oldInitialData: any;
      const queries = this.searchSubsForm.value.search.split(',');
      const oldResults = [];
      const results = [];
      this.candidatesService.getCandidates().subscribe((res) => {
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
          if (this.rowSelectedCandidatesData.length === 0) {
            this.rowSubCandidatesData = results;
          } else {
            for (const cand of this.rowSelectedCandidatesData) {
              for (let i = 0; i < results.length; i++) {
                if (cand._id === results[i]._id) {
                  results.splice(i, 1);
                  break;
                }
              }
            }
            if (results.length > 0) {
              this.rowSubCandidatesData = results;
            } else {
              this.noMatch = true;
              this.candidatesService.getCandidates().subscribe((res) => {
                if (this.rowSelectedCandidatesData.length === 0) {
                  this.rowSubCandidatesData = res.docs;
                } else {
                  const newData = res.docs;
                  for (const cand of this.rowSelectedCandidatesData) {
                    for (let i = 0; i < newData.length; i++) {
                      if (cand._id === newData[i]._id) {
                        newData.splice(i, 1);
                        break;
                      }
                    }
                  }
                  this.rowSubCandidatesData = newData;
                }
              });
            }
          }
        } else {
          this.noMatch = false;
          this.candidatesService.getCandidates().subscribe((response) => {
            if (this.rowSelectedCandidatesData.length === 0) {
              this.rowSubCandidatesData = response.docs;
            } else {
              const newData = response.docs;
              for (const cand of this.rowSelectedCandidatesData) {
                for (let i = 0; i < newData.length; i++) {
                  if (cand._id === newData[i]._id) {
                    newData.splice(i, 1);
                    break;
                  }
                }
              }
              this.rowSubCandidatesData = newData;
            }
          });
        }
      });
    } else {
      this.noMatch = false;
      this.candidatesService.getCandidates().subscribe((res) => {
        if (this.rowSelectedCandidatesData.length === 0) {
          this.rowSubCandidatesData = res.docs;
        } else {
          const newData = res.docs;
          for (const cand of this.rowSelectedCandidatesData) {
            for (let i = 0; i < newData.length; i++) {
              if (cand._id === newData[i]._id) {
                newData.splice(i, 1);
                break;
              }
            }
          }
          this.rowSubCandidatesData = newData;
        }
      });
    }
  }

  async search() {
    if (this.searchForm.valid && !this.searchForm.value.search.match(/^\s+$/)) {
      let oldInitialData: any;
      this.jobService.getData().subscribe((res) => {
        oldInitialData = res.jobs;
        const queries = this.searchForm.value.search.split(',');
        const oldResults = [];
        const results = [];
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
              const dd = job._id + '';
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
          this.rowJobsData = results;
          this.loadJobsData();
        } else {
          this.jobService.getData().subscribe((res) => {
            this.rowJobsData = res.jobs;
            if (!this.isDark) {
              this.loadJobsData();
            }
          });
        }
      });
    } else {
      this.jobService.getData().subscribe((res) => {
        this.rowJobsData = res.jobs;
        if (!this.isDark) {
          this.loadJobsData();
        }
      });
    }
  }

  editJob(job: any) {
    this.editJobMode = true;
    this.prev = job;
    this.newJobForm.patchValue({
      id: job._id,
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
    if (this.isDark) {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      if (selectedNodes.length >= 1) {
        this.alertify.confirm(
          'Are you sure you want to delete job(s)?',
          async () => {
            const selectedData = selectedNodes.map((node) => node.data);
            for (const job of selectedData) {
              const deletedJob = job;
              (await this.jobService.deleteData(job._id)).subscribe(() => {
                this.jobService.getData().subscribe(res => {
                  this.rowJobsData = res.jobs;
                  this.candidatesService.deleteSubmissions(deletedJob, deletedJob).subscribe(resp => {});
                  if (!this.isDark) {
                    this.loadJobsData();
                  }
                });
              });
            }
            this.alertify.success('Job(s) has been deleted successfully');
            this.rowCount = 0;
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
    } else {
      if (this.mySelection.length >= 1) {
        this.alertify.confirm(
          'Are you sure you want to delete job(s)?',
          async () => {
            for (const job of this.mySelection) {
              const deletedJob = job;
              (await this.jobService.deleteData(job)).subscribe(() => {
              this.jobService.getData().subscribe(res => {
                this.rowJobsData = res.jobs;
                this.candidatesService.deleteSubmissions(deletedJob, deletedJob).subscribe(resp => {});
                if (!this.isDark) {
                  this.loadJobsData();
                }
              });
            });
          }
            this.alertify.success('Job(s) has been deleted successfully');
            this.rowCount = 0;
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
  }

  newJob() {
    this.editJobMode = false;
    this.newJobForm.reset();
    $('#newJob').modal('show');
  }

  addSubmission() {
    if (this.isDark) {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      if (selectedNodes.length >= 1) {
        this.rowSelectedJobsData = [];
        this.rowSelectedCandidatesData = [];
        const selectedData = selectedNodes.map((node: { data: any; }) => node.data);
        this.selectedJobs = selectedData;
        this.candidatesService.getCandidates().subscribe((res: { docs: any; }) => {
          this.rowSubCandidatesData = res.docs;
          this.agGrid3.api.setRowData(this.rowSubCandidatesData);
          this.rowSelectedJobsData = selectedData;
          this.gridApi3.sizeColumnsToFit();
          this.agGrid4.api.setRowData(this.rowSelectedJobsData);
          this.gridApi4.sizeColumnsToFit();
          this.agGrid5.api.setRowData(this.rowSelectedCandidatesData);
          this.gridApi5.sizeColumnsToFit();
          $('#viewSubs').modal('show');
        });
      } else {
        this.alertify.error('Please select jobs to add submissions');
      }
    } else {
      if (this.mySelection.length >= 1) {
        this.rowSelectedJobsData = [];
        this.rowSelectedCandidatesData = [];
        const selectedData = [];
        for (const id of this.mySelection) {
          for (const job of this.rowJobsData) {
            if (id === job._id) {
              selectedData.push(job);
            }
          }
        }
        this.selectedJobs = selectedData;
        this.candidatesService.getCandidates().subscribe((res: { docs: any; }) => {
          this.rowSubCandidatesData = res.docs;
          this.rowSelectedJobsData = selectedData;
          this.loadSubCandidatesData();
        });
        $('#viewSubs').modal('show');
      } else {
        this.alertify.error('Please select jobs to add submissions');
      }
    }
  }

  async onAddSubs() {
    if (this.rowSelectedCandidatesData.length <= 0) {
      this.alertify.error('Please add candidates!');
    } else if (this.rowSelectedJobsData.length <= 0) {
      this.alertify.error('Please add jobs!');
    } else {
      for (const job of this.rowSelectedJobsData) {
        await this.jobService.addSubmissions(job._id, this.rowSelectedCandidatesData).subscribe(rs => {});
      }
      for (const candidate of this.rowSelectedCandidatesData) {
        await this.candidatesService.addSubmissions(candidate._id, this.rowSelectedJobsData).subscribe(rs => {});
      }
      this.jobService.getData().subscribe((res: { jobs: any; }) => {
        this.rowJobsData = res.jobs;
        if (!this.isDark) {
          this.loadJobsData();
        }
        if (
          this.searchForm.valid &&
          !this.searchForm.value.search.match(/^\s+$/)
        ) {
          this.search();
        }
        this.rowCount = 0;
        $('#viewSubs').modal('hide');
      });
    }
  }

  onNewJob() {
    if (!this.editJobMode) {
      this.newJobForm.value.skills += '';
      const newSkills = this.newJobForm.value.skills.split(',');
      for (let newSkill of newSkills) {
        newSkill = newSkill.trim();
      }
      const newd = new Date().toLocaleDateString('en-US').toString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        title: this.newJobForm.value.title,
        team: this.newJobForm.value.team,
        position: +this.newJobForm.value.positions,
        status: this.newJobForm.value.status,
        updatedAt: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: newd,
        skills: newSkills,
        description: this.newJobForm.value.description,
      };
      this.jobService.addData(newRow)
      .subscribe((res: any) => {
        this.alertify.success('Job has been added successfully');
        this.jobService.getData().subscribe(res => {
          this.rowJobsData = res.jobs;
        });
        });
      if (
        this.searchForm.valid &&
        !this.searchForm.value.search.match(/^\s+$/)
      ) {
        this.search();
      }
    } else {
      this.newJobForm.value.skills += '';
      const newSkills = this.newJobForm.value.skills.split(',');
      for (let newSkill of newSkills) {
        newSkill = newSkill.trim();
      }
      const newd = new Date().toLocaleDateString('en-US').toString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        title: this.newJobForm.value.title,
        team: this.newJobForm.value.team,
        position: this.newJobForm.value.positions,
        status: this.newJobForm.value.status,
        updatedAt: newd,
        manager: this.newJobForm.value.manager,
        createdBy: this.newJobForm.value.createdBy,
        createdAt: this.prev.createdAt,
        skills: newSkills,
        description: this.newJobForm.value.description,
      };
      this.jobService.updateData(this.prev._id, newRow)
      .subscribe(
        () => {
          this.alertify.success('Job has been updated successfully');
          this.jobService.getData().subscribe((res: { jobs: any; }) => {
            this.rowJobsData = res.jobs;
            if (!this.isDark) {
              this.loadJobsData();
            }
          });
          if (
            this.searchForm.valid &&
            !this.searchForm.value.search.match(/^\s+$/)
          ) {
            this.search();
          }
        },
        (err) => {
          this.alertify.error('Failed to update job!');
          console.log(err);
        }
      );
    }
    this.newJobForm.reset();
    this.rowCount = 0;
    this.loadJobsData();
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowJobsData);
  }

  async onSubClick(job: any) {
    this.prev = job;
    this.rowJobsCandidatesData = job.candidates;
    if (this.isDark){
      this.agGrid2.api.setRowData(this.rowJobsCandidatesData);
      this.gridApi2.sizeColumnsToFit();
    }else{
      this.loadJobsCandidatesData();
      }
    this.rowCount = 0;
    $('#viewCandidate').modal('show');
    this.search();
  }

  onViewDetails(job: any) {
    this.toViewJob._id = job._id;
    this.toViewJob.title = job.title;
    this.toViewJob.team = job.team;
    this.toViewJob.manager = job.manager;
    this.toViewJob.status = job.status;
    this.toViewJob.position = job.position;
    this.toViewJob.candidates = job.candidates;
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
    if (this.isDark) {
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
      this.agGrid.cellClicked.subscribe((res: { colDef: { field: string; }; data: any; }) => {
        if (res.colDef.field === 'candidates') {
          this.onSubClick(res.data);
        } else if (
          res.colDef.field === 'description' ||
          res.colDef.field === '_id' ||
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
  }

  onGridReady2(params): void {
    if(this.isDark){
      this.gridApi2 = params.api;
      this.gridColumnApi2 = params.columnApi;

      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
          this.getTableHeight();
        });
      });
    }
  }

  async onGridReady3(params) {
    if (this.isDark){
      this.gridApi3 = params.api;
      this.gridColumnApi3 = params.columnApi;
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
          this.getTableHeight();
        });
      });
      this.agGrid3.selectionChanged.subscribe(() => {
        this.subCount = this.rowSelectedCandidatesData.length;
      });
      this.agGrid3.cellClicked.subscribe((res: { colDef: { field: string; }; data: { _id: any; }; }) => {
        if (res.colDef.field === '_id') {
          this.rowSelectedCandidatesData.unshift(res.data);
          this.agGrid5.api.setRowData(this.rowSelectedCandidatesData);
          this.gridApi5.sizeColumnsToFit();
          for (let i = 0; i < this.rowSubCandidatesData.length; i++) {
            if (this.rowSubCandidatesData[i]._id === res.data._id) {
              this.rowSubCandidatesData.splice(i, 1);
              this.agGrid3.api.setRowData(this.rowSubCandidatesData);
              this.gridApi3.sizeColumnsToFit();
            }
          }
        }
      });
    }
  }

  onCandidateSelect(res: any){
    this.rowSelectedCandidatesData.unshift(res);
    this.loadSubSelectedCandidatesData();
    for (let i = 0; i < this.rowSubCandidatesData.length; i++) {
      if (this.rowSubCandidatesData[i]._id === res._id) {
        this.rowSubCandidatesData.splice(i, 1);
        this.loadSubCandidatesData();
        break;
      }
    }
    this.subCount = this.rowSelectedCandidatesData.length;
  }

  onGridReady4(params): void {
    if (this.isDark){
      this.gridApi4 = params.api;
      this.gridColumnApi4 = params.columnApi;
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
          this.getTableHeight();
        });
      });
      this.agGrid4.cellClicked.subscribe((res: { colDef: { field: string; }; data: { _id: any; }; }) => {
        if (res.colDef.field === 'delete') {
          this.alertify.confirm(
            'Are you sure you want to remove this job from submissions?',
            () => {
              for (let i = 0; i < this.rowSelectedJobsData.length; i++) {
                if (this.rowSelectedJobsData[i]._id === res.data._id) {
                  this.rowSelectedJobsData.splice(i, 1);
                  this.agGrid4.api.setRowData(this.rowSelectedJobsData);
                  this.gridApi4.sizeColumnsToFit();
                }
              }
            }
          );
        }
      });
    }
  }

  onUnselectJobs(res: any){
    this.alertify.confirm(
      'Are you sure you want to remove this job from submissions?',
      () => {
        for (let i = 0; i < this.rowSelectedJobsData.length; i++) {
          if (this.rowSelectedJobsData[i]._id === res._id) {
            this.rowSelectedJobsData.splice(i, 1);
            this.loadSubSelectedJobsData();
            break;
          }
        }
      });
  }

  onGridReady5(params): void {
    if (this.isDark){
      this.gridApi5 = params.api;
      this.gridColumnApi5 = params.columnApi;
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
          this.getTableHeight();
        });
      });
      this.agGrid5.selectionChanged.subscribe(() => {
        this.subCount = this.rowSelectedCandidatesData.length;
      });
      this.agGrid5.cellClicked.subscribe((res: { colDef: { field: string; }; data: { _id: any; }; }) => {
        if (res.colDef.field === 'delete') {
          this.rowSubCandidatesData.unshift(res.data);
          this.agGrid3.api.setRowData(this.rowSubCandidatesData);
          this.gridApi3.sizeColumnsToFit();
          for (let i = 0; i < this.rowSelectedCandidatesData.length; i++) {
            if (this.rowSelectedCandidatesData[i]._id === res.data._id) {
              this.rowSelectedCandidatesData.splice(i, 1);
              this.agGrid5.api.setRowData(this.rowSelectedCandidatesData);
              this.gridApi5.sizeColumnsToFit();
            }
          }
        }
      });
    }
  }

  onUnselectCandidates(res: any){
    this.rowSubCandidatesData.unshift(res);
    this.loadSubCandidatesData();
    for (let i = 0; i < this.rowSelectedCandidatesData.length; i++) {
      if (this.rowSelectedCandidatesData[i]._id === res._id) {
        this.rowSelectedCandidatesData.splice(i, 1);
        this.loadSubSelectedCandidatesData();
        break;
      }
    }
    this.subCount = this.rowSelectedCandidatesData.length;
  }

}
