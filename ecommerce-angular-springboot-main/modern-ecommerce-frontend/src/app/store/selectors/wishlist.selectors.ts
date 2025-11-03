import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from '../reducers/wishlist.reducer';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistProducts = createSelector(
  selectWishlistState,
  (state: WishlistState) => state.products
);

export const selectWishlistCount = createSelector(
  selectWishlistProducts,
  (products) => products.length
);

export const selectWishlistLoading = createSelector(
  selectWishlistState,
  (state: WishlistState) => state.loading
);

export const selectWishlistError = createSelector(
  selectWishlistState,
  (state: WishlistState) => state.error
);

export const selectIsInWishlist = (productId: number) => createSelector(
  selectWishlistProducts,
  (products) => products.some(p => p.id === productId)
);
