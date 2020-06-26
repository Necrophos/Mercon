import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface CustomResponse {
  rc: number;
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
}
