import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Candidate } from '../_models/candidate.model';

import { environment } from '../../environments/environment';
// import { Job } from '../_models/';
// import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

const BACKEND_URL = environment.apiUrl + '/docs/';

@Injectable({ providedIn: 'root' })
export class DocsService {
  private docs: any[] = [];
  private docsUpdated = new Subject<{ docs: any[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getDocs() {
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
      )
      .subscribe((transformedPostData) => {
        this.docs = transformedPostData.docs;
        this.docsUpdated.next({
          docs: [...this.docs],
        });
      });
  }

  addDoc(fullName: string, email: string, phone: string, skills: any,  jobs: any, doc: File | string) {
    console.log('jobs');
    console.log(jobs);
    const postData = new FormData();
    postData.append('doc', doc);
    postData.append('fullName', fullName);
    postData.append('email', email);
    postData.append('phone', phone);
    postData.append('skills', skills);
    postData.append('jobs', jobs);
    return this.http.post<{ message: string; doc: any }>(BACKEND_URL, postData);
  }

  getDoc(id: string) {
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

  updateDoc(id: string, fullName: string, email: string, phone: string, skills: any, jobs: any, resume: File | string) {
    const postData = new FormData();
    postData.append('fullName', fullName);
    postData.append('email', email);
    postData.append('phone', phone);
    postData.append('jobs', jobs);
    postData.append('skills', skills);
    postData.append('doc', resume);
    postData.append('id', id);

    return this.http.put(BACKEND_URL + id, postData);
  }

  getDocsUpdateListener() {
    return this.docsUpdated.asObservable();
  }

  deleteDoc(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
