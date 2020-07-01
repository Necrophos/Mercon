import { PurchaseService } from "./../../services/purchase.service";
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
  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
  }


}
