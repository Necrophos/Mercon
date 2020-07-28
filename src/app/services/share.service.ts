import { Injectable, EventEmitter } from "@angular/core";
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class ShareService extends BaseService {
  
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
    return this.user.userId;
  }

  get getUserName() {
    return this.user.userName;
  }

  get getUserEmail() {
    return this.user.email;
  }

  getUser() {
    return this.user;
  }

  getListCompany() {
    return this.user.internalCompanies;
  }

  getFirstCompanyNum() {
    return this.user.internalCompanies[0].companyNum;
  }
}
