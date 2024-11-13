import { ChangeDetectorRef, Component, OnInit, ViewChild, Injector } from '@angular/core';
import { OTranslateService, OntimizeService } from 'ontimize-web-ngx';
import { DataAdapterUtils, DiscreteBarChartConfiguration, OChartComponent, StackedAreaChartConfiguration } from 'ontimize-web-ngx-charts';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-charts-profits',
  templateUrl: './booking-charts-profits.component.html',
  styleUrls: ['./booking-charts-profits.component.css']
})
export class BookingChartsProfitsComponent implements OnInit {
  @ViewChild('discretebar', { static: true }) protected discretebar: OChartComponent;

  public chartParameters1: StackedAreaChartConfiguration;
  public chartParameters: DiscreteBarChartConfiguration;
  public graphDataP: Array<Object>;

  constructor(private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
    public injector: Injector,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    private router: Router) {

    this.translateService.onLanguageChanged.subscribe(() => this.reloadComponent());

    this.graphDataP = [];
    this.getProfits();
  }

  getProfits() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('bookings'));
    this.ontimizeService.query({ 'year_': 2023 }, ['profits', 'month_', 'n_month', 'year_', 'timeDateD'], 'sellBooking').subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          this.adaptResult(res.data);
        }
      },
      err => console.log(err),
      () => this.cd.detectChanges()
    );

  }

  adaptResult(data: any) {
    if (data && data.length) {
      let values = this.processValues(data);
      let keys = this.processKeys(data);
      keys.forEach((item: any, items: number) => {
        const linea: object[] = [{ 'key': item, 'values': values[items] }];
        this.graphDataP.push(linea[0]);
      });
      let dataAdapter = DataAdapterUtils.createDataAdapter(this.chartParameters);
      this.discretebar.setDataArray(dataAdapter.adaptResult(this.graphDataP));
    }
  }
  processKeys(data: any) {
    let keys = [];
    data.forEach((item: any) => {
      keys.push(item.timeDateD);
    });
    return keys;
  }
  processValues(data: any) {
    let values = [];
    data.forEach((item: any) => {
      values.push(item.profits);
    });
    return values;
  }
  private configureLanguage() {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    this.configureDiscreteBarChart(d3Locale);
    this.configureChart(d3Locale);
  }
  private configureDiscreteBarChart(locale: any): void {
    console.log(locale);
    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.height = 130;
    this.chartParameters.xAxis = "key";
    this.chartParameters.yAxis = ["values"];
    this.chartParameters.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters.y1Axis.axisLabel = this.translateService.get("amount");
    this.chartParameters.y1Axis.axisLabelDistance = 50;
    this.chartParameters.margin.left = 150;
    this.chartParameters.xDataType = d => locale.timeFormat('%b')(new Date(d));
    this.chartParameters.yDataType = d => locale.numberFormat("$,.2f")(d);
  }
  private configureChart(locale: any): void {
    this.chartParameters1 = new StackedAreaChartConfiguration();
    this.chartParameters1.interactive = false;
    this.chartParameters1.showLegend = false;
    this.chartParameters1.useInteractiveGuideline = false;
    this.chartParameters1.color = ['#E4333C', '#47A0E9', '#16b062', '#FF7F0E', '#4b4b4b'];
    this.chartParameters1.y1Axis.axisLabelDistance = 200;
    this.chartParameters1.y1Axis.axisLabel = this.translateService.get("units");
    this.chartParameters1.showControls = false;
    this.chartParameters1.yDataType = d => locale.numberFormat("$,.2f")(d);

  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
  ngOnInit() {
    this.configureLanguage();
    let dataAdapter = DataAdapterUtils.createDataAdapter(this.chartParameters);
    this.discretebar.setDataArray(dataAdapter.adaptResult(this.graphDataP));
  }

}
