import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataChangedListener = new Subject<{
    id: string,
    title: string,
    position: number,
    submissions: number,
    status: string,
    dateUpdated: string,
    manager: string,
    createdBy: string,
    createdAt: string,
  }[]>();
  private candidateChangedListener = new Subject<{
    id: string,
    fullName: string,
    email: string,
    phone: string,
    jobs: any[]
  }[]>();
  private d = new Date().toLocaleString();
  private candidates = [
    {
      id: '78',
      fullName: 'John Stepher',
      email: 'john@gmail.com',
      phone: '999-9999-999',
      jobs: ['654', '698']
    },
    {
      id: '65',
      fullName: 'Max Johnathen',
      email: 'max@gmail.com',
      phone: '888-8888-888',
      jobs: ['654', '548']
    },
    {
      id: '53',
      fullName: 'Chris Marksen',
      email: 'chris@gmail.com',
      phone: '333-3333-333',
      jobs: ['654', '698']
    },
    {
      id: '12',
      fullName: 'Amjed Ayoub',
      email: 'amjad@gmail.com',
      phone: '777-7777-777',
      jobs: ['654', '698', '548', '145']
    },
  ];
  private rowData = [
    // tslint:disable-next-line: max-line-length
    {
      id: '654',
      title: 'Software Developer',
      position: 2,
      submissions: 4,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '548',
      title: 'UI Developer',
      position: 1,
      submissions: 2,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '698',
      title: 'Back-End Developer',
      position: 6,
      submissions: 3,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Max',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '235',
      title: 'Software Developer',
      position: 3,
      submissions: 0,
      status: 'Active',
      dateUpdated: this.d,
      manager: 'Krishna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
    // tslint:disable-next-line: max-line-length
    {
      id: '145',
      title: 'UI Developer',
      position: 5,
      submissions: 1,
      status: 'Inactive',
      dateUpdated: this.d,
      manager: 'Soujayna',
      createdBy: 'Amjed',
      createdAt: this.d,
    },
  ];
  constructor() {}

  addData(row: any) {
    const newd = new Date().toLocaleString();
    // tslint:disable-next-line: max-line-length
    this.rowData.unshift(row);
    this.dataChangedListener.next( [...this.rowData] );
  }

  addNewCandidate(row: any) {
    // tslint:disable-next-line: max-line-length
    this.candidates.unshift(row);
    this.candidateChangedListener.next( [...this.candidates] );
  }


  getDataChangedListener() {
    return this.dataChangedListener.asObservable();
  }

  getCandidateChangedListener() {
    return this.candidateChangedListener.asObservable();
  }

  getData() {
    return this.rowData;
  }

  getCandidates() {
    return this.candidates;
  }

  updateData(id: any, Data: any){

    console.log(id);
    for(let i = 0; i < this.rowData.length; i++){
      if(this.rowData[i].id === id){
        this.rowData[i] = Data;
        break;
      }
    }
    this.candidateChangedListener.next( [...this.candidates] );
  }
}
