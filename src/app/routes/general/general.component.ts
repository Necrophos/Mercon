import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShareService } from "@services/share.service";
import { HomeService } from "@services/home.service";
import { Location } from '@angular/common';

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
    private shareService: ShareService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tradeNumber = params.trade_num;
      this.data = this.shareService.purchaseDetail;
      if(this.data) this.getNote();
      else this.router.navigate(['/purchase',this.tradeNumber])
    })
  }

  getNote() {
    let shipment = this.shareService.shipmentInfo;
    this.notes = shipment ? shipment.tradeNotes : '';
  }
}
