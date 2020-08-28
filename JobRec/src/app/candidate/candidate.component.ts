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
import { mimeType } from './mime-type.validator';

import { DataService } from '../_services/data.service';
import { AlertifyService } from '../_services/alertify.service';
import { DocsService } from '../_services/doc.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare var $: any;
let l = 0;

const BACKEND_URL = environment.apiUrl + '/candidates';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  // rowData: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private docsService: DocsService,
    private http: HttpClient
  ) {}
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
  private len = 0;
  d = new Date().toLocaleString();
  rowData2: any[];
  rowData3: any[];
  prev;
  fileToUpload: File = null;

  toViewCandidate = {
    id: '',
    fullName: '',
    email: '',
    phone: '',
    resume: '',
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
      field: 'id',
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><button class="btn btn-outline-success" style="width: 100%; border-color: lime; margin: auto; color: white" data-toggle="tooltip" data-placement="auto" title="View Candidate">${params.value}</button></div>`;
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
      field: 'resume',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><button class="btn btn-info" style="margin: auto; text-align: center" data-toggle="tooltip" data-placement="auto" title="View Resume">Resume</button></div>`;
      },
    },
  ];
  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  private fileName;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.rowData2 = [...this.dataService.getCandidates()];
    this.dataService.getCandidateChangedListener().subscribe((res) => {
      this.rowData2 = res;
      this.agGrid.api.setRowData(this.rowData2);
    });
    this.uploadImgForm = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    this.createNewCandidateForm();
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


  async search() {
    if (this.searchForm.valid && !this.searchForm.value.search.match(/^\s+$/)) {
      let initialData = await [...this.dataService.getCandidates()];
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
          for (const candidate of initialData) {
            let dd = candidate.id + '';
            if (dd.includes(query) || candidate.phone.includes(query)) {
              if (results.indexOf(candidate) < 0) {
                results.push(candidate);
              }
            }
          }
        } else if (query !== '' && !query.match(/^\s+$/) && query !== null) {
          if (!isNaN(Date.parse(query))) {
            // Dates
          } else {
            // Strings
            for (const candidate of initialData) {
              if (
                candidate.fullName.toLowerCase().includes(query) ||
                candidate.email.toLowerCase().includes(query)
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
    } else {
      this.rowData2 = [...this.dataService.getCandidates()];
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
      console.log(selectedData);
      this.newCandidateForm.patchValue({
        id: selectedData[0].id,
        fullName: selectedData[0].fullName,
        email: selectedData[0].email,
        phone: selectedData[0].phone,
        jobs: [],
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
    console.log(this.editJobMode);
    if (!this.editJobMode) {
      const newRow = {
        id: +this.newCandidateForm.value.id,
        fullName: this.newCandidateForm.value.fullName,
        email: this.newCandidateForm.value.email,
        phone: this.newCandidateForm.value.phone,
        jobs: [],
      };
      this.dataService.addNewCandidate(newRow);
      this.dataService.getCandidateChangedListener().subscribe((res) => {
        this.rowData2 = res;
      });
      // this.createUser(newRow);
    } else {
      const newd = new Date().toLocaleString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: +this.newCandidateForm.value.id,
        fullName: this.newCandidateForm.value.fullName,
        email: this.newCandidateForm.value.email,
        phone: this.newCandidateForm.value.phone,
        jobs: this.prev.jobs,
      };
      this.dataService.updateCandidate(this.prev.id, newRow);
      this.dataService.getCandidateChangedListener().subscribe((res) => {
        this.rowData2 = res;
      });
    }
    this.newCandidateForm.reset();
    $('.modal').modal('hide');
    // this.agGrid.api.setRowData(this.rowData);
  }

  // createUser(user: any) {
  //   this.http.post(BACKEND_URL + '/addnewcan', user).subscribe(
  //     () => {
  //     },
  //     error => {
  //     }
  //   );
  // }

  deleteCandidate() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length >= 1) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.prev = selectedData[0];
      console.log(selectedData);
      for (const candidate of selectedData) {
        for (let i = 0; i < this.rowData2.length; i++) {
          if (this.rowData2[i].id === candidate.id) {
            this.dataService.deleteCandidate(i);
            break;
          }
        }
      }
      this.dataService.getDataChangedListener().subscribe((res) => {
        this.rowData2 = res;
      });
    } else {
      this.alertify.error('Please select candidates to delete');
    }
  }

  async onJobsClick(id: number) {
    console.log(id);
    let candidates = await [...this.dataService.getCandidates()];
    let jobs = await [...this.dataService.getData()];
    this.rowData3 = [];
    for (const candidate of candidates) {
      if (candidate.id === id) {
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
  }

  async onViewDetails(id: number) {
    for (const candidate of this.rowData2) {
      if (id === candidate.id) {
        this.toViewCandidate.id = candidate.id;
        this.toViewCandidate.fullName = candidate.fullName;
        this.toViewCandidate.email = candidate.email;
        this.toViewCandidate.phone = candidate.phone;
        this.toViewCandidate.resume = candidate.resume;
        this.toViewCandidate.jobs = candidate.jobs;
        let data = await [...this.dataService.getData()];
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
        this.onJobsClick(res.data.id);
      } else if (res.colDef.field === 'id') {
        this.onViewDetails(res.data.id);
      }
    });
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
  }

  onUploadImg() {
    this.docsService.addPhoto('1',
      this.uploadImgForm.value.image
    ).subscribe(
      () => {
        console.log('good');
      }
    );
    this.uploadImgForm.reset();
  }

  onImagePicked2(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadImgForm.patchValue({ image: file });
    this.uploadImgForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
}
