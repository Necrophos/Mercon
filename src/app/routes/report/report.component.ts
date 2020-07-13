import { DocumentService } from './../../services/document.service';
import { ShareService } from "./../../services/share.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ReportService } from "@services/report.service";
import { Subscription } from "rxjs";
import { environment } from '@env/environment';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {
  reports: any;
  subVars: Subscription;
  host;
  companyNum;

  constructor(
    private reportService: ReportService,
    private shareService: ShareService,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.host = environment.host;
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
      console.log(res);
      
    });
  }

  sendShipmentFileByEmail(file) {
    const userId = this.shareService.getUserId();
    const req = {
      company_num: this.shareService.getCompany,
      file_name: file.fileName,
      mail_to: this.shareService.getUserEmail,
      platform: environment.PLATFORM_ID,
      device_id: environment.APP_ID,
      generated_by: this.shareService.getUserName,
      physical_route: `${environment.host}${file.pRoute}`,
      user_id: userId,
      file_id: file.fileId
    }

    console.log(req);
    
    this.documentService.sendByMail(req).subscribe((res) => {
      console.log(res);
      
    })
  }
}
