import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { GlobalBookingsRoutingModule } from './global-bookings-routing.module';
import { GlobalBookingHomeComponent } from './global-booking-home/global-booking-home.component';
import { GlobalBookingDetailComponent } from './global-booking-detail/global-booking-detail.component';




@NgModule({
  declarations: [GlobalBookingHomeComponent, GlobalBookingDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    GlobalBookingsRoutingModule
  ]
})
export class GlobalBookingsModule { }
