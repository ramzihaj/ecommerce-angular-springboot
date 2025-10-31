import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';
import { productReducer, ProductState } from './product.reducer';
import { cartReducer, CartState } from './cart.reducer';
import { orderReducer, OrderState } from './order.reducer';

export interface AppState {
  auth: AuthState;
  product: ProductState;
  cart: CartState;
  order: OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer
};
