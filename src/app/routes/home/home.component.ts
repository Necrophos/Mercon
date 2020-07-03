import { ShareService } from "./../../services/share.service";
import { PurchaseService } from "./../../services/purchase.service";
import { SearchService } from "./../../services/search.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private shareService: ShareService,
    private purchaseService: PurchaseService
  ) {}

  locations: any;
  selectedCityId: number = null;

  searchForm = new FormGroup({
    trade_num: new FormControl("", [Validators.required]),
    origin: new FormControl(null, [Validators.required]),
    ref: new FormControl("", [Validators.required]),
    start_dt: new FormControl("", [Validators.required]),
    end_dt: new FormControl("", [Validators.required]),
  });

  result: any;
  listPurchaseItems: any;
  companyNum: any;

  page: number = 1;

  get trade_num() {
    return this.searchForm.value.trade_num;
  }

  get origin() {
    return this.searchForm.value.origin;
  }

  get ref() {
    return this.searchForm.value.ref;
  }

  get start_dt() {
    return this.searchForm.value.start_dt;
  }

  get end_dt() {
    return this.searchForm.value.end_dt;
  }

  ngOnInit() {
    const companyNum = this.shareService.getFirstCompanyNum();
    this.getAllPurchase(companyNum);
    this.getLocationDropdown(companyNum);
    this.shareService.clientChosen.subscribe((res) => {
      if (res) {
        this.getAllPurchase(res.companyNum);
      }
    });
  }

  searchByKeyword() {
    const keyword = {
      trade_num: this.trade_num,
      origin_num: this.origin.id.numLocation,
      start_dt: this.start_dt,
      end_dt: this.end_dt,
      ref: this.ref,
    };

    console.log(keyword);

    this.searchService.searchByKeyword(keyword).subscribe((res) => {
      this.result = res;
    });
  }

  getAllPurchase(companyNum) {
    this.purchaseService.getAllPurchase(companyNum).subscribe((res) => {
      this.listPurchaseItems = res;
    });
  }

  getLocationDropdown(companyNum) {
    this.searchService.getLocation(companyNum).subscribe((res) => {
      this.locations = res;
    });
  }

  clearForm() {
    this.searchForm.reset(this.searchForm.value);
  }
}
