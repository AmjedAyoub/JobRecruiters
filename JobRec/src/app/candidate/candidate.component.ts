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
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  editJobMode = false;
  title = 'app';
  private gridApi;
  private gridColumnApi;
  selectedJobs = [];
  searchForm: FormGroup;
  newCandidateForm: FormGroup;
  private len = 0;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;

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
    },
  ];

  d = new Date().toLocaleString();
  rowData2: any[];
  // rowData: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {
    this.uploader = new FileUploader({
      url: 'http://localhost:3000/api/photo',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });

    this.hasBaseDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe((res) => (this.response = res));
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, { validators: [Validators.required] }),
    });
    this.rowData2 = [...this.dataService.getCandidates()];
    this.dataService.getCandidateChangedListener().subscribe((res) => {
      this.rowData2 = res;
      this.agGrid.api.setRowData(this.rowData2);
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


  search() {}

  prev;
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
        jobs: []
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

  onAddSubs() {}

  onNewCandidate() {
    console.log(this.editJobMode);
    if (!this.editJobMode) {
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
    } else {
      const newd = new Date().toLocaleString();
      // tslint:disable-next-line: max-line-length
      const newRow = {
        id: this.newCandidateForm.value.id,
        fullName: this.newCandidateForm.value.fullName,
        email: this.newCandidateForm.value.email,
        phone: this.newCandidateForm.value.phone,
        jobs: this.prev.jobs
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

  deleteCandidate(){
    
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

}
