import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  constructor(private apiService: BaseService) {}

  getAllPurchase(companyNum) {
    let routes = `${environment.api}/getAllPurchaseBySearch?company_num=${companyNum}`;
    return this.apiService.callApi(routes);
  }

  getPurchaseDetail(tradeNum) {
    let routes = `${environment.api}/getPurchaseDetail?trade_num=${tradeNum}`;
    return this.apiService.callApi(routes);
  }
}
