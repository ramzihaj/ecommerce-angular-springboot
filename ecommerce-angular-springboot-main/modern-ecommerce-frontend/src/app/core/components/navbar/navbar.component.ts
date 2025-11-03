import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
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
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <nav class="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-elegant transition-all duration-300">
      <div class="container-custom">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-3 group">
            <div class="w-12 h-12 rounded-xl bg-gradient-bg flex items-center justify-center shadow-elegant group-hover:scale-105 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div class="hidden md:block">
              <h1 class="text-2xl font-display font-bold text-gradient">VibrantKraft</h1>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">Mobilier Moderne</p>
            </div>
          </a>

          <!-- Navigation Desktop -->
          <div class="hidden lg:flex items-center gap-1">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
               class="nav-link px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-300">
              Accueil
            </a>
            <a routerLink="/products" routerLinkActive="active"
               class="nav-link px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-300">
              Produits
            </a>
            
            <button [matMenuTriggerFor]="categoriesMenu"
                    class="nav-link px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-300 flex items-center gap-1">
              Catégories
              <mat-icon class="text-sm">expand_more</mat-icon>
            </button>
            <mat-menu #categoriesMenu="matMenu" class="mt-2">
              <button mat-menu-item class="font-medium">
                <mat-icon class="text-primary-600">weekend</mat-icon>
                <span>Canapés & Fauteuils</span>
              </button>
              <button mat-menu-item class="font-medium">
                <mat-icon class="text-primary-600">bed</mat-icon>
                <span>Chambres</span>
              </button>
              <button mat-menu-item class="font-medium">
                <mat-icon class="text-primary-600">table_restaurant</mat-icon>
                <span>Salles à manger</span>
              </button>
              <button mat-menu-item class="font-medium">
                <mat-icon class="text-primary-600">chair</mat-icon>
                <span>Bureaux</span>
              </button>
              <button mat-menu-item class="font-medium">
                <mat-icon class="text-primary-600">light</mat-icon>
                <span>Éclairages</span>
              </button>
            </mat-menu>

            <a routerLink="/about" routerLinkActive="active"
               class="nav-link px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-300">
              À propos
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Search -->
            <button class="hidden md:flex p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <mat-icon class="text-neutral-600 dark:text-neutral-400">search</mat-icon>
            </button>

            <!-- Theme Toggle -->
            <button (click)="toggleTheme()" 
                    class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <mat-icon class="text-neutral-600 dark:text-neutral-400">
                {{ isDarkMode() ? 'light_mode' : 'dark_mode' }}
              </mat-icon>
            </button>

            <!-- Cart -->
            <a routerLink="/cart" 
               class="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <mat-icon class="text-neutral-600 dark:text-neutral-400">shopping_bag</mat-icon>
              @if ((cartCount$ | async) ?? 0 > 0) {
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {{ cartCount$ | async }}
                </span>
              }
            </a>

            <!-- Login Button -->
            <a routerLink="/auth/login" 
               class="hidden md:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-elegant-lg hover:-translate-y-0.5">
              <mat-icon class="text-sm">person</mat-icon>
              <span>Connexion</span>
            </a>

            <!-- Mobile Menu -->
            <button (click)="toggleMobileMenu()" 
                    class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <mat-icon class="text-neutral-600 dark:text-neutral-400">
                {{ isMobileMenuOpen() ? 'close' : 'menu' }}
              </mat-icon>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        @if (isMobileMenuOpen()) {
          <div class="lg:hidden py-4 animate-slide-down border-t border-neutral-200 dark:border-neutral-800">
            <div class="flex flex-col gap-2">
              <a routerLink="/" (click)="closeMobileMenu()"
                 class="px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                Accueil
              </a>
              <a routerLink="/products" (click)="closeMobileMenu()"
                 class="px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                Produits
              </a>
              <a routerLink="/about" (click)="closeMobileMenu()"
                 class="px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition-colors">
                À propos
              </a>
              <div class="h-px bg-neutral-200 dark:bg-neutral-800 my-2"></div>
              <a routerLink="/auth/login" (click)="closeMobileMenu()"
                 class="px-4 py-3 rounded-lg bg-primary-600 text-white text-center font-semibold hover:bg-primary-700 transition-colors">
                Connexion
              </a>
            </div>
          </div>
        }
      </div>
    </nav>

    <style>
      .nav-link.active {
        @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20;
      }
    </style>
  `
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private store = inject(Store);
  
  cartCount$ = this.store.select(selectCartItemCount);
  isDarkMode = this.themeService.isDarkMode;
  isMobileMenuOpen = signal(false);

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
