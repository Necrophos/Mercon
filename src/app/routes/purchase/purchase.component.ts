import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PurchaseService } from "@services/purchase.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  listTrades = [
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
  ];
  public routeParams;
  public tradeNumber;
  purchaseDetail: any;
  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    this.routeParams = this.route.params.subscribe((routeParams) => {
      this.tradeNumber = routeParams.trade_num;;
      this.getPurchaseDetail(this.tradeNumber);
    });
  }

  getPurchaseDetail(tradeNum) {
    this.purchaseService.getPurchaseDetail(tradeNum).subscribe((res) => {
      this.purchaseDetail = res;
      // console.log(this.purchaseDetail);
    });
  }
}
