import { Injectable, EventEmitter } from "@angular/core";
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class ShareService extends BaseService {
  
  user = localStorage.getItem("USER");
  objUser = JSON.parse(this.user);
  client: EventEmitter<any> = new EventEmitter();
  breadcrumbChange: EventEmitter<any> = new EventEmitter();
  tradeNumber: EventEmitter<any> = new EventEmitter();

  
  setClient(client) {
    this.client.emit(client); 
  }

  getBreadcrumb(event) {
    this.breadcrumbChange.emit(event);
  }

  getTradeNumber(event) {
    this.tradeNumber.emit(event);
  }

  getUserId() {
    return this.objUser.userId;
  }

  getUser() {
    return this.objUser;
  }

  getListCompany() {
    return this.objUser.internalCompanies;
  }

  getFirstCompanyNum() {
    return this.objUser.internalCompanies[0].companyNum;
  }
}
