import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as WishlistActions from '../actions/wishlist.actions';
import { selectWishlistProducts } from '../selectors/wishlist.selectors';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class WishlistEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private notificationService = inject(NotificationService);

  // Add to Wishlist Effect
  addToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.addToWishlist),
      map(({ product }) => {
        this.notificationService.success(`${product.name} ajouté aux favoris !`);
        return WishlistActions.addToWishlistSuccess({ product });
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de l\'ajout aux favoris');
        return of(WishlistActions.addToWishlistFailure({ error: error.message }));
      })
    )
  );

  // Remove from Wishlist Effect
  removeFromWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.removeFromWishlist),
      map(({ productId }) => {
        this.notificationService.info('Produit retiré des favoris');
        return WishlistActions.removeFromWishlistSuccess({ productId });
      })
    )
  );

  // Toggle Wishlist Effect
  toggleWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.toggleWishlist),
      withLatestFrom(this.store.select(selectWishlistProducts)),
      map(([{ product }, wishlistProducts]) => {
        const isInWishlist = wishlistProducts.some(p => p.id === product.id);
        
        if (isInWishlist) {
          this.notificationService.info('Produit retiré des favoris');
        } else {
          this.notificationService.success(`${product.name} ajouté aux favoris !`);
        }
        
        // The actual toggle logic is handled in the reducer
        return { type: '[Wishlist] Toggle Complete' };
      })
    ),
    { dispatch: false }
  );

  // Clear Wishlist Effect
  clearWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.clearWishlist),
      map(() => {
        this.notificationService.info('Favoris vidés');
        return WishlistActions.clearWishlistSuccess();
      })
    )
  );
}
