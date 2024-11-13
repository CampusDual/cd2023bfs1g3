import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsHomeComponent } from './bookings-home/bookings-home.component';
import { BookingsDetailComponent } from './bookings-detail/bookings-detail.component';

const routes: Routes = [
  { path: '', component: BookingsHomeComponent },
  { path: ":id", component: BookingsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
