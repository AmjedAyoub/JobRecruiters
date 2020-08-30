import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void{
    this.signInForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      })
    });

    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth){
      this.router.navigate(['search']);
    }

    this.authService.getAuthStatusListener().subscribe(
      (res) => {
          this.isAuth = res;
          if (this.isAuth){
            this.router.navigate(['search']);
          }
      });
  }



  onSigningIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password);
  }
}
