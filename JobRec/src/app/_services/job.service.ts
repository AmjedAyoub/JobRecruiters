import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/jobs/';

@Injectable({
  providedIn: 'root',
})
export class JobService implements OnInit, OnDestroy {
  private JobsSub: Subscription;
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
  private jobData = [];

  constructor(
    private alertify: AlertifyService, private http: HttpClient
  ) {}

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.getData().subscribe( res => {
      this.jobData = res.jobs;
    });
    this.JobsSub = this.getjobChangedListener().subscribe((res) => {
      this.jobChangedListener.next([...this.jobData]);
    });
  }

  addData(row: any) {
    return this.http.post<{ message: string; job: any }>(BACKEND_URL, row);
  }

  deleteData(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }

  getjobChangedListener() {
    return this.jobChangedListener.asObservable();
  }

  getData() {
    return this.http
    .get<{ message: string; jobs: any }>(BACKEND_URL)
    .pipe(
      map((postData) => {
        return {
          jobs: postData.jobs.map((job) => {
            return {
              _id: job._id,
              title: job.title,
              team: job.team,
              status: job.status,
              skills: job.skills,
              description: job.description,
              position: job.position,
              createdAt: job.createdAt,
              updatedAt: job.updatedAt,
              createdBy: job.createdBy,
              manager: job.manager,
              candidates: job.candidates
            };
          }),
        };
      })
    );
  }

  updateData(id: any, Data: any) {
    return this.http.put<{ message: string; doc: any }>(BACKEND_URL + id, Data);
  }

  addSubmissions(id: any, Data: any) {
    return this.http.put<{ message: string; doc: any }>(BACKEND_URL + 'subs/' + id, Data);
  }

  deleteSubmissions(id: any, Data: any) {
    return this.http.put<{ message: string; doc: any }>(BACKEND_URL + 'delete/' + id, Data);
  }

  ngOnDestroy() {
    this.JobsSub.unsubscribe();
  }
}
