import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as OrderActions from '../actions/order.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      exhaustMap(() =>
        this.apiService.get<any>('/orders').pipe(
          map(response => OrderActions.loadOrdersSuccess({ orders: response.data })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      exhaustMap(action =>
        this.apiService.post<any>('/orders', action.orderData).pipe(
          map(response => OrderActions.createOrderSuccess({ order: response.data })),
          catchError(error => of(OrderActions.createOrderFailure({ error: error.message })))
        )
      )
    )
  );
}
