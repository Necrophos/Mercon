import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from '@services/home.service';
import { ShareService } from '@services/share.service';

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
    private homeService: HomeService,
    private shareService: ShareService
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
      this.shareService.purchaseDetail = res;
      this.totalBags = this.shipmentInfoList.reduce((prev, cur) => prev + cur.totalBags, 0);
      // localStorage.setItem('PURCHASE_DETAIL', JSON.stringify(res));
      if(res.shipmentInfo.length <= 1) {
        this.router.navigate(["/purchase", tradeNum, 'bl', this.shipmentInfoList.length ? this.shipmentInfoList[0].blNumber : ''])
      }
    });
  }

}
