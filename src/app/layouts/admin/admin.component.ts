import { ShareService } from "./../../services/share.service";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  title = "home";
  tradeNumber = null;


  constructor(private router: Router, private shareService: ShareService) {}

  ngOnInit() {
    this.shareService.breadcrumbChange.subscribe((res) => {
      if (res) {
        this.title = res;
      }
    });

    this.shareService.tradeNumber.subscribe((res) => {
      if (res) {
        this.tradeNumber = res;
      }
    });
  }

  changeTitle() {}

  //sua lai phan in title dung even emit
}
