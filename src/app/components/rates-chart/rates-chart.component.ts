import { Component, OnInit, ViewChild } from "@angular/core";

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
export class RatesChartComponent implements OnInit {
  @ViewChild("chart-rate", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  approved = [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43];
  rejected = [56, 45, 59, 33, 78, 57, 56, 45, 59, 33, 78, 57];
  month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  constructor() {
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
  ngOnInit() {}
}
