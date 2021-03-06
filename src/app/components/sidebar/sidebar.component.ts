import { Subscription } from "rxjs";
import { ShareService } from "./../../services/share.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

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

  constructor(private shareService: ShareService, private router: Router) {}

  changeClient(client) {
    this.shareService.setClient(client);
    this.shareService.companyNum = client.companyNum;
    this.isShow = false;
  }

  changeBreadcrumb(routes) {
    this.shareService.getBreadcrumb(routes);
    this.shareService.getTradeNumber("");
    this.isShow = false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
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
