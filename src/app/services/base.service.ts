import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

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
  constructor(private http: HttpClient) {}


  callApi(apiEndpoint) {
    return this.http
      .get<CustomResponse>(apiEndpoint)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  protected handleError(error: any) {
    console.log(error);
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
}
