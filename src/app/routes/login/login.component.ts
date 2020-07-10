import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "@env/environment";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  loginResponse: any;
  error: any;

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get username() {
    return this.loginForm.value.username;
  }

  get password() {
    return this.loginForm.value.password;
  }

  close() {
    this.error = false;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.username, this.password).subscribe((res) => {
        if (res.status) {
          this.router.navigate(["/admin/home"]);
          this.setSession();
          // this.toastr.success('Login Success', 'Toastr fun!');
        } else {
          this.error = true;
          // this.toastr.error('everything is broken', 'Major Error');
        }
      });
    } else {
      this.error = true;
    }
  }

  setSession() {
    const time_now = moment().valueOf();
    const timeOut = time_now + environment.SESSION_EXPIRE * 60000;
    localStorage.setItem("SESSION_EXPIRE", timeOut.toString());
  }
}
