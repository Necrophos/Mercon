import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from '@env/environment';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  listClientCompanies: any;
  user = localStorage.getItem(environment.USER);
  objUser = JSON.parse(this.user);

  constructor() {}

  ngOnInit() { 
    this.listClientCompanies = this.objUser.internalCompanies;
  }
}
