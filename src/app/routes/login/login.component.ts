import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  public loginBehavior: any;
  public tryBehavior: any;
  public formLoginBehavior: any;
  public tryAccessBehavior: any;

  ngOnInit() {
  }

  public stretchRight() {
    this.loginBehavior = { sectionLoginOnFirstClick: true }
    this.tryBehavior = { sectionTryOnFirstClick: true }
    this.formLoginBehavior = { formLoginBehaviorOnFirstClick: true }
    this.tryAccessBehavior = { tryAccessBehaviorOnFirstClick: true }
  }

  public returnOrigin() {
    this.loginBehavior = { sectionLoginReturnOrigin: true }
    this.tryBehavior = { sectionTryReturnOrigin: true }
    this.tryAccessBehavior = { tryAccessBehaviorReturnOrigin: true }
    this.formLoginBehavior = { formLoginBehaviorReturnOrigin: true }
  }

}
