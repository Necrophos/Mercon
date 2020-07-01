import { Router,Event, NavigationStart, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  title: string;

  constructor(private router: Router) {
     router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle();
      }
    });
  }

  ngOnInit() {
  }

  changeTitle() {
    this.title = this.router.url;
    this.title = this.title.substring(7, this.title.length);
  }
}
