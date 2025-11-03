import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TunisiaProduct } from '../../models/tunisia-product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule, ProductCardComponent],
  template: `
    <div>
      @if (title) {
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            {{ title }}
          </h2>
          @if (subtitle) {
            <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              {{ subtitle }}
            </p>
          }
        </div>
      }

      <!-- Products Grid -->
      <div [ngClass]="gridClass">
        @for (product of products; track product.id) {
          <app-product-card
            [product]="product"
            [showArabic]="showArabic"
            (addToCart)="onAddToCart($event)"
            (addToWishlist)="onAddToWishlist($event)"
            (quickView)="onQuickView($event)"
          />
        } @empty {
          <div class="col-span-full">
            <div class="text-center py-16">
              <mat-icon class="text-6xl text-neutral-300 dark:text-neutral-700 mb-4">
                {{ emptyIcon }}
              </mat-icon>
              <p class="text-neutral-500 dark:text-neutral-400 text-lg">
                {{ emptyMessage }}
              </p>
            </div>
          </div>
        }
      </div>

      <!-- Load More Button -->
      @if (showLoadMore && products.length > 0) {
        <div class="text-center mt-12">
          <button 
            class="btn-outline"
            (click)="onLoadMore()"
            [disabled]="loading">
            @if (loading) {
              <mat-icon class="animate-spin">refresh</mat-icon>
              Chargement...
            } @else {
              Voir Plus
              <mat-icon class="ml-2">expand_more</mat-icon>
            }
          </button>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProductGridComponent {
  @Input() products: TunisiaProduct[] = [];
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() columns: 2 | 3 | 4 = 4;
  @Input() showArabic: boolean = false;
  @Input() showLoadMore: boolean = false;
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'Aucun produit trouvé';
  @Input() emptyIcon: string = 'inventory_2';

  @Output() addToCart = new EventEmitter<TunisiaProduct>();
  @Output() addToWishlist = new EventEmitter<TunisiaProduct>();
  @Output() quickView = new EventEmitter<TunisiaProduct>();
  @Output() loadMore = new EventEmitter<void>();

  get gridClass(): string {
    const baseClass = 'grid gap-6';
    switch (this.columns) {
      case 2:
        return `${baseClass} grid-cols-1 md:grid-cols-2`;
      case 3:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case 4:
      default:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-4`;
    }
  }

  onAddToCart(product: TunisiaProduct): void {
    this.addToCart.emit(product);
  }

  onAddToWishlist(product: TunisiaProduct): void {
    this.addToWishlist.emit(product);
  }

  onQuickView(product: TunisiaProduct): void {
    this.quickView.emit(product);
  }

  onLoadMore(): void {
    this.loadMore.emit();
  }
}
