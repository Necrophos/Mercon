import { ShareService } from './../../services/share.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  listClientCompanies: any;
  client: any;

  constructor(private shareService: ShareService) {}

  changeClient(client) {
    this.shareService.setClient(client);
    this.shareService.companyNum = client.companyNum;
  }

  changeBreadcrumb(routes) {
    this.shareService.getBreadcrumb(routes);
    this.shareService.getTradeNumber('');
  }

  logOut() {
    localStorage.clear();
  }
  ngOnInit() { 
    this.listClientCompanies = this.shareService.getListCompany();
  }
}
