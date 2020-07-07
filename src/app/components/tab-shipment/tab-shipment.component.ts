import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-tab-shipment",
  templateUrl: "./tab-shipment.component.html",
  styleUrls: ["./tab-shipment.component.scss"],
})
export class TabShipmentComponent implements OnInit {
  @Input() shipment: any;
  @Input() tradeNumber: any;
  shipmentData: any;
  departDate: any;
  arrivalDate: any;

  constructor() {}

  formatDate(milliseconds) {
    return moment(milliseconds).format("YYYY[-]MM[-]DD");
  }

  ngOnInit() {
    if (this.shipment) {
      this.departDate = this.formatDate(this.shipment.depart_dt);
      this.arrivalDate = this.formatDate(this.shipment.arrival_dt);
    }
  }
}
