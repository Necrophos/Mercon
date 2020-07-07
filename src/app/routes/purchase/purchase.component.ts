import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from '@services/home.service';

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  public routeParams;
  public tradeNumber;
  totalBags;
  shipmentInfoList: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.routeParams = this.route.params.subscribe((routeParams) => {
      this.tradeNumber = routeParams.trade_num;
      this.getPurchaseDetail(this.tradeNumber);
    });
  }

  getPurchaseDetail(tradeNum) {
    this.homeService.getPurchaseDetail(tradeNum).subscribe((res) => {
      this.shipmentInfoList = res['shipmentInfo'];
      this.totalBags = this.sum(this.shipmentInfoList)
      localStorage.setItem('PURCHASE_DETAIL', JSON.stringify(res));
      if(res.shipmentInfo.length == 1) {
        this.router.navigate(["admin/purchase", tradeNum, this.shipmentInfoList[0].blNumber])
      }
      if(res.shipmentInfo.length == 0) {
        this.router.navigate(["admin/purchase", tradeNum, 'undefiled'])
      }
    });
  }

  sum(array) {
    return array.reduce(function (prev, cur) {
      return prev + cur.totalBags;
    }, 0);
  }
}
