import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/candidates/';

@Injectable({ providedIn: 'root' })
export class CandidatesService implements OnInit, OnDestroy {
  private candidates: any[] = [];
  private candidatesSub: Subscription;
  private candidatesChangedListener = new Subject<
    {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      skills: string[];
      jobs: string[];
      resume: string;
    }[]
  >();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.getCandidates().subscribe(res => {
      this.candidates = res.docs;
    });
    this.candidatesSub = this.getCandidatesUpdateListener().subscribe((res) => {
      this.candidatesChangedListener.next([...this.candidates]);
    });
  }

  getCandidates() {
    return this.http
      .get<{ message: string; docs: any }>(BACKEND_URL)
      .pipe(
        map((postData) => {
          return {
            docs: postData.docs.map((doc) => {
              return {
                _id: doc._id,
                url: doc.url,
                fullName: doc.fullName,
                email: doc.email,
                phone: doc.phone,
                skills: doc.skills,
                jobs: doc.jobs
              };
            }),
          };
        })
      );
  }

  addCandidate(fullName: string, email: string, phone: string, skills: any, doc: File | string) {
    const postData = new FormData();
    postData.append('doc', doc);
    postData.append('fullName', fullName);
    postData.append('email', email);
    postData.append('phone', phone);
    postData.append('skills', skills);
    return this.http.post<{ message: string; doc: any }>(BACKEND_URL, postData);
  }

  getCandidate(id: string) {
    return this.http.get<{
      _id: string;
      url: string;
      fullName: string;
      email: string;
      phone: string;
      skills: [];
      jobs: []
    }>(BACKEND_URL + id);
  }

  updateCandidate(id: string, fullName: string, email: string, phone: string, skills: any, jobs: any, resume: File | string) {
    const postData = new FormData();
    postData.append('fullName', fullName);
    postData.append('email', email);
    postData.append('phone', phone);
    postData.append('jobs', jobs);
    postData.append('skills', skills);
    postData.append('doc', resume);
    postData.append('id', id);
    return this.http.put<{ message: string; doc: any }>(BACKEND_URL + id, postData);
  }

  getCandidatesUpdateListener() {
    return this.candidatesChangedListener.asObservable();
  }

  deleteCandidate(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }

  ngOnDestroy() {
    this.candidatesSub.unsubscribe();
  }
}
