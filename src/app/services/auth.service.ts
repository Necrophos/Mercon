import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "@env/environment";

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
    };
    return this.get(routes, params);
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

  
}
