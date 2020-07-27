import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
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
  shipmentInfo;
  purchaseDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.routeParams = this.route.params.subscribe((routeParams) => {
      this.tradeNumber = routeParams.trade_num;
      this.shareService.getBreadcrumb('purchase');
      this.shareService.getTradeNumber(this.tradeNumber)
      this.getPurchaseDetail(this.tradeNumber);
    });
  }

  getPurchaseDetail(tradeNum) {
    this.homeService.getPurchaseDetail(tradeNum).subscribe((res) => {
      this.shipmentInfoList = res['shipmentInfo'];
      this.purchaseDetail = res;
      this.shareService.purchaseDetail = this.purchaseDetail;
      this.totalBags = this.shipmentInfoList.reduce((prev, cur) => prev + cur.totalBags, 0);
    });
  }

  goToGeneral(index) {
    this.shareService.shipmentInfo = this.shipmentInfoList[index];
    this.router.navigate(['/purchase',this.tradeNumber, 'general'])
  }

}
