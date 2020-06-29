import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [AuthService],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  resetPasswordForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
  });

  get username() {
    return this.resetPasswordForm.value.username;
  }

  get email() {
    return this.resetPasswordForm.value.email;
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPassword(this.email, this.username)
        .subscribe((res) => {
          if (res.status) {
            this.router.navigate(["/"]);
          }
        });
    } else {
      console.log("false");
    }

    this.router.navigate(["/"]);
  }

  ngOnInit() {}
}
