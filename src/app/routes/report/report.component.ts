import { ShareService } from './../../services/share.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ReportService } from "@services/report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {


  reports: any;
  constructor(private reportService: ReportService, private shareService: ShareService) {}

  ngOnInit() {
    const companyNum = this.shareService.getFirstCompanyNum();
    this.getAllReports(companyNum);
  }

  getAllReports(companyNum) {
    this.reportService.getAllReports(companyNum).subscribe((res) => {
      this.reports = res;
    });
  }
}
