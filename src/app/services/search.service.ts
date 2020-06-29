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
    let user_id = localStorage.getItem(environment.USER_ID);

    const params = {
      trade_num: keyword.trade_num,
      start_dt: keyword.start_dt,
      origin_num: keyword.origin_num,
      ref: keyword.ref,
      platform: environment.PLATFORM_ID,
      user_id: user_id,
    };

    routes = this.apiService.createParams(routes, params);
    return this.apiService.callApi(routes);
  }
}
