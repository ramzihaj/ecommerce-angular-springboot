import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, delay } from 'rxjs/operators';
import * as ProductActions from '../actions/product.actions';
import { ApiService } from '../../core/services/api.service';
import { MOCK_TUNISIA_PRODUCTS } from '../../shared/models/tunisia-product.model';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  // Mode développement : utiliser des données mockées tunisiennes
  private readonly USE_MOCK_DATA = true;

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(action => {
        if (this.USE_MOCK_DATA) {
          // Utiliser les produits mockés tunisiens
          const startIndex = action.page * action.size;
          const endIndex = startIndex + action.size;
          const paginatedProducts = MOCK_TUNISIA_PRODUCTS.slice(startIndex, endIndex);
          
          return of({
            products: paginatedProducts,
            totalPages: Math.ceil(MOCK_TUNISIA_PRODUCTS.length / action.size),
            currentPage: action.page
          }).pipe(
            delay(300), // Simuler un délai réseau
            map(response => ProductActions.loadProductsSuccess(response))
          );
        }

        return this.apiService.get<any>('/products', {
          page: action.page,
          size: action.size,
          sortBy: action.sortBy || 'createdAt'
        }).pipe(
          map(response => ProductActions.loadProductsSuccess({
            products: response.data.content,
            totalPages: response.data.totalPages,
            currentPage: response.data.pageNumber
          })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        );
      })
    )
  );

  loadFeaturedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadFeaturedProducts),
      exhaustMap(() => {
        if (this.USE_MOCK_DATA) {
          // Retourner les produits tunisiens en vedette
          const featuredProducts = MOCK_TUNISIA_PRODUCTS.filter(p => p.featured);
          
          return of(featuredProducts).pipe(
            delay(300), // Simuler un délai réseau
            map(products => ProductActions.loadFeaturedProductsSuccess({ products }))
          );
        }

        return this.apiService.get<any>('/products/featured', { limit: 8 }).pipe(
          map(response => ProductActions.loadFeaturedProductsSuccess({
            products: response.data
          })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        );
      })
    )
  );
}
