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
    this.shareService.getDataByClient(client);   
  }

  logOut() {
    localStorage.clear();
  }
  ngOnInit() { 
    this.listClientCompanies = this.shareService.getListCompany();
  }
}
