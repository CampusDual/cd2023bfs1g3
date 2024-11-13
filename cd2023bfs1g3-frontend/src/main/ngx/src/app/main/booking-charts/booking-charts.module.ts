import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingChartsRoutingModule } from './booking-charts-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { BookingChartsHomeComponent } from './booking-charts-home/booking-charts-home.component';
import { BookingChartsSellsComponent } from './booking-charts-sells/booking-charts-sells.component';
import { BookingChartsProfitsComponent } from './booking-charts-profits/booking-charts-profits.component';
import { BookingChartsLocationsComponent } from './booking-charts-locations/booking-charts-locations.component';
import { BookingChartsStockComponent } from './booking-charts-stock/booking-charts-stock.component';
import { BookingChartsUsersComponent } from './booking-charts-users/booking-charts-users.component';
import { BookingChartLocationpComponent } from './booking-chart-locationp/booking-chart-locationp.component';


@NgModule({
  declarations: [BookingChartsHomeComponent, BookingChartsSellsComponent, BookingChartsProfitsComponent, BookingChartsLocationsComponent, BookingChartsStockComponent, BookingChartsUsersComponent, BookingChartLocationpComponent],
  imports: [
    CommonModule,
    BookingChartsRoutingModule,
    OntimizeWebModule,
    OChartModule
  ]
})
export class BookingChartsModule { }
