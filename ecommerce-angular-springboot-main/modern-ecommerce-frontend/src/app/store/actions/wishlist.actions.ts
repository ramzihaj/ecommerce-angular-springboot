import { createAction, props } from '@ngrx/store';
import { TunisiaProduct } from '../../shared/models/tunisia-product.model';

// Add to Wishlist
export const addToWishlist = createAction(
  '[Wishlist] Add To Wishlist',
  props<{ product: TunisiaProduct }>()
);

export const addToWishlistSuccess = createAction(
  '[Wishlist] Add To Wishlist Success',
  props<{ product: TunisiaProduct }>()
);

export const addToWishlistFailure = createAction(
  '[Wishlist] Add To Wishlist Failure',
  props<{ error: string }>()
);

// Remove from Wishlist
export const removeFromWishlist = createAction(
  '[Wishlist] Remove From Wishlist',
  props<{ productId: number }>()
);

export const removeFromWishlistSuccess = createAction(
  '[Wishlist] Remove From Wishlist Success',
  props<{ productId: number }>()
);

// Toggle Wishlist
export const toggleWishlist = createAction(
  '[Wishlist] Toggle Wishlist',
  props<{ product: TunisiaProduct }>()
);

// Load Wishlist
export const loadWishlist = createAction('[Wishlist] Load Wishlist');

export const loadWishlistSuccess = createAction(
  '[Wishlist] Load Wishlist Success',
  props<{ products: TunisiaProduct[] }>()
);

export const loadWishlistFailure = createAction(
  '[Wishlist] Load Wishlist Failure',
  props<{ error: string }>()
);

// Clear Wishlist
export const clearWishlist = createAction('[Wishlist] Clear Wishlist');

export const clearWishlistSuccess = createAction('[Wishlist] Clear Wishlist Success');
