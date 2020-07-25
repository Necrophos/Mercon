import { ShareService } from "./../../services/share.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HomeService } from '@services/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
})

export class HomeComponent implements OnInit, OnDestroy  {
  constructor(
    private homeService: HomeService,
    private shareService: ShareService
  ) {
    this.shareService.getBreadcrumb('home');
    this.shareService.getTradeNumber('')
  }

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
  subVars: Subscription;
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
    this.companyNum = this.shareService.getCompany;
    this.getAllPurchase(this.companyNum);
    this.getLocationDropdown(this.companyNum);
    this.subVars = this.shareService.client.subscribe((res) => {
      if (res) {
        this.page = 1;
        this.listPurchaseItems = [];
        this.getAllPurchase(res.companyNum);
        this.getLocationDropdown(res.companyNum);
      }
    });
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe()
    }
  }

  searchByKeyword() {
    const keyword = {
      trade_num: this.trade_num,
      origin_num: this.origin ? this.origin.id.numLocation : null,
      // start_dt: this.start_dt,
      // end_dt: this.end_dt,
      company_num: this.shareService.getCompany,
      ref: this.ref,
    };

    this.homeService.searchByKeyword(keyword).subscribe((res) => {
      this.listPurchaseItems = res;
    });
  }

  getAllPurchase(companyNum) {
    this.homeService.getAllPurchase(companyNum).subscribe((res) => {
      this.listPurchaseItems = res.sort((a, b) => (a.purchaseDate > b.purchaseDate) ? -1 : 1);    
    });
  }

  getLocationDropdown(companyNum) {
    this.homeService.getLocation(companyNum).subscribe((res) => {
      this.locations = res;
    });
  }

  clearForm() {
    this.searchForm.reset();
    this.getAllPurchase(this.companyNum);
  }

  changeBreadcrumb(routes, tradeNumber) {
    this.shareService.getBreadcrumb(routes);
    this.shareService.getTradeNumber(tradeNumber)
  }
}
