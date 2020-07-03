import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShareService {
  constructor() {}
  user = localStorage.getItem("USER");
  objUser = JSON.parse(this.user);

  clientChosen: EventEmitter<any> = new EventEmitter();
  breadcrumbChange: EventEmitter<any> = new EventEmitter();
  tradeNumber: EventEmitter<any> = new EventEmitter();

  getDataByClient(event) {
    this.clientChosen.emit(event); 
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
