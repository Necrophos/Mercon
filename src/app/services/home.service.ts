import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class HomeService extends BaseService{

  getAllPurchase(companyNum) {
    let routes = `${environment.api}/getAllPurchaseBySearch?company_num=${companyNum}`;
    return this.get(routes);
  }

  getPurchaseDetail(tradeNum) {
    let routes = `${environment.api}/getPurchaseDetail?trade_num=${tradeNum}`;
    return this.get(routes);
  }

  getAllDocument(paramsObj) {
    let routes = `${environment.api}/getFilesForShipment?`;
    const params = {
      trade_num: paramsObj.trade_num,
      bl_num: paramsObj.bt_num,
      platform: environment.PLATFORM_ID,
      app_id: environment.APP_ID,
    }
    return this.get(routes, params);
  }

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

    return this.get(routes, params);
  }

  getLocation(companyNum) {
    let routes = `${environment.dropdownEndpoint}?counterpart=${companyNum}`;
    return this.get(routes);
  }
}
