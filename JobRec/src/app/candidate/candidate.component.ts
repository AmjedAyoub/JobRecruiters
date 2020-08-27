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


  columnDefs = [
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
      headerName: 'Team',
      field: 'team',
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
      cellRenderer: (params) => {
        // tslint:disable-next-line: max-line-length
        return `<div><a class="btn-outline-warning">${params.value}</a></div>`;
      },
    },
  ];

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
        query = query.toLowerCase();
        if (
          !isNaN(query) &&
          query !== '' &&
          !query.match(/^\s+$/) &&
          query !== null
        ) {
          // Numbers
          for (const candidate of initialData) {
            if (candidate.id.includes(query) || candidate.phone.includes(query)) {
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
              if (candidate.fullName.toLowerCase().includes(query) || candidate.email.toLowerCase().includes(query)) {
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
        id: '5f46d1d96ffcd83f3cbe6c98',
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
        id: this.newCandidateForm.value.id,
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

  async onJobsClick(id: string){
    console.log(id);
    let candidates = await [...this.dataService.getCandidates()];
    let jobs = await [...this.dataService.getData()];
    this.rowData3 = [];
    for (const candidate of candidates) {
      if(candidate.id === id){
        for (const job of candidate.jobs) {
          for (const resJob of jobs) {
            if (job === resJob.id){
              if (this.rowData3.indexOf(resJob) < 0){
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
      if (res.colDef.field === 'jobs'){
        this.onJobsClick(res.data.id);
      }
    });
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
  }
}
