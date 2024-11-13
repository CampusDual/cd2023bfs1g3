import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { DonutChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-locations-card',
  templateUrl: './locations-card.component.html',
  styleUrls: ['./locations-card.component.css']
})
export class LocationsCardComponent implements OnInit {

  public chartParameters1: DonutChartConfiguration;
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
    this.configureDonutsChart(d3Locale);
  }
  private configureDonutsChart(locale: any): void {
    this.chartParameters1 = new DonutChartConfiguration();
    this.chartParameters1.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters1.showLabels = false;
    this.chartParameters1.donutRatio = 0.5;
    this.chartParameters1.legendPosition = "bottom";
    this.chartParameters1.labelType = "value";
    this.chartParameters1.height = 178;
    this.chartParameters1.showTooltip = false;
    this.chartParameters1.showLeyend = false;
    this.chartParameters1.valueType = locale.numberFormat("###.00#");
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
