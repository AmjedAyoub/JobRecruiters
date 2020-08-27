import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private dataChangedListener = new Subject<
    {
      id: string;
      title: string;
      position: number;
      submissions: number;
      status: string;
      dateUpdated: string;
      manager: string;
      createdBy: string;
      createdAt: string;
    }[]
  >();
  private candidateChangedListener = new Subject<
    {
      id: string;
      fullName: string;
      email: string;
      phone: string;
      jobs: any[];
    }[]
  >();
  private candidates = [
    {
      id: '78',
      fullName: 'John Stepher',
      email: 'john@gmail.com',
      phone: '999-9999-999',
      jobs: ['654', '698'],
    },
    {
      id: '65',
      fullName: 'Max Johnathen',
      email: 'max@gmail.com',
      phone: '888-8888-888',
      jobs: ['654', '548'],
    },
    {
      id: '53',
      fullName: 'Chris Marksen',
      email: 'chris@gmail.com',
      phone: '333-3333-333',
      jobs: ['654', '698'],
    },
    {
      id: '12',
      fullName: 'Amjed Ayoub',
      email: 'amjad@gmail.com',
      phone: '777-7777-777',
      jobs: ['654', '698', '548', '145'],
    },
  ];
  private rowData = [
    // tslint:disable-next-line: max-line-length
    {
      id: '654',
      title: 'Software Developer',
      position: 2,
      submissions: 0,
      status: 'Active',
      team: 'MS (Azure)',
      dateUpdated: new Date('7/23/2020, 11:00:00 AM').toLocaleString(),
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: new Date('7/20/2020, 11:45:00 AM').toLocaleString(),
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '548',
      title: 'UI Developer',
      position: 1,
      submissions: 0,
      status: 'Active',
      team: 'Amazone',
      dateUpdated: new Date('6/18/2020, 10:30:00 AM').toLocaleString(),
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: new Date('6/12/2020, 11:48:05 AM').toLocaleString(),
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '698',
      title: 'Back-End Developer',
      position: 6,
      submissions: 0,
      status: 'Active',
      team: 'Amazone',
      dateUpdated: new Date('7/24/2020, 02:15:00 PM').toLocaleString(),
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: new Date('7/20/2020, 09:10:00 AM').toLocaleString(),
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '235',
      title: 'Software Developer',
      position: 3,
      submissions: 0,
      status: 'Active',
      team: 'MS (Azure)',
      dateUpdated: new Date('8/21/2020, 03:34:00 PM').toLocaleString(),
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: new Date('8/02/2020, 11:00:00 AM').toLocaleString(),
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '145',
      title: 'UI Developer',
      position: 5,
      submissions: 0,
      status: 'Inactive',
      team: 'Peaple Tech',
      dateUpdated: new Date('6/15/2020, 12:13:00 PM').toLocaleString(),
      manager: 'Soujayna',
      createdBy: 'Amjed',
      createdAt: new Date('6/05/2020, 10:48:00 AM').toLocaleString(),
    },
  ];
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.updateSubs();
  }

  cleanSubs(){
    for (const row of this.rowData) {
        row.submissions = 0;
    }
  }

  updateSubs(){
    this.cleanSubs();
    for (const candidate of this.candidates) {
      for (const job of candidate.jobs) {
        for (const row of this.rowData) {
          if (job === row.id){
            row.submissions++;
            break;
          }
        }
      }
    }
    this.dataChangedListener.next([...this.rowData]);
  }

  addData(row: any) {
    const newd = new Date().toLocaleString();
    // tslint:disable-next-line: max-line-length
    this.rowData.unshift(row);
    this.dataChangedListener.next([...this.rowData]);
  }

  deleteData(idx: number){
    const jobId = this.rowData[idx].id;
    this.rowData.splice(idx, 1);
    this.dataChangedListener.next([...this.rowData]);
    for (const candidate of this.candidates) {
      for (let i = 0; i < candidate.jobs.length; i++) {
        if (jobId === candidate.jobs[i]){
          candidate.jobs.splice(i, 1);
          break;
        }
      }
    }
    this.candidateChangedListener.next([...this.candidates]);
  }

  addNewCandidate(row: any) {
    // tslint:disable-next-line: max-line-length
    this.candidates.unshift(row);
    this.candidateChangedListener.next([...this.candidates]);
  }

  deleteCandidate(idx: number){
    this.candidates.splice(idx, 1);
    this.updateSubs();
    this.candidateChangedListener.next([...this.candidates]);
    this.dataChangedListener.next([...this.rowData]);
  }

  getDataChangedListener() {
    this.updateSubs();
    return this.dataChangedListener.asObservable();
  }

  getCandidateChangedListener() {
    return this.candidateChangedListener.asObservable();
  }

  getData() {
    this.updateSubs();
    return this.rowData;
  }

  getCandidates() {
    return this.candidates;
  }

  updateCandidate(id: any, Data: any) {
    for (let i = 0; i < this.candidates.length; i++) {
      if (this.candidates[i].id === id) {
        this.candidates[i] = Data;
        break;
      }
    }
    this.candidateChangedListener.next([...this.candidates]);
  }

  updateData(id: any, Data: any) {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].id === id) {
        this.rowData[i] = Data;
        break;
      }
    }
    this.dataChangedListener.next([...this.rowData]);
  }

  addSubmissions(jobs: any[], candidates: any[]){
    console.log(jobs);
    console.log(candidates);
    for (const candidate of candidates) {
      for (const intialCan of this.candidates) {
        if (candidate.id === intialCan.id){
          for (const job of jobs) {
            if(intialCan.jobs.indexOf(job.id) < 0){
              intialCan.jobs.push(job.id);
            }
          }
        }
      }
    }
    this.updateSubs();
    this.dataChangedListener.next([...this.rowData]);
    this.candidateChangedListener.next([...this.candidates]);
  }

  addPhoto(image?: File) {
    const postData = new FormData();
    if (image !== null) {
      postData.append('image', image);
      postData.append('userId', localStorage.getItem('userId'));
    }
    return this.http.post<{ message: string; doc: any }>(
      'http://localhost:3000/api/photo',
      postData
    );
  }
}
