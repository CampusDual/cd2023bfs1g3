import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersDialogPasswordComponent } from './users-dialog-password/users-dialog-password.component';

const routes: Routes =  [{
  path : '',
  component: UsersHomeComponent
},
{
  path: ":user_",
  component: UsersDetailComponent
},
{
  path: ":passDialog",
  component: UsersDialogPasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
