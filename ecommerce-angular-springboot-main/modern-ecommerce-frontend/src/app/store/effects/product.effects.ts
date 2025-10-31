import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as ProductActions from '../actions/product.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(action =>
        this.apiService.get<any>('/products', {
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
        )
      )
    )
  );

  loadFeaturedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadFeaturedProducts),
      exhaustMap(() =>
        this.apiService.get<any>('/products/featured', { limit: 8 }).pipe(
          map(response => ProductActions.loadFeaturedProductsSuccess({
            products: response.data
          })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );
}
