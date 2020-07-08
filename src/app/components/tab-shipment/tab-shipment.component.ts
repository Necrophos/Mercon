import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}

  formatDate(milliseconds) {
    return moment(milliseconds).format("YYYY[-]MM[-]DD");
  }

  ngOnInit() {
    this.data = this.shipment.find(
      shipment => shipment.blNumber == this.bl_number
    );
    if(this.data) {    
   
      this.departDate = this.formatDate(this.data.depart_dt);
      this.arrivalDate = this.formatDate(this.data.arrival_dt);

      const departDay = moment(this.data.depart_dt).format('D');
      const arrivalDay = moment(this.data.arrival_dt).format('D');
      this.dayLeft = parseInt(departDay) - parseInt(arrivalDay)
      console.log(this.dayLeft);
      
      
    }
  }

  onClickBOL() {
    if(this.bl_number) this.router.navigate(['/admin/document', this.tradeNumber, this.bl_number])
  }
}
