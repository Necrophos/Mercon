import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

  reports = [
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
    {
      fileName: 'Starbuck Position Report as of Jun 22.xls',
      date: '27-10-2019'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
