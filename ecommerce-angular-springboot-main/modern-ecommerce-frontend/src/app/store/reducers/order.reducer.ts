import { createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';

export interface OrderState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
