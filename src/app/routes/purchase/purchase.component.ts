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
      this.getPurchaseDetail(this.tradeNumber);
    });
  }

  getPurchaseDetail(tradeNum) {
    this.homeService.getPurchaseDetail(tradeNum).subscribe((res) => {
      this.shipmentInfoList = res['shipmentInfo'];
      this.purchaseDetail = res;
      this.totalBags = this.shipmentInfoList.reduce((prev, cur) => prev + cur.totalBags, 0);
      if(this.shipmentInfoList.length == 1) {
        this.shareService.shipmentInfo = this.shipmentInfoList[0];
        this.router.navigate(["/purchase", tradeNum, 'general'])
      }
    });
  }

  goToGeneral (index) {
    this.purchaseDetail.shipmentInfo = this.shipmentInfoList[index];
    this.shareService.purchaseDetail = this.purchaseDetail;
    this.router.navigate(['/purchase',this.tradeNumber, 'general'])
  }

}
