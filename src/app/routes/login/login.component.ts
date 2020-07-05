import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from '@env/environment';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  loginResponse: any;

  ngOnInit() {}

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

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.username, this.password).subscribe((res) => {
        if (res.status) {
          this.router.navigate(["/admin/home"]);
        }
      });
    }
  }
}
