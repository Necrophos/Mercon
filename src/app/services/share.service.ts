import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShareService {
  constructor() {}
  user = localStorage.getItem("USER");
  objUser = JSON.parse(this.user);

  clientChosen: EventEmitter<any> = new EventEmitter();

  getDataByClient(event) {
    this.clientChosen.emit(event); 
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
