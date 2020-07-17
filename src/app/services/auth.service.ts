import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "@env/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService{

  public login(username, password) {
    let routes = `${environment.loginEndpoint}?`;
    const params = {
      username: username,
      password: password,
      platform: environment.PLATFORM_ID,
      app_id: environment.APP_ID,
      version : "1.0",
      build : "1.0",
      device_token : environment.PLATFORM_ID,
      device_id : environment.PLATFORM_ID
    };
    return this.post(routes, params).pipe(
      map((res: any) => {
        // console.log(res)
        if (res.status) {
           this.companyNum = res.user.internalCompanies[0].companyNum;
          //  console.log(this.companyNum)
          this.user = res.user;
          //  localStorage.setItem('USER', res.user);
        }
        return res;
     })
    );
  }

  public resetPassword(email, username) {
    let routes = `${environment.api}/resetPasswordRequest?`;
    const params = {
      email: email,
      user_name: username,
      platform: environment.PLATFORM_ID,
    };
    return this.get(routes, params)
  }

  isLoggedIn(): boolean {
    return !!this.user;
 }
  
}
