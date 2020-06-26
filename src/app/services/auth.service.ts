import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private apiService: BaseService) {}

  public login(username, password) {
    let routes = `${environment.loginEndpoint}?`;
    const params = {
      username: username,
      password: password,
      platform: environment.PLATFORM_ID,
      app_id: environment.APP_ID,
    };
    routes = this.createParams(routes, params);
    return this.apiService.callApi(routes);
  }

  public resetPassword(email, username) {
    let routes = `${environment.api}/resetPasswordRequest?`;
    const params = {
      email: email,
      username: username,
      platform: environment.PLATFORM_ID,
    };
    routes = this.createParams(routes, params);
    return this.apiService.callApi(routes)
  }

  createParams(routes, params) {
    Object.keys(params).map((key) => {
      if (params[key]) {
        routes += `${key}=${params[key]}&`;
      }
    });
    return (routes = routes.substring(0, routes.length - 1));
  }
}
