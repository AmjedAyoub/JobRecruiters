import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobRec';
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.getIsAuth();
    this.authService.getisDark();
  }
}
