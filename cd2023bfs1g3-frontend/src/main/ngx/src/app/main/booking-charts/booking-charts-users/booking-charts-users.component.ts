import { ChangeDetectorRef, Component, OnInit, ViewChild, Injector } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DataAdapterUtils, DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';
import { D3LocaleService } from 'src/app/shared/d3-locale/d3Locale.service';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-booking-charts-users',
  templateUrl: './booking-charts-users.component.html',
  styleUrls: ['./booking-charts-users.component.css']
})
export class BookingChartsUsersComponent implements OnInit {
  @ViewChild('discretebar1', { static: true }) protected discretebar1: OChartComponent;
  @ViewChild('discretebar2', { static: true }) protected discretebar2: OChartComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  public chartParameters2: DiscreteBarChartConfiguration;
  /**
   * Variable que establece el número de reservas no recogidas de un usuario
   */
  public total_not_picked_up: any;
  /**
   * Array de objetos que recoje los datos de la primera gráfica
   */
  public graphData: Array<Object>;
  /**
   * Array de objetos que recoje los datos de los usuarios de la segunda gráfica, 
   */
  public graphDataU: Array<Object>;
  /**
   * Array auxiliar para construir los arrays de datos
   */
  private auxGraph: Array<Object>;
  /**
   * Constante de tipo number, establece el valor de baremación
   */
  public criteriaValue = 2;


  constructor(
    private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
    public injector: Injector,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    private router: Router
  ) {
    this.graphData = [];
    this.graphDataU = [];
    this.auxGraph = [];

    this.getCount();
  }
  /**
   * Método void que hace la petición de datos al servicio
   */
  getCount() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('bookings'));
    this.ontimizeService.query({ 'year_': 2023 }, ['id_user', 'name', 'surname1', 'not_picked_up', 'year_'], 'usersBooking').subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          this.total_not_picked_up = res.data.length;
          this.adaptResult(res.data, 1);
          this.adaptResult(res.data, 2);
        }
      },
      err => console.log(err),
      () => this.cd.detectChanges()
    );
  }
  /**
   * Método void que construye los arrays de datos
   * 
   * @param data tipo objeto, es la respuesta obtenida del servidor
   * @param numero tipo number, indica que array se debe construir
   */
  adaptResult(data: any, numero: number) {
    let dataAdapter = DataAdapterUtils.createDataAdapter(this.chartParameters);
    if (data && data.length) {
      if (numero === 1) {
        let values = this.processValues(data, this.auxGraph);
        // chart data
        this.graphData = [
          {
            'key': 'Discrete serie',
            'values': values
          }
        ];
        this.discretebar1.setDataArray(dataAdapter.adaptResult(this.graphData));
      } else if (numero === 2 && this.auxGraph.length > 0) {
        let values = this.processKeyValues(this.auxGraph);
        this.graphDataU = [
          {
            'key': 'Users',
            'values': values
          }
        ];
        this.discretebar2.setDataArray(dataAdapter.adaptResult(this.graphDataU));
      }
    }
  }
  /**
   * Método para procesar los valores devueltos por el servidor
   * 
   * @param data Array de objetos que trae los valores a procesar
   * @param graphData Array de objetos que recogerá los valores procesados
   * @returns nuevo array con los valores procesados
   */
  processValues(data: any, graphData: any[]) {
    let values = [];
    let minorValue = 0;
    let majorValue = 0;
    let over = this.translateService.get('over');
    let under = this.translateService.get('under');
    data.forEach((item: any, index: number) => {
      if (item['not_picked_up'] >= this.criteriaValue) {
        majorValue++;
        graphData.push(item);
      } else {
        minorValue++;
      }
    });
    //Valores por debajo del criterio de baremación
    let lowerCrit = {
      'x': under,
      'y': minorValue
    }
    //Valores iguales o por encima del baremo
    let upperCrit = {
      'x': over,
      'y': majorValue
    }

    values.push(upperCrit);
    values.push(lowerCrit);
    return values;
  }
  /**
   * Método para procesar las claves necesarias para la construcción de la gráfica
   * 
   * @param graphData Array de objetos con las claves a procesar
   * @returns Nuevo array con las claves procesadas
   */
  processKeyValues(graphData: any[]) {
    let values = [];
    graphData.forEach((item: any, index: number) => {
      let user = {
        'x': item.name + ' ' + (item.surname1).charAt(0) + '.',
        'y': item.not_picked_up
      }
      values.push(user);
    });
    return values;
  }

  private configureLanguage() {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    this.configureDiscreteBarChart(d3Locale);
    this.configureDiscreteBarChartU(d3Locale);
  }

  private configureDiscreteBarChart(locale: any): void {
    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.height = 130;
    this.chartParameters.showLegend = false;
    this.chartParameters.color = ['#E4333C', '#4b4b4b'];
    this.chartParameters.y1Axis.showMaxMin = false;
    this.chartParameters.x1Axis.showMaxMin = false;
    this.chartParameters.y1Axis.axisLabel = this.translateService.get('units');
    this.chartParameters.y1Axis.axisLabelDistance = -15;
    this.chartParameters.yDataType = d => locale.numberFormat("###.##")(d);
  }

  private configureDiscreteBarChartU(locale: any): void {
    this.chartParameters2 = new DiscreteBarChartConfiguration();
    this.chartParameters2.height = 500;
    this.chartParameters2.xAxis = "key";
    this.chartParameters2.yAxis = ["values"];
    this.chartParameters2.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters2.y1Axis.axisLabel = this.translateService.get('units');
    this.chartParameters2.x1Axis.orient = "bottom";
    this.chartParameters.y1Axis.axisLabelDistance = -15;
    this.chartParameters2.x1Axis.rotateLabels = 270;
    this.chartParameters2.yDataType = d => locale.numberFormat("###.##")(d);
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  ngOnInit() {
    this.configureLanguage();
    let dataAdapter = DataAdapterUtils.createDataAdapter(this.chartParameters);
    this.discretebar1.setDataArray(dataAdapter.adaptResult(this.graphData));
    this.discretebar2.setDataArray(dataAdapter.adaptResult(this.graphDataU));
  }
}


