import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersDialogPasswordComponent } from './users-dialog-password/users-dialog-password.component';


@NgModule({
  declarations: [UsersHomeComponent, UsersDetailComponent, UsersDialogPasswordComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    OntimizeWebModule
  ]
})
export class UsersModule { }
