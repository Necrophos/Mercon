import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShareService } from "@services/share.service";
import { HomeService } from "@services/home.service";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  data: any;
  notes = null;
  
  tradeNumber;
  bl_number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.data = this.shareService.purchaseDetail;
    if(this.data) this.getNote();
    this.activatedRoute.params.subscribe(params => {
      this.tradeNumber = params.trade_num;
      this.bl_number = params.bl_number;
      this.homeService.getPurchaseDetail(params.trade_num).subscribe((res) => {
        this.data = res;
        this.getNote();
      });
    })
  }

  getNote() {
    let shipment = this.data.shipmentInfo.find(shipment => shipment.blNumber == this.bl_number);
    this.notes = shipment ? shipment.tradeNotes : '';
  }
}
