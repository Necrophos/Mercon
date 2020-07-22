import { HomeService } from "../../services/home.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-purchase-infor",
  templateUrl: "./purchase-infor.component.html",
  styleUrls: ["./purchase-infor.component.scss"],
})
export class PurchaseInforComponent implements OnInit {
  public routeParams;
  purchaseDetail: any;
  page: number = 1;
  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit() {
  }


}
