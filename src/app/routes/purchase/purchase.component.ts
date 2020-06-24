import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor() { }
  listTrades = [
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
    {
      number: 1175472,
      vessel: "VIE-EPW 15/16 CP",
      bags: "7360",
      status: "Approved",
    },
  ];

  ngOnInit() {
  }

}
