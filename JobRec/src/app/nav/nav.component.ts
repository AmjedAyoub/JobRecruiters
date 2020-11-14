import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuth = false;
  isSearch = true;
  faCog = faCog;
  isDark = false;

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
    this.isDark = this.authService.getisDark();
    this.authService.getisDarkListener().subscribe(res => {
        this.isDark = res;
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

  switchMode(){
    this.authService.switchMode();
    this.isDark = this.authService.getisDark();
  }
}
