import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ReserveDialogComponent } from './products-view/reserve-dialog/reserve-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: ":id", component: ProductsViewComponent},
  {
    path: ":reserveDialog",
    component: ReserveDialogComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
