import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as CartActions from '../actions/cart.actions';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private notificationService = inject(NotificationService);

  // Add to Cart Effect
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      map(({ product, quantity = 1 }) => {
        // Success notification
        this.notificationService.success(`${product.name} ajouté au panier !`);
        return CartActions.addToCartSuccess({ product, quantity });
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de l\'ajout au panier');
        return of(CartActions.addToCartFailure({ error: error.message }));
      })
    )
  );

  // Remove from Cart Effect
  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      map(({ productId }) => {
        this.notificationService.info('Produit retiré du panier');
        return CartActions.removeFromCartSuccess({ productId });
      })
    )
  );

  // Update Quantity Effect
  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateQuantity),
      map(({ productId, quantity }) => {
        return CartActions.updateQuantitySuccess({ productId, quantity });
      })
    )
  );

  // Clear Cart Effect
  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      map(() => {
        this.notificationService.info('Panier vidé');
        return CartActions.clearCartSuccess();
      })
    )
  );
}
