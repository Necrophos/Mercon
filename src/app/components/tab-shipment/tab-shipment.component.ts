import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-tab-shipment",
  templateUrl: "./tab-shipment.component.html",
  styleUrls: ["./tab-shipment.component.scss"],
})
export class TabShipmentComponent implements OnInit {
  @Input() shipment: any;
  @Input() tradeNumber: any;
  @Input() bl_number: any;
  shipmentData: any;
  departDate: any;
  arrivalDate: any;
  dayLeft: any;
  data;
  duration;
  progress;
  dashOffset = 340;
  isWaiting;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  formatDate(milliseconds) {
    return moment(milliseconds).format("YYYY[-]MM[-]DD");
  }

  ngOnInit() {
    this.data = this.shipment.find(
      (shipment) => shipment.blNumber == this.bl_number
    );
    if (this.data) {
      this.departDate = this.formatDate(this.data.depart_dt);
      this.arrivalDate = this.formatDate(this.data.arrive_dt);
      const day_depart = moment(this.data.depart_dt);
      const day_arr = moment(this.data.arrive_dt);
      const day_now = moment();
      this.dayLeft = day_arr.diff(day_now, "days");
      this.duration = day_arr.diff(day_depart, "days");

      if (day_now < day_depart) {
        this.dayLeft = this.duration;
        this.isWaiting = true;
      }
    }

    this.percentage();
  }

  percentage() {
    if (this.dayLeft < 0 || !this.dayLeft) {
      this.dayLeft = 0;
    } else {
      this.dashOffset = (this.dayLeft / this.duration) * 340;
    }

    this.dayLeft < 0
      ? (this.progress = 100)
      : (this.progress = ((this.duration - this.dayLeft) / this.duration) * 100);

    this.dayLeft == this.duration ? (this.progress = 0) : "";
  }

  onClickBOL() {
    if (this.bl_number)
      this.router.navigate([
        "/document",
        this.tradeNumber,
        this.bl_number,
      ]);
  }
}
