import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class AuthService {
  private isAuthenticated: any;
  private authStatusListener = new Subject<boolean>();
  private isDark = 'false';
  private isDarkListener = new Subject<boolean>();

  constructor(private router: Router, private alertifyService: AlertifyService) {}

  login(email: string, password: string): void {
    if (email === 'rec@jobrec.com' && password === 'password'){
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('isDark', 'false');
      this.isDarkListener.next(false);
      this.router.navigate(['search']);
      this.alertifyService.success('Logged In successfully');
    }
  }

  logout(): void{
    this.alertifyService.confirm('Are you sure you want to logout?', () => {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuth');
      this.authStatusListener.next(false);
      this.router.navigate(['']);
    });
  }

  getIsAuth(): boolean{
    this.isAuthenticated = localStorage.getItem('isAuth');
    if (!this.isAuthenticated){
      return false;
    }
    return true;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getisDark(): boolean{
    this.isDark = localStorage.getItem('isDark');
    if (this.isDark === 'false'){
      return false;
    }
    return true;
  }

  switchMode () {
    if (this.isDark === 'false'){
      this.isDark = 'true';
      localStorage.setItem('isDark', 'true');
      this.isDarkListener.next(true);
    }else{
      this.isDark = 'false';
      localStorage.setItem('isDark', 'false');
      this.isDarkListener.next(false);
    }
  }

  getisDarkListener() {
    return this.isDarkListener.asObservable();
  }
}
