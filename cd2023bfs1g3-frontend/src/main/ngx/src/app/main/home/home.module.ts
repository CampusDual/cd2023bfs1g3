import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductsCardsComponent } from '../products/products-cards/products-cards.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ReserveDialogComponent } from './products-view/reserve-dialog/reserve-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    HomeRoutingModule,  ],
  declarations: [
    HomeComponent,
    ProductsCardsComponent,
    ProductsViewComponent,
    ReserveDialogComponent,
    
  ]
})
export class HomeModule { }
