import { MenuRootItem } from 'ontimize-web-ngx';
import { SellsCardComponent } from './sells-card/sells-card.component';
import { ProfitsCardComponent } from './profits-card/profits-card.component';
import { LocationsCardComponent } from './locations-card/locations-card.component';
import { LocationpCardComponent } from './locationp-card/locationp-card.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { UsersCardComponent } from './users-card/users-card.component';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'bookings', name: 'BOOKINGS', route: '/main/bookings', icon: 'book_online'},
  { id: 'users', name: 'USERS', route: '/main/users', icon: 'people'},
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory'},
  { id: 'global-bookings', name: 'GLOBAL-BOOKINGS', route: '/main/global-bookings', icon: 'outbox'},
  { id: 'booking-charts', name: 'GLOBAL-BOOKINGS-CHART', icon: 'bar_chart', opened: false, route: 'main/booking-charts/home',
    items: [
      { id: 'chart-sells', name: 'CHARTS-SELLS-YEAR', route: '/main/booking-charts/chart-sells', icon: 'show_chart', image: 'assets/images/total-sales-volume.svg', component: SellsCardComponent},
      { id: 'chart-profits', name: 'CHARTS-PROFITS-YEAR', route: '/main/booking-charts/chart-profits', icon: 'show_chart', image: 'assets/images/total-sales-volume.svg', component: ProfitsCardComponent},
      { id: 'chart-locations', name: 'CHARTS-LOCATIONS-YEAR', route: '/main/booking-charts/chart-locations', icon: 'donut_small', image: 'assets/images/location-location.svg', component: LocationsCardComponent},
      { id: 'chart-locationp', name: 'CHARTS-LOCATIONP-YEAR', route: '/main/booking-charts/chart-locationp', icon: 'pie_chart', image: 'assets/images/location-location.svg', component: LocationpCardComponent},
      { id: 'chart-stock', name: 'CHARTS-STOCK', route: '/main/booking-charts/chart-stock', icon: 'stacked_bar_chart', image: 'assets/images/product-purchase-1.svg', component: StockCardComponent},
      { id: 'chart-users', name: 'CHARTS-USERS', route: '/main/booking-charts/chart-users', icon: 'stacked_bar_chart', image: 'assets/images/stock-20.svg', component: UsersCardComponent},
    ]
  },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' },
];

export const MENU_COMPONENTS = [
  SellsCardComponent,
  ProfitsCardComponent,
  LocationsCardComponent,
  LocationpCardComponent,
  StockCardComponent,
  UsersCardComponent
];