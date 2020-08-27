import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
// import { Job } from '../_models/';
// import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

const BACKEND_URL = environment.apiUrl + '/docs/';

@Injectable({ providedIn: 'root' })
export class DocsService {
  private posts: any[] = [];
  private postsUpdated = new Subject<{ posts: any[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getphotos() {
    this.http
      .get<{ message: string; photos: any }>(BACKEND_URL)
      .pipe(
        map((postData) => {
          return {
            posts: postData.photos.map((photo) => {
              return {
                url: photo.url,
                dateAdded: photo.dateAdded,
                userId: photo.userId,
              };
            }),
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
        });
      });
  }

  addPhoto(userId: string, image: File) {
    const postData = new FormData();
    const d = new Date();
    postData.append('image', image);
    postData.append('userId', userId);
    this.http.post<{ message: string; photo: any }>(
      BACKEND_URL,
      postData
    ).subscribe();
  }
}
