import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid,
} from "ng-apexcharts";
import { DashboardService } from "@services/dashboard.service";
import { ShareService } from "@services/share.service";
import { Subscription } from "rxjs";

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
  selector: "app-target-bags-chart",
  templateUrl: "./target-bags-chart.component.html",
  styleUrls: ["./target-bags-chart.component.scss"],
})
export class TargetBagsChartComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  originData;
  crops;
  selectedCrop;
  chartData;
  renderData =[];
  subVars: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private shareService: ShareService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "series-1",
          data: this.renderData,
        },
      ],
      chart: {
        height: 450,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#008FFB", "rgba(244, 144, 14, 0.85)"],
      plotOptions: {
        bar: {
          columnWidth: "70%",
          distributed: true
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "11px"
        },
        formatter: function (val, opt){
          return val.toLocaleString()
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [["Total Target"], ["Total Sales"]],
        labels: {
          style: {
            colors: ["#000", "#000"],
            fontSize: "13px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "13px",
          },
        },
      },
    };
  }

  ngOnInit() {
    const companyNum = this.shareService.getCompany;
    this.getTargetChart(companyNum);
    this.subVars = this.shareService.client.subscribe((client) => {
      if (client) {
        this.getTargetChart(client.companyNum);
      }
    });
  }

  getCrop() {
    this.crops = Array.from(new Set(this.originData.map((a) => a.fiscalYear)))
      .map((fiscalYear) =>
        this.originData.find((a) => a.fiscalYear === fiscalYear)
      )
      .map((res, i) => {
        return { label: res.fiscalYear, value: i };
      })
      .filter((data) => data.label)
      .sort((a, b) => b.label.localeCompare(a.label));
    this.selectedCrop = this.crops[0];
    this.chartData = this.originData.filter(
      (data) => data.fiscalYear === this.selectedCrop.label
    );
  }

  getTargetChart(companyNum) {
    this.dashboardService.getTargetBagsChart(companyNum).subscribe((res) => {
      this.originData = res;
      this.getCrop();
      this.chartRender();
    });
  }

  chartRender() {
    this.renderData = Object.values(this.chartData[0])
    this.renderData.pop();
    this.chartOptions.series = [{
      name: "series-1",
      data: this.renderData
    }]
  }

  onSelectChange() {
    this.chartData = this.originData.filter(
      (data) => data.fiscalYear === this.selectedCrop.label
    );
    this.chartRender();
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }
}
