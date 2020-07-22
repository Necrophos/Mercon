import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexYAxis,
  ApexGrid,
} from "ng-apexcharts";
import { DashboardService } from '@services/dashboard.service';
import { ShareService } from '@services/share.service';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  grid: ApexGrid;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: "app-rates-chart",
  templateUrl: "./rates-chart.component.html",
  styleUrls: ["./rates-chart.component.scss"],
})
export class RatesChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart-rate", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  approved = [];
  rejected = [];
  month = [
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  chartData;
  crops;
  types;
  selectedCrop;
  selectedType;
  originData;
  subVars: Subscription;

  constructor(private dashboardService: DashboardService, private shareService: ShareService) {
    this.chartOptions = {
      series: [{
        name: 'Approved',
        data: this.approved
      }, {
        name: 'Reject',
        data: this.rejected
      }],
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        events: {
          legendClick: function(e) {
            e.stopPropagation()
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#A3CF60', '#DE544F'],
    
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
    
      },
    
      xaxis: {
        categories: this.month,
        labels: {
          style: {
            fontSize: '13px',
            fontFamily: 'Open Sans',				
          }
        },
      },
    
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left', 
        fontSize: '13px',
        fontFamily: 'Open Sans',
        markers: {
          width: 18,
          height: 10,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 15
        },
      },
      grid: {
        show: true,
        borderColor: '#cecece',
        strokeDashArray: 0.2,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
    
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            fontSize: '13px',
            fontFamily: 'Open Sans',				
          }
        },
      },
    
      responsive: [{
        breakpoint: 480,
    
        options: {
          legend: {
            itemMargin: {
              vertical: 0
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '38%',
            },
        
          },
        },
      }],
    };
  }
  ngOnInit() {
    const companyNum = this.shareService.getCompany;

    this.getRatesChart(companyNum);
    this.subVars = this.shareService.client.subscribe(client => {
      if(client) {
        this.getRatesChart(client.companyNum);
      }
    })
  }

  getRatesChart(companyNum) {
    this.dashboardService.getRatesChart(companyNum).subscribe((res) => {
      this.originData = res;
      this.getCrop();
      this.getType();
      this.chartRender();
    })
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe()
    }
  }

  getCrop() {
    this.crops = Array.from(new Set(this.originData.map(a => a.fiscalYear)))
      .map(fiscalYear => this.originData.find(a => a.fiscalYear === fiscalYear)).map((res, i) => {
        return {label: res.fiscalYear, value: i}
      }).filter(data => data.label).sort((a,b) => b.label.localeCompare(a.label))
      this.selectedCrop = this.crops[0];
      this.chartData = this.originData.filter(data => data.fiscalYear === this.selectedCrop.label);
  }

  getType() {
    this.types = Array.from(new Set(this.originData.map(a => a.type)))
    .map(type => this.originData.find(a => a.type === type)).map((res, i) => {
      return {label: res.type, value: i}
    })
  }

  chartRender() {
    this.approved = [];
    this.rejected = [];
    const months = Array(12).fill(0).map((x,i)=>i);
    months.map(month => {
      if(month <= 8) {
        const approvedItem = this.chartData.find(data => data.month == month && data.result === "Approved");
        const rejectedItem = this.chartData.find(data => data.month == month && data.result === "Rejected");
        approvedItem ? this.approved[months.length / 4 + month] = approvedItem.count : this.approved[months.length / 4 + month] = 0;
        rejectedItem ? this.rejected[months.length / 4 + month] = rejectedItem.count : this.rejected[months.length / 4 + month] = 0;
      } else {
        const approvedItem = this.chartData.find(data => data.month == month && data.result === "Approved");
        const rejectedItem = this.chartData.find(data => data.month == month && data.result === "Rejected");
        approvedItem ? this.approved[month - 9] = approvedItem.count : this.approved[month - 9] = 0;
        rejectedItem ? this.rejected[month - 9] = rejectedItem.count : this.rejected[month - 9] = 0;
      }
      this.chartOptions.series = [{
        name: 'Approved',
        data: this.approved
      }, {
        name: 'Reject',
        data: this.rejected
      }]
    })
  }

  onSelectChange() {
    this.chartData = this.originData.filter(data => data.fiscalYear === this.selectedCrop.label && (this.selectedType ? data.type === this.selectedType.label : true));
    this.chartRender();
  }
}
