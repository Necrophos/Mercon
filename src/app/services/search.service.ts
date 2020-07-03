import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: BaseService) { }

  searchByKeyword(keyword) {
    let routes = `${environment.api}/getAllPurchaseBySearch?`;
    let user_id = localStorage.getItem('USER_ID');

    const params = {
      company_num: environment.COMPANY_NUM,
      trade_num: keyword.trade_num,
      start_dt: keyword.start_dt,
      end_dt: keyword.end_dt,
      origin_num: keyword.origin_num,
      ref: keyword.ref,
      platform: environment.PLATFORM_ID,
      user_id: user_id,
    };

    routes = this.apiService.createParams(routes, params);
    return this.apiService.callApi(routes);
  }

  getLocation(companyNum) {
    let routes = `${environment.dropdownEndpoint}?counterpart=${companyNum}`;
    return this.apiService.callApi(routes);
  }
}
