import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: any[];
  total: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  total: 0
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.id === product.id);
    let updatedItems;
    
    if (existingItem) {
      updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...state.items, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),
  on(CartActions.clearCart, () => {
    localStorage.removeItem('cart');
    return initialState;
  })
);
