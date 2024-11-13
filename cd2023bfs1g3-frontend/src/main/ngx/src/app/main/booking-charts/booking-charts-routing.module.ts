import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingChartsHomeComponent } from './booking-charts-home/booking-charts-home.component';
import { BookingChartsSellsComponent } from './booking-charts-sells/booking-charts-sells.component';
import { BookingChartsProfitsComponent } from './booking-charts-profits/booking-charts-profits.component';
import { BookingChartsLocationsComponent } from './booking-charts-locations/booking-charts-locations.component';
import { BookingChartsStockComponent } from './booking-charts-stock/booking-charts-stock.component';
import { BookingChartsUsersComponent } from './booking-charts-users/booking-charts-users.component';
import { BookingChartLocationpComponent } from './booking-chart-locationp/booking-chart-locationp.component';


const routes: Routes = [
  { path: 'home', data: { oAppHeaderTitle: 'Data' }, component: BookingChartsHomeComponent },
  {  path: "chart-sells", component: BookingChartsSellsComponent },
  {  path: "chart-profits", component: BookingChartsProfitsComponent },
  {  path: "chart-locations", component: BookingChartsLocationsComponent },
  {  path: "chart-locationp", component: BookingChartLocationpComponent },
  {  path: "chart-stock", component: BookingChartsStockComponent },
  {  path: "chart-users", component: BookingChartsUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingChartsRoutingModule { }
