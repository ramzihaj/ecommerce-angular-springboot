import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeService } from '../../services/theme.service';
import { Store } from '@ngrx/store';
import { selectCartItemCount } from '../../../store/selectors/cart.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto flex items-center justify-between">
        <a routerLink="/" class="text-2xl font-bold text-gradient">
          🛒 E-Commerce
        </a>
        
        <nav class="flex items-center gap-4">
          <a routerLink="/products" mat-button>Products</a>
          <a routerLink="/cart" mat-button>
            <mat-icon [matBadge]="cartCount$ | async" matBadgeColor="warn">shopping_cart</mat-icon>
          </a>
          <button mat-icon-button (click)="toggleTheme()">
            <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <a routerLink="/auth/login" mat-raised-button color="primary">Login</a>
        </nav>
      </div>
    </mat-toolbar>
  `
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private store = inject(Store);
  
  cartCount$ = this.store.select(selectCartItemCount);
  isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
