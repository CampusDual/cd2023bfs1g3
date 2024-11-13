import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsHomeComponent } from './bookings-home/bookings-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { BookingsDetailComponent } from './bookings-detail/bookings-detail.component';


@NgModule({
  declarations: [BookingsHomeComponent, BookingsDetailComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    OntimizeWebModule
  ]
})
export class BookingsModule { }
