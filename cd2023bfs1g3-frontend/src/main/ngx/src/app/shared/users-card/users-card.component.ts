import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { DiscreteBarChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css']
})
export class UsersCardComponent implements OnInit {

  public chartParameters: DiscreteBarChartConfiguration;
  
  constructor(
      private cd: ChangeDetectorRef, 
      public injector: Injector, 
      private setYearConsultation: ReserveService,
      private translateService: OTranslateService,
      private d3LocaleService:D3LocaleService, 
      private router: Router
    ) { 
    
    this.setYearConsultation.setYearConsultation(2023).subscribe(
      err => console.log(err),
      () => this.cd.detectChanges()
    );

    
  }
  private configureLanguage(){
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    this.configureDiscreteBarChart(d3Locale);
  }
  private configureDiscreteBarChart(locale: any): void {
    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.height = 200;
    this.chartParameters.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters.showLegend = false;
    this.chartParameters.showYAxis = false;
    this.chartParameters.showXAxis = false;
    this.chartParameters.showValues = false;
    this.chartParameters.yDataType = d => locale.numberFormat("###.##")(d);
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
