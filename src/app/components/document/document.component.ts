import { DocumentService } from './../../services/document.service';
import { ShareService } from '@services/share.service';
import { HomeService } from "@services/home.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from '@env/environment';

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {
  tradeNumber: any;
  blNumber: any;

  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private homeService: HomeService,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    const userId = this.shareService.getUserId();
    this.route.paramMap.subscribe((params) => {
      this.tradeNumber = params.get("trade_num");
      this.blNumber = params.get("bl_number");
    });
    const params = {
      trade_num: this.tradeNumber,
      bt_num: this.blNumber,
      userId: userId
    };
    this.getDocuments(params);
  }

  getDocuments(params) {
    this.homeService.getAllDocument(params).subscribe((res) => {
      // console.log(res);
    });
  }

  sendShipmentFileByEmail(fileName) {
    const req = {
      company_number: this.shareService.getCompany,
      file_name: fileName,
      mail_to: this.shareService.getUserEmail,
      platform: environment.PLATFORM_ID,
      device_id: environment.APP_ID,
      generated_by: this.shareService.getUserName
    }
    // console.log(req);
    
    this.documentService.sendByMail(req)
  }
}
