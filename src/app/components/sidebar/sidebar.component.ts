import { Subscription } from "rxjs";
import { ShareService } from "./../../services/share.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  listClientCompanies: any;
  client: any;
  isShow = false;
  subVars: Subscription;

  constructor(private shareService: ShareService) {}

  changeClient(client) {
    this.shareService.setClient(client);
    this.shareService.companyNum = client.companyNum;
  }

  changeBreadcrumb(routes) {
    this.shareService.getBreadcrumb(routes);
    this.shareService.getTradeNumber("");
    this.isShow = false;
  }

  logOut() {
    localStorage.clear();
  }

  exitSidebar() {
    this.isShow = false;
  }

  ngOnInit() {
    this.listClientCompanies = this.shareService.getListCompany();
    this.subVars = this.shareService.showSidebar.subscribe((res) => {
      if (res) {
        this.isShow = res;
      }
    });
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }
}
