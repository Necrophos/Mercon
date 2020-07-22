import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [AuthService],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  error: any;

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
    if (this.username || this.email) {
      this.authService
        .resetPassword(this.email, this.username)
        .subscribe((res) => {
          if (res.status) {
            // this.router.navigate(["/"]);
            this.toastr.success("Request Successful, you'll receive email in a minute!", "Success");
          }
          // console.log(res.status);

          if (!res.status) {
            this.error = true;
          }
        });
    } else {
      this.error = true;
    }
  }

  ngOnInit() {}
}
