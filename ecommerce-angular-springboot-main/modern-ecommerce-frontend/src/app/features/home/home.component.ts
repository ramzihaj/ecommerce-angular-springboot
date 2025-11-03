import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { loadFeaturedProducts } from '../../store/actions/product.actions';
import { selectFeaturedProducts } from '../../store/selectors/product.selectors';
import { addToCart } from '../../store/actions/cart.actions';
import { toggleWishlist } from '../../store/actions/wishlist.actions';
import { TndCurrencyPipe } from '../../shared/pipes/tnd-currency.pipe';
import { TunisiaService } from '../../shared/services/tunisia.service';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { TunisiaProduct } from '../../shared/models/tunisia-product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, TndCurrencyPipe, ProductGridComponent],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center hero-pattern overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-accent-50/80 dark:from-neutral-900/95 dark:via-neutral-900/90 dark:to-neutral-800/95"></div>
      
      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="animate-slide-right">
            <span class="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6">
              🇹🇳 Made in Tunisia - Collection 2024
            </span>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              Mobilier <span class="text-gradient">Tunisien</span> Pour Votre Maison
            </h1>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl">
              Découvrez notre collection exclusive de meubles design tunisiens qui allient confort, élégance et qualité artisanale pour transformer votre espace de vie.
            </p>
            <div class="flex flex-wrap gap-4">
              <a routerLink="/products" class="btn-primary">
                Voir la Collection
                <mat-icon class="ml-2">arrow_forward</mat-icon>
              </a>
              <button class="btn-outline">
                Catalogue PDF
                <mat-icon class="ml-2">download</mat-icon>
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-700">
              <div>
                <div class="text-3xl font-bold text-gradient mb-1">200+</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Produits</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-gradient mb-1">5k+</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Clients TN</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-gradient mb-1">24</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Gouvernorats</div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative animate-slide-left">
            <div class="relative rounded-3xl overflow-hidden shadow-elegant-lg">
              <div class="aspect-[4/5] bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900 dark:to-accent-900"></div>
              <!-- Placeholder for hero image -->
              <div class="absolute inset-0 flex items-center justify-center">
                <mat-icon class="text-[200px] text-white/20">weekend</mat-icon>
              </div>
            </div>
            <!-- Floating badges -->
            <div class="absolute -top-6 -left-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-elegant-lg p-4 animate-float">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <mat-icon class="text-green-600">local_shipping</mat-icon>
                </div>
                <div>
                  <div class="font-bold text-neutral-900 dark:text-white">Livraison Gratuite</div>
                  <div class="text-xs text-neutral-500">> 200 TND</div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-elegant-lg p-4 animate-float" style="animation-delay: 1s;">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <mat-icon class="text-primary-600">verified</mat-icon>
                </div>
                <div>
                  <div class="font-bold text-neutral-900 dark:text-white">Garantie 5 ans</div>
                  <div class="text-xs text-neutral-500">Sur tous nos produits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section-padding bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Nos Catégories
          </h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explorez notre gamme complète de meubles pour chaque pièce de votre maison
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (category of categories; track category.name) {
            <div class="group card-elegant card-hover cursor-pointer">
              <div class="aspect-square bg-gradient-to-br {{ category.gradient }} relative overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <mat-icon class="text-[120px] text-white/30 group-hover:scale-110 transition-transform duration-300">
                    {{ category.icon }}
                  </mat-icon>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                  {{ category.name }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {{ category.count }} produits
                </p>
                <a href="#" class="text-primary-600 dark:text-primary-400 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorer
                  <mat-icon class="text-sm">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section-padding gradient-bg-subtle">
      <div class="container-custom">
        <app-product-grid
          [products]="(featuredProducts$ | async) || []"
          [title]="'Produits en Vedette'"
          [subtitle]="'Découvrez nos meubles tunisiens les plus populaires, sélectionnés avec soin pour vous'"
          [columns]="4"
          [showArabic]="false"
          (addToCart)="handleAddToCart($event)"
          (addToWishlist)="handleAddToWishlist($event)"
          (quickView)="handleQuickView($event)"
        />

        <div class="text-center mt-12">
          <a routerLink="/products" class="btn-outline">
            Voir Tous les Produits
            <mat-icon class="ml-2">arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="section-padding bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Pourquoi Nous Choisir ?
          </h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Votre satisfaction est notre priorité absolue
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (feature of features; track feature.title) {
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br {{ feature.color }} flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
                <mat-icon class="text-4xl text-white">{{ feature.icon }}</mat-icon>
              </div>
              <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400">
                {{ feature.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">
            Restez Informé de Nos Nouveautés
          </h2>
          <p class="text-xl text-white/90 mb-8">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande
          </p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              class="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button class="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transition-all hover:shadow-elegant-lg hover:-translate-y-0.5">
              S'inscrire
            </button>
          </div>
          <p class="text-sm text-white/70 mt-4">
            🔒 Vos données sont protégées. Pas de spam, promis !
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  private tunisiaService = inject(TunisiaService);
  
  featuredProducts$ = this.store.select(selectFeaturedProducts);
  locale: 'fr' | 'ar' = 'fr'; // Can be changed based on user preference

  categories = [
    { name: 'Salon', nameAr: 'صالون', icon: 'weekend', count: 45, gradient: 'from-primary-500 to-primary-600' },
    { name: 'Chambre', nameAr: 'غرفة النوم', icon: 'bed', count: 38, gradient: 'from-secondary-500 to-secondary-600' },
    { name: 'Salle à Manger', nameAr: 'غرفة الطعام', icon: 'table_restaurant', count: 28, gradient: 'from-accent-500 to-accent-600' },
    { name: 'Cuisine', nameAr: 'مطبخ', icon: 'countertops', count: 22, gradient: 'from-orange-500 to-red-500' },
    { name: 'Bureau', nameAr: 'مكتب', icon: 'chair', count: 18, gradient: 'from-blue-500 to-indigo-500' },
    { name: 'Décoration', nameAr: 'ديكور', icon: 'palette', count: 35, gradient: 'from-purple-500 to-pink-500' }
  ];

  features = [
    {
      icon: 'local_shipping',
      title: 'Livraison Tunisie',
      titleAr: 'توصيل في تونس',
      description: 'Livraison dans les 24 gouvernorats. Gratuite > 200 TND',
      descriptionAr: 'توصيل في 24 ولاية. مجاني فوق 200 دينار',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'payments',
      title: 'Paiement Flexible',
      titleAr: 'دفع مرن',
      description: 'D17, Konnect, Flouci ou paiement à la livraison',
      descriptionAr: 'D17، كونكت، فلوسي أو الدفع عند الاستلام',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'support_agent',
      title: 'Support Local',
      titleAr: 'دعم محلي',
      description: 'Équipe tunisienne disponible pour vous assister',
      descriptionAr: 'فريق تونسي متاح لمساعدتك',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'verified',
      title: 'Qualité Tunisienne',
      titleAr: 'جودة تونسية',
      description: 'Produits fabriqués localement avec garantie',
      descriptionAr: 'منتجات محلية مع ضمان',
      color: 'from-primary-500 to-primary-600'
    }
  ];

  ngOnInit() {
    this.store.dispatch(loadFeaturedProducts());
  }

  calculateDiscount(price: number, discountPrice: number): number {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  formatPrice(price: number): string {
    return this.tunisiaService.formatTND(price);
  }

  handleAddToCart(product: TunisiaProduct): void {
    this.store.dispatch(addToCart({ product, quantity: 1 }));
  }

  handleAddToWishlist(product: TunisiaProduct): void {
    this.store.dispatch(toggleWishlist({ product }));
  }

  handleQuickView(product: TunisiaProduct): void {
    // Naviger vers la page détail
    window.location.href = `/products/${product.id}`;
  }
}
