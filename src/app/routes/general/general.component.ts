import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  tabs: string[] = ["Home", "About me", "Contacts", "Map"];
  data: any;
  blNumber: any;
  tradeNumber: any;
  routeParams;

  generalData: any;
  shipmentData: any;
  containerData: any;
  notes = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("PURCHASE_DETAIL"));
    this.containerData = this.data["containerInfo"];
    this.generalData = this.data["generalInfo"];
    this.routeParams = this.route.params.subscribe((routeParams) => {
      this.blNumber = routeParams.bl_number;
      this.tradeNumber = routeParams.trade_num;
      this.shipmentData = this.data["shipmentInfo"].find(
        (shipmentItem) => shipmentItem.blNumber == this.blNumber
      );
      this.notes = this.shipmentData;
    });
  }
}
