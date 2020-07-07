import { ShareService } from "./../../services/share.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ReportService } from "@services/report.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {
  reports: any;
  subVars: Subscription;
  companyNum;

  constructor(
    private reportService: ReportService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.companyNum = this.shareService.getCompany;
    this.getAllReports(this.companyNum);
    this.subVars = this.shareService.client.subscribe((res) => {
      if (res) {
        this.getAllReports(res.companyNum);
      }
    });
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }

  getAllReports(companyNum) {
    this.reportService.getAllReports(companyNum).subscribe((res) => {
      this.reports = res;
      // console.log(res);
      
    });
  }
}
