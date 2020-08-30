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
  editJobMode = false;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  selectedJobs = [];
  searchForm: FormGroup;
  newCandidateForm: FormGroup;
  uploadImgForm: FormGroup;
  d = new Date().toLocaleString();
  rowData2: any[];
  rowData3: any[];
  prev;
  fileToUpload: File = null;
  docs: any[];
  private docsSub: Subscription;

  toViewCandidate = {
    _id: '',
    fullName: '',
    email: '',
    phone: '',
    url: '',
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
      width: 100,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><button class="btn btn-outline-success" style="width: 100%; border-color: lime; margin: auto; color: white" data-toggle="tooltip" data-placement="auto" title="View Candidate">View</button></div>`;
      },
    },
    {
      headerName: 'Name',
      field: 'fullName',
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      resizable: true,
      width: 250,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Jobs',
      field: 'jobs',
      sortable: true,
      filter: true,
      resizable: true,
      width: 250,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><a class="btn-outline-warning" style="cursor: pointer;" data-toggle="tooltip" data-placement="auto" title="View Jobs">${params.value}</a></div>`;
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

  ngOnInit() {
    this.docsService.getDocs();
    this.docsSub = this.docsService.getDocsUpdateListener().subscribe((res) => {
      this.rowData2 = res.docs;
    });
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.uploadImgForm = new FormGroup({
      image: new FormControl(null),
    });
    this.createNewCandidateForm();
  }

  createNewCandidateForm() {
    this.newCandidateForm = this.fb.group({
      fullName: ['', Validators.required],
      _id: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      resume: [null],
    });
  }

  async search() {
    if (this.searchForm.valid && !this.searchForm.value.search.match(/^\s+$/)) {
      this.docsService.getDocs();
      let initialData;
      let queries = this.searchForm.value.search.split(',');
      let results = [];
      await this.docsService.getDocsUpdateListener().subscribe((res) => {
        initialData = res.docs;
        for (let query of queries) {
          query = query.toLowerCase().trim();
          if (
            !isNaN(query) &&
            query !== '' &&
            !query.match(/^\s+$/) &&
            query !== null
          ) {
            // Numbers
            for (const candidate of initialData) {
              if (candidate.phone.includes(query)) {
                if (results.indexOf(candidate) < 0) {
                  results.push(candidate);
                }
              }
              for (let job of candidate.jobs) {
                job = job + '';
                if (job.includes(query)) {
                  if (results.indexOf(candidate) < 0) {
                    results.push(candidate);
                    break;
                  }
                }
              }
            }
          } else if (query !== '' && !query.match(/^\s+$/) && query !== null) {
            if (!isNaN(Date.parse(query))) {
              // Dates
            } else {
              // Strings
              for (const candidate of initialData) {
                const dd = candidate.id + '';
                if (
                  candidate.fullName.toLowerCase().includes(query) ||
                  candidate.email.toLowerCase().includes(query) ||
                  dd.includes(query) ||
                  candidate.phone.includes(query)
                ) {
                  if (results.indexOf(candidate) < 0) {
                    results.push(candidate);
                  }
                }
              }
            }
          }
        }
        this.rowData2 = results;
      });
    } else {
      this.docsService.getDocs();
      this.docsSub = this.docsService
        .getDocsUpdateListener()
        .subscribe((res) => {
          this.rowData2 = res.docs;
        });
    }
  }

  editCandidate() {
    this.editJobMode = true;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length > 1) {
      this.alertify.error(
        'Sorry, you cant edit more than one candidate each time!, please select one candidate only!'
      );
    } else if (selectedNodes.length === 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.prev = selectedData[0];
      this.newCandidateForm.patchValue({
        _id: selectedData[0]._id,
        fullName: selectedData[0].fullName,
        email: selectedData[0].email,
        phone: selectedData[0].phone,
        jobs: [],
        resume: selectedData[0].url,
      });
      $('#newCandidate').modal('show');
    } else {
      this.alertify.error('Please select a candidate to edit');
    }
  }

  newCandidate() {
    this.editJobMode = false;
    this.newCandidateForm.reset();
    $('#newCandidate').modal('show');
  }

  onNewCandidate() {
    if (!this.editJobMode) {
      // tslint:disable-next-line: max-line-length
      if (this.uploadImgForm.value.image !== null) {
        this.docsService
          .addDoc(
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            [],
            this.uploadImgForm.value.image
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been added successfully');
            this.docsService.getDocs();
            this.docsSub = this.docsService
              .getDocsUpdateListener()
              .subscribe((response) => {
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
            [],
            'null'
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been added successfully');
            this.docsService.getDocs();
            this.docsSub = this.docsService
              .getDocsUpdateListener()
              .subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            });
      }
    } else {
      // tslint:disable-next-line: max-line-length
      if (this.uploadImgForm.value.image !== null) {
        this.docsService
          .updateDoc(
            this.newCandidateForm.value._id,
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            this.prev.jobs,
            this.uploadImgForm.value.image
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been updated successfully');
            this.docsService.getDocs();
            this.docsSub = this.docsService
              .getDocsUpdateListener()
              .subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            });
      } else {
        this.docsService
          .updateDoc(
            this.newCandidateForm.value._id,
            this.newCandidateForm.value.fullName,
            this.newCandidateForm.value.email,
            this.newCandidateForm.value.phone,
            this.prev.jobs,
            this.prev.url
          )
          .subscribe((res) => {
            this.alertify.success('Candidate has been updated successfully');
            this.docsService.getDocs();
            this.docsSub = this.docsService
              .getDocsUpdateListener()
              .subscribe((response) => {
                this.rowData2 = response.docs;
              });
              this.search();
            });
          }
        }
    this.newCandidateForm.reset();
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowData);
  }

  deleteCandidate() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      for (const candidate of selectedData) {
        this.docsService.deleteDoc(candidate._id).subscribe((res) => {
          this.alertify.success('Candidate has been deleted successfully');
          this.docsService.getDocs();
          this.docsSub = this.docsService
            .getDocsUpdateListener()
            .subscribe((response) => {
              this.rowData2 = response.docs;
            });
            this.search();
        });
      }
    } else {
      this.alertify.error('Please select candidates to delete');
    }
  }

  async onJobsClick(id: number) {
    this.docsService.getDocs();
    this.docsSub = this.docsService
      .getDocsUpdateListener()
      .subscribe((response) => {
        this.rowData2 = response.docs;
      });
    let jobs = await [...this.dataService.getData()];
    this.rowData3 = [];
    for (const candidate of this.rowData2) {
      if (candidate._id === id) {
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
      }
    }
    $('#viewJobs').modal('show');
    this.gridApi2.sizeColumnsToFit();
    this.search();
  }

  async onViewDetails(id: number) {
    for (const candidate of this.rowData2) {
      if (id + '' === candidate._id) {
        this.toViewCandidate._id = candidate._id;
        this.toViewCandidate.fullName = candidate.fullName;
        this.toViewCandidate.email = candidate.email;
        this.toViewCandidate.phone = candidate.phone;
        this.toViewCandidate.url = candidate.url;
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
        break;
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

    params.api.sizeColumnsToFit();

    this.agGrid.cellClicked.subscribe((res) => {
      if (res.colDef.field === 'jobs') {
        this.onJobsClick(res.data._id);
      } else if (res.colDef.field === '_id') {
        this.onViewDetails(res.data._id);
      }
    });
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
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
