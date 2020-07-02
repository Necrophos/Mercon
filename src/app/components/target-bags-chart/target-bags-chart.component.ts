import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};
type ApexYAxis = {
  labels?: {
    style?: {
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-target-bags-chart',
  templateUrl: './target-bags-chart.component.html',
  styleUrls: ['./target-bags-chart.component.scss']
})
export class TargetBagsChartComponent implements OnInit {
  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "series-1",
          data: [21, 85]
        }
      ],
      chart: {
        height: 450,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        },
        toolbar: {
          show: false
        }
      },
      colors: [
        "#008FFB",
        "rgba(244, 144, 14, 0.85)"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["Target"],
          ["Total Sales"]
        ],
        labels: {
          style: {
            colors: [
              "#000",
              "#000"
            ],
            fontSize: "13px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "13px"
          }
        }
      }
    };
  }

  ngOnInit() {
  }

}
