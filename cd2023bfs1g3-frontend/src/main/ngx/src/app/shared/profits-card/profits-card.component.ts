import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAdapterUtils, DiscreteBarChartConfiguration, LineChartConfiguration, StackedAreaChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';
import { D3LocaleService } from '../d3-locale/d3Locale.service';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-profits-card',
  templateUrl: './profits-card.component.html',
  styleUrls: ['./profits-card.component.css']
})
export class ProfitsCardComponent implements OnInit {

  public chartParameters: StackedAreaChartConfiguration;

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
    this.configureChart(d3Locale);
  }
  private configureChart(locale: any): void {
    this.chartParameters = new StackedAreaChartConfiguration();
    this.chartParameters.interactive = false;
    this.chartParameters.showLegend = false;
    this.chartParameters.useInteractiveGuideline = false;
    this.chartParameters.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters.height = 200;
    this.chartParameters.y1Axis.axisLabel = this.translateService.get("units");
    this.chartParameters.showControls = false;
    this.chartParameters.showXAxis = false;
    this.chartParameters.showYAxis = false;
    this.chartParameters.xDataType = d => locale.timeFormat('%b')(new Date(d));
    this.chartParameters.yDataType = d => locale.numberFormat("###.#")(d);
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
