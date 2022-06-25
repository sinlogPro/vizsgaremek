import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
// import { AuthService, ILoginData } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginData: ILoginData = {};
  // loginData: {email?: string, password?: string} = {};
  loginData: {username?: string, password?: string} = {};

  constructor(
    private auth: AuthService,
    // private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  // onLogin(): void {
  //   this.auth.login(this.loginData);
  // }
  onLogin(): void {
    // console.log(this.loginData);
    this.auth.login(this.loginData)
  }

}
