import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./order-list/order-list.component').then(m => m.OrderListComponent)
  }
];
