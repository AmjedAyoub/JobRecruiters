import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Candidate } from '../_models/candidate.model';
import { async } from 'rxjs/internal/scheduler/async';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

const BACKEND_URL = environment.apiUrl + '/candidates/';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candidates: Candidate[] = [];
  private candidatesUpdated = new Subject<{ candidates: Candidate[]; }>();

  constructor(private http: HttpClient, private router: Router) {}

   getcandidates() {
    this.http
      .get<{ message: string; candidates: any; }>(
        BACKEND_URL
      )
      .pipe(
        map(postData => {
          return {
            candidates: postData.candidates.map(candidate => {
                  return{
                    fullName: candidate.fullName,
                    email: candidate.email,
                    id: candidate._id,
                    resume: candidate.resume,
                    jobs: candidate.jobs
                  };
                }
            )
          };
        })
      )
      .subscribe(transformedPostData => {
        this.candidates = (transformedPostData).candidates;
        this.candidatesUpdated.next({
          candidates: [...this.candidates]
        });
      });
  }

  getCandidateUpdateListener() {
    return this.candidatesUpdated.asObservable();
  }

  getCandidate(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      phone: string;
      resume: string;
      jobs: [];
    }>(BACKEND_URL + id);
  }

  addCandidate(fullName: string, phone: string, email: string, resume: File = null) {
    const postData = new FormData();
    postData.append('fullName', fullName);
    postData.append('phone', phone);
    postData.append('email', email);
    console.log('resume');
    console.log(resume);
    postData.append('resume', resume);
    return this.http
      .post<{ message: string; candidate: Candidate }>(
        BACKEND_URL,
        postData
      );
  }

  updateCandidate(id: string, fullName: string, phone: string, email: string, jobs: [], resume: File | string) {
    let postData: Candidate | FormData;
    if (typeof resume === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('fullName', fullName);
      postData.append('phone', phone);
      postData.append('email', email);
      postData.append('resume', resume);
    }
    
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteCandidate(candidateId: string) {
    return this.http.delete(BACKEND_URL + candidateId);
  }
}
