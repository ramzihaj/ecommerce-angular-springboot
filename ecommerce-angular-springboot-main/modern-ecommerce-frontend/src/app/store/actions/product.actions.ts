import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ page: number; size: number; sortBy?: string }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: any[]; totalPages: number; currentPage: number }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const loadFeaturedProducts = createAction(
  '[Product] Load Featured Products'
);

export const loadFeaturedProductsSuccess = createAction(
  '[Product] Load Featured Products Success',
  props<{ products: any[] }>()
);

export const loadProductDetails = createAction(
  '[Product] Load Product Details',
  props<{ id: number }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Product] Load Product Details Success',
  props<{ product: any }>()
);
