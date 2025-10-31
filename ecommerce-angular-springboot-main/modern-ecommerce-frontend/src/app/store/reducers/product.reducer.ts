import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';

export interface ProductState {
  products: any[];
  selectedProduct: any | null;
  featuredProducts: any[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  featuredProducts: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products, totalPages, currentPage }) => ({
    ...state,
    products,
    totalPages,
    currentPage,
    loading: false
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductActions.loadFeaturedProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadFeaturedProductsSuccess, (state, { products }) => ({
    ...state,
    featuredProducts: products,
    loading: false
  }))
);
