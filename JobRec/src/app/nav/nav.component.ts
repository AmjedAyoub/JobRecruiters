import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuth = false;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(
      (res) => {
          this.isAuth = res;
      });
  }

  logout(){
    this.authService.logout();
  }
}
