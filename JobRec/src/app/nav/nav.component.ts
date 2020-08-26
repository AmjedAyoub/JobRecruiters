import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuth = false;
  isSearch = true;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const url = window.location.href;
    if (url.endsWith('candidates')){
      this.isSearch = false;
    }else{
      this.isSearch = true;
    }
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(
      (res) => {
          this.isAuth = res;
      });
  }

  logout(){
    this.authService.logout();
  }

  onPageChanged(page: string){
    if (page === 'search'){
      this.isSearch = true;
      this.router.navigate(['search']);
    }else{
      this.isSearch = false;
      this.router.navigate(['candidates']);
    }
  }
}
