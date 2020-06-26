import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) {

  }
  username ='asdfasfd';
  pass = '125412'

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
      note: 3
    },
  ];

  ngOnInit() {
    this.selectedCityId = this.cities[0].id;
    this.authService.login(this.username, this.pass);
  }
}
