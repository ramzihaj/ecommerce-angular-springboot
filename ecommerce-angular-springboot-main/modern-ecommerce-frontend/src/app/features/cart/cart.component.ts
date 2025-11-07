import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal, selectCartItemCount } from '../../store/selectors/cart.selectors';
import { removeFromCart, updateQuantity, clearCart } from '../../store/actions/cart.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div class="container-custom">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-display font-bold text-neutral-900 dark:text-white">
            Mon Panier
            @if ((itemCount$ | async) ?? 0 > 0) {
              <span class="text-2xl text-neutral-500 ml-2">({{ itemCount$ | async }} {{ (itemCount$ | async) === 1 ? 'article' : 'articles' }})</span>
            }
          </h1>
          @if ((itemCount$ | async) ?? 0 > 0) {
            <button (click)="onClearCart()" class="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
              <mat-icon>delete_outline</mat-icon>
              Vider le panier
            </button>
          }
        </div>

        @if ((items$ | async)?.length === 0) {
          <!-- Empty Cart -->
          <div class="text-center py-20">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <mat-icon class="!w-16 !h-16 !text-6xl text-neutral-400">shopping_cart</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Votre panier est vide</h2>
            <p class="text-neutral-600 dark:text-neutral-400 mb-8">Découvrez nos produits et ajoutez-en à votre panier</p>
            <a routerLink="/products" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">
              <mat-icon>shopping_bag</mat-icon>
              Découvrir nos produits
            </a>
          </div>
        } @else {
          <!-- Cart Items -->
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Items List -->
            <div class="lg:col-span-2 space-y-4">
              @for (item of items$ | async; track item.product.id) {
                <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex gap-6">
                    <!-- Product Image -->
                    <div class="flex-shrink-0">
                      <img [src]="item.product.imageUrl || item.product.images?.[0] || 'assets/placeholder.jpg'" 
                           [alt]="item.product.name"
                           class="w-32 h-32 object-cover rounded-xl" />
                    </div>

                    <!-- Product Info -->
                    <div class="flex-grow">
                      <div class="flex justify-between">
                        <div>
                          <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                            {{ item.product.name }}
                          </h3>
                          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            {{ item.product.brand }}
                          </p>
                          
                          <!-- Price -->
                          <div class="flex items-baseline gap-2">
                            @if (item.product.discountPrice && item.product.discountPrice < item.product.price) {
                              <span class="text-2xl font-bold text-primary-600">{{ item.product.discountPrice }} TND</span>
                              <span class="text-lg text-neutral-400 line-through">{{ item.product.price }} TND</span>
                            } @else {
                              <span class="text-2xl font-bold text-neutral-900 dark:text-white">{{ item.product.price }} TND</span>
                            }
                          </div>
                        </div>

                        <!-- Remove Button -->
                        <button (click)="onRemoveItem(item.product.id)" 
                                class="text-red-600 hover:text-red-700 h-fit">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>

                      <!-- Quantity Controls -->
                      <div class="mt-4 flex items-center gap-4">
                        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Quantité:</span>
                        <div class="flex items-center gap-3">
                          <button (click)="onDecreaseQuantity(item)" 
                                  [disabled]="item.quantity <= 1"
                                  class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                            <mat-icon class="text-xl">remove</mat-icon>
                          </button>
                          <span class="text-lg font-bold text-neutral-900 dark:text-white min-w-[2rem] text-center">{{ item.quantity }}</span>
                          <button (click)="onIncreaseQuantity(item)" 
                                  [disabled]="item.quantity >= item.product.stockQuantity"
                                  class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                            <mat-icon class="text-xl">add</mat-icon>
                          </button>
                        </div>
                        <span class="text-sm text-neutral-500">(Max: {{ item.product.stockQuantity }})</span>
                      </div>

                      <!-- Subtotal -->
                      <div class="mt-3 text-right">
                        <span class="text-sm text-neutral-600 dark:text-neutral-400">Sous-total: </span>
                        <span class="text-xl font-bold text-primary-600">
                          {{ getItemSubtotal(item) }} TND
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Récapitulatif</h2>
                
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Sous-total</span>
                    <span class="font-semibold">{{ total$ | async }} TND</span>
                  </div>
                  <div class="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Livraison</span>
                    <span class="font-semibold">7.00 TND</span>
                  </div>
                  <div class="h-px bg-neutral-200 dark:bg-neutral-700"></div>
                  <div class="flex justify-between text-xl font-bold text-neutral-900 dark:text-white">
                    <span>Total</span>
                    <span class="text-primary-600">{{ (total$ | async)! + 7 }} TND</span>
                  </div>
                </div>

                <button routerLink="/checkout" 
                        class="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <mat-icon>shopping_cart_checkout</mat-icon>
                  Passer la commande
                </button>

                <button routerLink="/products" 
                        class="w-full mt-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <mat-icon>arrow_back</mat-icon>
                  Continuer mes achats
                </button>

                <!-- Info -->
                <div class="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <p class="text-sm text-primary-800 dark:text-primary-200 flex items-start gap-2">
                    <mat-icon class="text-primary-600 !text-xl">local_shipping</mat-icon>
                    <span>Livraison gratuite pour les commandes supérieures à 200 TND</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  private store = inject(Store);
  
  items$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);
  itemCount$ = this.store.select(selectCartItemCount);

  onRemoveItem(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  onIncreaseQuantity(item: any) {
    this.store.dispatch(updateQuantity({ 
      productId: item.product.id, 
      quantity: item.quantity + 1 
    }));
  }

  onDecreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.store.dispatch(updateQuantity({ 
        productId: item.product.id, 
        quantity: item.quantity - 1 
      }));
    }
  }

  onClearCart() {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.store.dispatch(clearCart());
    }
  }

  getItemSubtotal(item: any): number {
    const price = item.product.discountPrice || item.product.price;
    return price * item.quantity;
  }
}
