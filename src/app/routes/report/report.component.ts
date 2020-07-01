import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "@env/environment";
import { ReportService } from "@services/report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {
  user = localStorage.getItem(environment.USER);
  objUser = JSON.parse(this.user);
  companyNum = this.objUser.internalCompanies[0].companyNum;

  reports: any;
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    this.reportService.getAllReports(this.companyNum).subscribe((res) => {
      this.reports = res;
    });
  }
}
