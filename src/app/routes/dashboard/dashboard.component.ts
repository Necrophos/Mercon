import { ShareService } from './../../services/share.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit {
  cities = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys" },
  ];
  selectedCityId: number = null;
  constructor(private dashboardService: DashboardService, private shareService: ShareService) { }

  getTargetBagsChart(companyNum) {
    this.dashboardService.getTargetBagsChart(companyNum).subscribe((res) => {
      // console.log(res);
      
    })
  }

  getRatesChart(companyNum) {
    this.dashboardService.getRatesChart(companyNum).subscribe((res) => {
      // console.log(res);
      
    })
  }

  ngOnInit() {
    this.selectedCityId = this.cities[0].id;
    const companyNum = this.shareService.getFirstCompanyNum();
    this.getTargetBagsChart(companyNum);

  }

}
