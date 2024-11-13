import { ChangeDetectorRef, Component, OnInit, Injector } from '@angular/core';
import { DiscreteBarChartConfiguration, MultiBarHorizontalChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-booking-charts-stock',
  templateUrl: './booking-charts-stock.component.html',
  styleUrls: ['./booking-charts-stock.component.css']
})
export class BookingChartsStockComponent implements OnInit {

  public chartParameters1: MultiBarHorizontalChartConfiguration;
  public chartParameters: DiscreteBarChartConfiguration;

  constructor(
    private cd: ChangeDetectorRef,
    public injector: Injector,
    private setYearConsultation: ReserveService,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    private router: Router
  ) {
    this.translateService.onLanguageChanged.subscribe(() => this.reloadComponent());
    this.setYearConsultation.setYearConsultation(2023).subscribe(
      err => console.log(err),
      () => this.cd.detectChanges()
    );

  }
  private configureLanguage() {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    this.configureMultiBarChart(d3Locale);
  }
  private configureMultiBarChart(locale: any): void {
    this.chartParameters1 = new MultiBarHorizontalChartConfiguration();
    this.chartParameters1.margin.left = 200;
    this.chartParameters1.color = ['#E4333C', '#4b4b4b'];
    this.chartParameters1.valueType = locale.numberFormat("###.##");
    this.chartParameters1.yDataType = d => locale.numberFormat("###.##")(d);
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
  ngOnInit() {
    this.configureLanguage();
  }

}
