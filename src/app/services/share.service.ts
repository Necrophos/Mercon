import { Injectable, EventEmitter } from "@angular/core";
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class ShareService extends BaseService {
  
  user = localStorage.getItem("USER");
  objUser = JSON.parse(this.user);
  showSidebar: EventEmitter<any> = new EventEmitter();
  client: EventEmitter<any> = new EventEmitter();
  breadcrumbChange: EventEmitter<any> = new EventEmitter();
  tradeNumber: EventEmitter<any> = new EventEmitter();
  purchaseDetail: any;
  
  setClient(client) {
    this.client.emit(client); 
  }

  displaySidebar(isShow) {
    this.showSidebar.emit(isShow);
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

  get getUserName() {
    return this.objUser.firstLastname;
  }

  get getUserEmail() {
    return this.objUser.email;
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
