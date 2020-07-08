import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-tab-general",
  templateUrl: "./tab-general.component.html",
  styleUrls: ["./tab-general.component.scss"],
})
export class TabGeneralComponent implements OnInit {
  @Input() general: any;
  @Input() notes: any;
  tradeNotes = null;
  constructor() {}

  ngOnInit() {
    console.log(this.notes)
  }
}
