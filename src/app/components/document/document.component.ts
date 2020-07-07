import { ShareService } from '@services/share.service';
import { HomeService } from "@services/home.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {
  tradeNumber: any;
  blNumber: any;

  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private homeService: HomeService
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
}
