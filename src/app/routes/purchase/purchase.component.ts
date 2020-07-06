import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HomeService } from '@services/home.service';

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  public routeParams;
  public tradeNumber;
  purchaseDetail: any;
  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.routeParams = this.route.params.subscribe((routeParams) => {
      this.tradeNumber = routeParams.trade_num;;
      this.getPurchaseDetail(this.tradeNumber);
    });
  }

  getPurchaseDetail(tradeNum) {
    this.homeService.getPurchaseDetail(tradeNum).subscribe((res) => {
      this.purchaseDetail = res;   
    });
  }
}
