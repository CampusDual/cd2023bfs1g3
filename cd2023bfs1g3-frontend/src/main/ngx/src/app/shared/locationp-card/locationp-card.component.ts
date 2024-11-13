import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-locationp-card',
  templateUrl: './locationp-card.component.html',
  styleUrls: ['./locationp-card.component.css']
})
export class LocationpCardComponent implements OnInit {

  chartParameters1: PieChartConfiguration;
  constructor(
      private cd: ChangeDetectorRef, 
      public injector: Injector, 
      private setYearConsultation: ReserveService,
      private translateService: OTranslateService,
      private d3LocaleService:D3LocaleService, 
      private router: Router
    ) { 
    this.translateService.onLanguageChanged.subscribe(() => this.reloadComponent());
    this.setYearConsultation.setYearConsultation(2023).subscribe(
      err => console.log(err),
      () => this.cd.detectChanges()
    ); 
    
  }
  private configureLanguage(){
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    this.configurePieChart(d3Locale);
  }
  private configurePieChart(locale: any): void {
    this.chartParameters1 = new PieChartConfiguration();
    this.chartParameters1.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters1.showLabels = false;
    this.chartParameters1.legendPosition = "bottom";
    this.chartParameters1.labelType = "value";
    this.chartParameters1.height = 178;
    this.chartParameters1.showTooltip = true;
    this.chartParameters1.showLeyend = false;
    this.chartParameters1.valueType = locale.numberFormat("$,.2f");
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
