import { createReducer, on } from '@ngrx/store';
import * as WishlistActions from '../actions/wishlist.actions';
import { TunisiaProduct } from '../../shared/models/tunisia-product.model';

export interface WishlistState {
  products: TunisiaProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  products: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  loading: false,
  error: null
};

function saveToLocalStorage(products: TunisiaProduct[]): void {
  localStorage.setItem('wishlist', JSON.stringify(products));
}

export const wishlistReducer = createReducer(
  initialState,
  
  // Add to Wishlist
  on(WishlistActions.addToWishlistSuccess, (state, { product }) => {
    const exists = state.products.some(p => p.id === product.id);
    if (exists) return state;
    
    const updatedProducts = [...state.products, product];
    saveToLocalStorage(updatedProducts);
    
    return {
      ...state,
      products: updatedProducts,
      loading: false,
      error: null
    };
  }),
  
  on(WishlistActions.addToWishlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Remove from Wishlist
  on(WishlistActions.removeFromWishlistSuccess, (state, { productId }) => {
    const updatedProducts = state.products.filter(p => p.id !== productId);
    saveToLocalStorage(updatedProducts);
    
    return {
      ...state,
      products: updatedProducts
    };
  }),
  
  // Toggle Wishlist
  on(WishlistActions.toggleWishlist, (state, { product }) => {
    const exists = state.products.some(p => p.id === product.id);
    const updatedProducts = exists
      ? state.products.filter(p => p.id !== product.id)
      : [...state.products, product];
    
    saveToLocalStorage(updatedProducts);
    
    return {
      ...state,
      products: updatedProducts
    };
  }),
  
  // Load Wishlist
  on(WishlistActions.loadWishlistSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  
  on(WishlistActions.loadWishlistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Clear Wishlist
  on(WishlistActions.clearWishlistSuccess, () => {
    localStorage.removeItem('wishlist');
    return {
      ...initialState,
      products: []
    };
  })
);
