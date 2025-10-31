import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction('[Order] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: any[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: string }>()
);

export const createOrder = createAction(
  '[Order] Create Order',
  props<{ orderData: any }>()
);

export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: any }>()
);

export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: string }>()
);
