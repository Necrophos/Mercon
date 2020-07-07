import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-tab-container",
  templateUrl: "./tab-container.component.html",
  styleUrls: ["./tab-container.component.scss"],
})
export class TabContainerComponent implements OnInit {
  @Input() containers: any;
  sumBags;

  constructor() {}

  ngOnInit() {
    // console.log(this.containers);
    this.sumBags = this.containers.reduce(function (prev, cur) {
      return prev + cur.bags;
    }, 0);
  }
}
