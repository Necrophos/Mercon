import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent implements OnInit {
  tabs: string[] = ["Home", "About me", "Contacts", "Map"];
  @Input() data: any;

  generalData: any;
  shipmentData: any;
  containerData: any;

  constructor() {}

  ngOnInit() {
    this.containerData = this.data['containerInfo'];
    this.generalData = this.data['generalInfo'];
    this.shipmentData = this.data['shipmentInfo']
  }
}
