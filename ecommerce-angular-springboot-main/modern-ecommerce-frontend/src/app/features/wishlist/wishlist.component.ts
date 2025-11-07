import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectWishlistProducts, selectWishlistCount } from '../../store/selectors/wishlist.selectors';
import { removeFromWishlist, clearWishlist } from '../../store/actions/wishlist.actions';
import { addToCart } from '../../store/actions/cart.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div class="container-custom">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-display font-bold text-neutral-900 dark:text-white">
            Mes Favoris
            @if ((count$ | async) ?? 0 > 0) {
              <span class="text-2xl text-neutral-500 ml-2">({{ count$ | async }} {{ (count$ | async) === 1 ? 'produit' : 'produits' }})</span>
            }
          </h1>
          @if ((count$ | async) ?? 0 > 0) {
            <button (click)="onClearWishlist()" class="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
              <mat-icon>delete_outline</mat-icon>
              Vider la liste
            </button>
          }
        </div>

        @if ((items$ | async)?.length === 0) {
          <!-- Empty Wishlist -->
          <div class="text-center py-20">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <mat-icon class="!w-16 !h-16 !text-6xl text-neutral-400">favorite_border</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Votre liste de favoris est vide</h2>
            <p class="text-neutral-600 dark:text-neutral-400 mb-8">Ajoutez des produits à vos favoris pour les retrouver facilement</p>
            <a routerLink="/products" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
              <mat-icon>favorite</mat-icon>
              Découvrir nos produits
            </a>
          </div>
        } @else {
          <!-- Wishlist Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (product of items$ | async; track product.id) {
              <div class="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <!-- Product Image -->
                <div class="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                  <img [src]="product.imageUrl || product.images?.[0] || 'assets/placeholder.jpg'" 
                       [alt]="product.name"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  <!-- Remove Button -->
                  <button (click)="onRemoveFromWishlist(product.id)" 
                          class="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-md">
                    <mat-icon>close</mat-icon>
                  </button>

                  <!-- Badges -->
                  <div class="absolute top-3 left-3 flex flex-col gap-2">
                    @if (product.discountPrice && product.discountPrice < product.price) {
                      <span class="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        -{{ getDiscountPercent(product) }}%
                      </span>
                    }
                    @if (product.featured) {
                      <span class="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                        ⭐ Vedette
                      </span>
                    }
                  </div>
                </div>

                <!-- Product Info -->
                <div class="p-5">
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                    {{ product.name }}
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {{ product.brand }}
                  </p>

                  <!-- Rating -->
                  @if (product.rating) {
                    <div class="flex items-center gap-2 mb-3">
                      <div class="flex items-center gap-1">
                        @for (star of [1,2,3,4,5]; track star) {
                          <mat-icon class="text-amber-400 !text-base">
                            {{ star <= product.rating! ? 'star' : 'star_border' }}
                          </mat-icon>
                        }
                      </div>
                      <span class="text-sm text-neutral-600 dark:text-neutral-400">
                        ({{ product.reviewCount || 0 }})
                      </span>
                    </div>
                  }

                  <!-- Price -->
                  <div class="flex items-baseline gap-2 mb-4">
                    @if (product.discountPrice && product.discountPrice < product.price) {
                      <span class="text-2xl font-bold text-primary-600">{{ product.discountPrice }} TND</span>
                      <span class="text-sm text-neutral-400 line-through">{{ product.price }} TND</span>
                    } @else {
                      <span class="text-2xl font-bold text-neutral-900 dark:text-white">{{ product.price }} TND</span>
                    }
                  </div>

                  <!-- Stock Status -->
                  @if (product.stockQuantity > 0) {
                    <p class="text-sm text-green-600 dark:text-green-400 mb-4">
                      ✓ En stock ({{ product.stockQuantity }} disponibles)
                    </p>
                  } @else {
                    <p class="text-sm text-red-600 dark:text-red-400 mb-4">
                      ✗ Rupture de stock
                    </p>
                  }

                  <!-- Actions -->
                  <div class="flex gap-2">
                    <button (click)="onAddToCart(product)" 
                            [disabled]="product.stockQuantity === 0"
                            class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      <mat-icon class="!text-xl">shopping_cart</mat-icon>
                      <span class="hidden sm:inline">Ajouter au panier</span>
                      <span class="sm:hidden">Panier</span>
                    </button>
                    <a [routerLink]="['/products', product.id]" 
                       class="px-4 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-semibold transition-all flex items-center justify-center">
                      <mat-icon>visibility</mat-icon>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class WishlistComponent {
  private store = inject(Store);
  
  items$ = this.store.select(selectWishlistProducts);
  count$ = this.store.select(selectWishlistCount);

  onRemoveFromWishlist(productId: number) {
    this.store.dispatch(removeFromWishlist({ productId }));
  }

  onClearWishlist() {
    if (confirm('Êtes-vous sûr de vouloir vider votre liste de favoris ?')) {
      this.store.dispatch(clearWishlist());
    }
  }

  onAddToCart(product: any) {
    if (product.stockQuantity > 0) {
      this.store.dispatch(addToCart({ product, quantity: 1 }));
    }
  }

  getDiscountPercent(product: any): number {
    if (product.discountPrice && product.price) {
      return Math.round(((product.price - product.discountPrice) / product.price) * 100);
    }
    return 0;
  }
}
