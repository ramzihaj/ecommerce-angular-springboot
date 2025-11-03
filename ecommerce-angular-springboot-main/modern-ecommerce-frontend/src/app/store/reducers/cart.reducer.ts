import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { TunisiaProduct } from '../../shared/models/tunisia-product.model';

export interface CartItem {
  product: TunisiaProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  total: 0,
  totalItems: 0,
  loading: false,
  error: null
};

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
}

function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function saveToLocalStorage(items: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(items));
}

export const cartReducer = createReducer(
  initialState,
  
  // Add to Cart
  on(CartActions.addToCartSuccess, (state, { product, quantity }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    let updatedItems: CartItem[];
    
    if (existingItem) {
      updatedItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...state.items, { product, quantity }];
    }
    
    saveToLocalStorage(updatedItems);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems),
      loading: false,
      error: null
    };
  }),
  
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Remove from Cart
  on(CartActions.removeFromCartSuccess, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.product.id !== productId);
    saveToLocalStorage(updatedItems);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems)
    };
  }),
  
  // Update Quantity
  on(CartActions.updateQuantitySuccess, (state, { productId, quantity }) => {
    const updatedItems = state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    saveToLocalStorage(updatedItems);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems)
    };
  }),
  
  // Increment Quantity
  on(CartActions.incrementQuantity, (state, { productId }) => {
    const updatedItems = state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveToLocalStorage(updatedItems);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems)
    };
  }),
  
  // Decrement Quantity
  on(CartActions.decrementQuantity, (state, { productId }) => {
    const item = state.items.find(i => i.product.id === productId);
    if (!item || item.quantity <= 1) return state;
    
    const updatedItems = state.items.map(i =>
      i.product.id === productId
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    saveToLocalStorage(updatedItems);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems)
    };
  }),
  
  // Clear Cart
  on(CartActions.clearCartSuccess, () => {
    localStorage.removeItem('cart');
    return {
      ...initialState,
      items: []
    };
  }),
  
  // Load Cart
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(items),
    totalItems: calculateTotalItems(items),
    loading: false
  }))
);
