import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, PermissionsGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [PermissionsGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          oPermission: {
            permissionId: 'home-permissions',
            restrictedPermissionsRedirect: '/login',
          }
        }
      },
      {
        path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          oPermission: {
            permissionId: 'users-permissions',
            restrictedPermissionsRedirect: '/main/home',
          }
        }
      },
      {
        path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        data: {
          oPermission: {
            permissionId: 'products-permissions',
            restrictedPermissionsRedirect: '/main/home',
          }
        }
      },
      { path: 'bookings', loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule) },
      {
        path: 'global-bookings', loadChildren: () => import('./global-bookings/global-bookings.module').then(m => m.GlobalBookingsModule),
        data: {
          oPermission: {
            permissionId: 'global-bookings-permissions',
            restrictedPermissionsRedirect: '/main/home',
          }
        }
      },
      {
        path: 'booking-charts', loadChildren: () => import('./booking-charts/booking-charts.module').then(m => m.BookingChartsModule),
        data: {
          oPermission: {
            permissionId: 'booking-charts-permissions',
            restrictedPermissionsRedirect: '/main/home',
          }
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
