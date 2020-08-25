import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private isAuthenticated: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private router: Router) {}

  login(email: string, password: string): void {
    if (email === 'rec@recjob.com' && password === 'password'){
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      localStorage.setItem('isAuth', 'true');
      this.router.navigate(['search']);
    }
  }

  logout(): void{
    this.isAuthenticated = false;
    localStorage.removeItem('isAuth');
    this.authStatusListener.next(false);
    this.router.navigate(['']);
  }

  getIsAuth(): boolean{
    // this.isAuthenticated = localStorage.getItem('isAuth');
    if (this.isAuthenticated === true){
      return true;
    }
    return false;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}
