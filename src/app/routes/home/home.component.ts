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
  constructor(private searchService: SearchService) {}

  searchForm = new FormGroup({
    trade_num: new FormControl("", [Validators.required]),
    origin: new FormControl("Vilnius", [Validators.required]),
    ref: new FormControl("", [Validators.required]),
    start_dt: new FormControl("", [Validators.required]),
    end_dt: new FormControl("", [Validators.required]),
  });

  result: any;

  cities = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys" },
  ];
  selectedCityId: number = null;

  page: number = 1;
  listTrades = [
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Pending",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Pending",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Pending",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Pending",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Pending",
    },
    {
      number: 1175472,
      ref: 1175472,
      quality: "VIE-EPW 15/16 CP",
      period: "Apr 2020",
      bags: "7360",
      status: "Going",
      note: 3,
    },
  ];

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

  searchByKeyword() {
    const keyword = {
      trade_num: this.trade_num,
      origin_num: this.origin,
      start_dt: this.start_dt,
      ref: this.ref,
    };

    this.searchService.searchByKeyword(keyword).subscribe((res) => {
      this.result = res;
    });
  }

  ngOnInit() {}
}
