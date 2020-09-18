import { environment } from "@env/environment";
import { ShareService } from "./../../services/share.service";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

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
    this.checkSession();
  }

  ngAfterViewInit() {
    this.shareService.breadcrumbChange.subscribe((res) => {
      if (res) {
        this.title = res;
        
      }
    });
  }

  checkSession() {
    const time_now = moment().valueOf();
    const timestamp = parseInt(localStorage.getItem("SESSION_EXPIRE"));
    const remain_time = timestamp - time_now;
    if (remain_time <= 0) {
      localStorage.clear();
      window.location.reload();
    } else {
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, remain_time);
    }
  }

  changeTitle() {}

  //sua lai phan in title dung even emit
}
