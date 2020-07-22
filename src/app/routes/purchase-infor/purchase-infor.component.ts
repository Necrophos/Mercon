import { ShareService } from '@services/share.service';
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
  purchaseInfos: any;
  page: number = 1;
  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      const userId = this.shareService.getUserId();
      this.homeService.getPSSInfo(routeParams.trade_num, userId).subscribe((res) => {
        this.purchaseInfos = res;
      })
    });
    
  }


}
