import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: BaseService) { }

  getAllReports(companyNum) {
    let routes = `${environment.api}/getFilesForClient?company_num=${companyNum}`;
    return this.apiService.callApi(routes);
  }
}