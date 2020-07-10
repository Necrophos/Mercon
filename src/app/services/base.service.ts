import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

export interface CustomResponse {
  status: boolean;
  message: string;
  [key: string]: any;
}

@Injectable({
  providedIn: "root",
})
export class BaseService {
  protected configs;

  constructor(private http: HttpClient,  private toastr: ToastrService) {}

  get(apiEndpoint, param?) {
    if(param) {
      apiEndpoint = this.createParams(apiEndpoint, param);
    }
    return this.http
      .get<CustomResponse>(apiEndpoint)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  post(url, data) {
    return this.http.post(url, data).pipe(
            map((response) => response),
            catchError(this.handleError)
          );
  }
  protected handleError = (error: any) => {
    console.log(error.error);
    this.toastr.error(error.error, 'Error!');
    return throwError(error);
  }

  createParams(routes, params) {
    Object.keys(params).map((key) => {
      if (params[key]) {
        routes += `${key}=${params[key]}&`;
      }
    });
    return (routes = routes.substring(0, routes.length - 1));
  }

  get getCompany(): any {
    return localStorage ? localStorage.getItem('company') || '' : '';
  }

  set companyNum(company) {
    localStorage ? localStorage.setItem('company', company) : null;
  }

  get user(): any {
    return localStorage ? JSON.parse(localStorage.getItem('USER')) || '' : '';
  }

  set user(user: any) {
    localStorage ? localStorage.setItem('USER', JSON.stringify(user)) : null;
  }
}
