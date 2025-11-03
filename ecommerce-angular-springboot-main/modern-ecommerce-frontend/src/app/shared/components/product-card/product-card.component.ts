import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TunisiaProduct } from '../../models/tunisia-product.model';
import { TndCurrencyPipe } from '../../pipes/tnd-currency.pipe';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, TndCurrencyPipe],
  template: `
    <div class="card-elegant card-hover group cursor-pointer h-full flex flex-col" 
         [routerLink]="['/products', product.id]">
      <!-- Image -->
      <div class="relative overflow-hidden">
        <img 
          [src]="product.imageUrl" 
          [alt]="product.name"
          class="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
          (error)="onImageError($event)"
        />
        
        <!-- Badges -->
        <div class="absolute top-4 right-4 flex flex-col gap-2">
          @if (product.newArrival) {
            <span class="badge badge-primary shadow-lg">
              <mat-icon class="text-sm mr-1">new_releases</mat-icon>
              Nouveau
            </span>
          }
          @if (product.madeInTunisia) {
            <span class="badge bg-red-600 text-white shadow-lg">
              🇹🇳 Made in Tunisia
            </span>
          }
          @if (product.bestSeller) {
            <span class="badge bg-amber-500 text-white shadow-lg">
              <mat-icon class="text-sm mr-1">star</mat-icon>
              Best Seller
            </span>
          }
          @if (discountPercentage > 0) {
            <span class="badge bg-green-500 text-white shadow-lg font-bold">
              -{{ discountPercentage }}%
            </span>
          }
        </div>

        <!-- Stock Badge -->
        @if (!isInStock) {
          <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span class="badge badge-lg bg-red-600 text-white">
              <mat-icon class="mr-2">inventory_2</mat-icon>
              Rupture de stock
            </span>
          </div>
        }

        <!-- Hover Actions -->
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
             (click)="$event.stopPropagation()">
          <button 
            class="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            (click)="onAddToWishlist($event)"
            [disabled]="!isInStock">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button 
            class="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            (click)="onAddToCart($event)"
            [disabled]="!isInStock">
            <mat-icon>shopping_cart</mat-icon>
          </button>
          <button 
            class="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            (click)="onQuickView($event)">
            <mat-icon>visibility</mat-icon>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 flex-1 flex flex-col">
        <!-- Category & Brand -->
        <div class="flex items-center justify-between mb-2">
          @if (product.categoryName) {
            <span class="text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide">
              {{ product.categoryName }}
            </span>
          }
          @if (product.brand) {
            <span class="text-xs text-neutral-500 dark:text-neutral-400">
              {{ product.brand }}
            </span>
          }
        </div>

        <!-- Rating -->
        @if (product.rating) {
          <div class="flex items-center gap-1 mb-2">
            @for (star of [1,2,3,4,5]; track star) {
              <mat-icon class="text-sm" 
                        [class.text-accent-500]="star <= (product.rating || 0)"
                        [class.text-neutral-300]="star > (product.rating || 0)">
                {{ star <= (product.rating || 0) ? 'star' : 'star_border' }}
              </mat-icon>
            }
            @if (product.reviewCount) {
              <span class="text-xs text-neutral-500 ml-1">({{ product.reviewCount }})</span>
            }
          </div>
        }

        <!-- Name -->
        <h3 class="font-display font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {{ product.name }}
        </h3>

        <!-- Arabic Name -->
        @if (showArabic && product.nameAr) {
          <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-2 font-arabic text-right">
            {{ product.nameAr }}
          </p>
        }

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Price & Add to Cart -->
        <div class="flex items-end justify-between mt-4">
          <div>
            @if (discountPercentage > 0) {
              <div class="flex flex-col">
                <span class="text-2xl font-bold text-primary-600">
                  {{ finalPrice | tndCurrency }}
                </span>
                <span class="text-sm text-neutral-500 line-through">
                  {{ product.price | tndCurrency }}
                </span>
              </div>
            } @else {
              <span class="text-2xl font-bold text-primary-600">
                {{ product.price | tndCurrency }}
              </span>
            }
          </div>
          
          <button 
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold disabled:bg-neutral-300 disabled:cursor-not-allowed"
            (click)="onAddToCart($event)"
            [disabled]="!isInStock">
            <mat-icon class="text-sm">{{ isInStock ? 'shopping_cart' : 'inventory_2' }}</mat-icon>
            {{ isInStock ? 'Ajouter' : 'Épuisé' }}
          </button>
        </div>

        <!-- Stock Indicator -->
        @if (isInStock && product.stockQuantity <= 5) {
          <div class="mt-3 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <mat-icon class="text-xs">warning</mat-icon>
            Plus que {{ product.stockQuantity }} en stock !
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .font-arabic {
      font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
    }

    .badge-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: TunisiaProduct;
  @Input() showArabic: boolean = false;
  
  @Output() addToCart = new EventEmitter<TunisiaProduct>();
  @Output() addToWishlist = new EventEmitter<TunisiaProduct>();
  @Output() quickView = new EventEmitter<TunisiaProduct>();

  constructor(private productService: ProductService) {}

  get isInStock(): boolean {
    return this.productService.isInStock(this.product);
  }

  get finalPrice(): number {
    return this.productService.getFinalPrice(this.product);
  }

  get discountPercentage(): number {
    return this.productService.getDiscountPercentage(this.product);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.isInStock) {
      this.addToCart.emit(this.product);
    }
  }

  onAddToWishlist(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.addToWishlist.emit(this.product);
  }

  onQuickView(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.quickView.emit(this.product);
  }

  onImageError(event: Event): void {
    // Fallback image si l'image ne charge pas
    (event.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + this.product.name.substring(0, 20) + '%3C/text%3E%3C/svg%3E';
  }
}
