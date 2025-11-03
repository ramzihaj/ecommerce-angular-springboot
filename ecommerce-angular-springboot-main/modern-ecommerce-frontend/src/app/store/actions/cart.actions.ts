import { createAction, props } from '@ngrx/store';
import { TunisiaProduct } from '../../shared/models/tunisia-product.model';

// Add to Cart
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: TunisiaProduct; quantity?: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ product: TunisiaProduct; quantity: number }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>()
);

// Remove from Cart
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ productId: number }>()
);

// Update Quantity
export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const updateQuantitySuccess = createAction(
  '[Cart] Update Quantity Success',
  props<{ productId: number; quantity: number }>()
);

// Increment/Decrement
export const incrementQuantity = createAction(
  '[Cart] Increment Quantity',
  props<{ productId: number }>()
);

export const decrementQuantity = createAction(
  '[Cart] Decrement Quantity',
  props<{ productId: number }>()
);

// Clear Cart
export const clearCart = createAction('[Cart] Clear Cart');

export const clearCartSuccess = createAction('[Cart] Clear Cart Success');

// Load Cart
export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: any[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);
