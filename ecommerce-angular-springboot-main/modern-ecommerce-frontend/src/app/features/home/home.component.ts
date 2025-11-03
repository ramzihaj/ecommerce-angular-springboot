import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { loadFeaturedProducts } from '../../store/actions/product.actions';
import { selectFeaturedProducts } from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center hero-pattern overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-accent-50/80 dark:from-neutral-900/95 dark:via-neutral-900/90 dark:to-neutral-800/95"></div>
      
      <div class="container-custom relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="animate-slide-right">
            <span class="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6">
              ✨ Collection 2024
            </span>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              Mobilier <span class="text-gradient">Moderne</span> Pour Votre Maison
            </h1>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl">
              Découvrez notre collection exclusive de meubles design qui allient confort, élégance et durabilité pour transformer votre espace de vie.
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
                <div class="text-3xl font-bold text-gradient mb-1">500+</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Produits</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-gradient mb-1">10k+</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Clients Satisfaits</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-gradient mb-1">98%</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">Satisfaction</div>
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
                  <div class="text-xs text-neutral-500">Partout en France</div>
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
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Produits en Vedette
          </h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Découvrez nos meubles les plus populaires, sélectionnés avec soin pour vous
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (product of featuredProducts$ | async; track product.id) {
            <div class="card-elegant card-hover group cursor-pointer">
              <div class="relative overflow-hidden">
                <div class="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700"></div>
                <span class="absolute top-4 right-4 badge badge-primary">Nouveau</span>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button class="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <mat-icon>favorite_border</mat-icon>
                  </button>
                  <button class="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <mat-icon>shopping_cart</mat-icon>
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-1 mb-2">
                  @for (star of [1,2,3,4,5]; track star) {
                    <mat-icon class="text-accent-500 text-sm">star</mat-icon>
                  }
                  <span class="text-xs text-neutral-500 ml-1">(48)</span>
                </div>
                <h3 class="font-display font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                  {{ product.name }}
                </h3>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-primary-600">{{ product.price }}€</span>
                  <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full text-center py-16">
              <mat-icon class="text-6xl text-neutral-300 dark:text-neutral-700 mb-4">inventory_2</mat-icon>
              <p class="text-neutral-500 dark:text-neutral-400">Aucun produit en vedette pour le moment</p>
            </div>
          }
        </div>

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
  
  featuredProducts$ = this.store.select(selectFeaturedProducts);

  categories = [
    { name: 'Salon', icon: 'weekend', count: 150, gradient: 'from-primary-500 to-primary-600' },
    { name: 'Chambre', icon: 'bed', count: 120, gradient: 'from-secondary-500 to-secondary-600' },
    { name: 'Salle à Manger', icon: 'table_restaurant', count: 85, gradient: 'from-accent-500 to-accent-600' },
    { name: 'Bureau', icon: 'chair', count: 95, gradient: 'from-primary-600 to-accent-500' }
  ];

  features = [
    {
      icon: 'local_shipping',
      title: 'Livraison Gratuite',
      description: 'Profitez de la livraison gratuite sur toutes vos commandes',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'verified_user',
      title: 'Paiement Sécurisé',
      description: 'Transactions 100% sécurisées avec cryptage SSL',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'schedule',
      title: 'Support 24/7',
      description: 'Notre équipe est disponible pour vous aider à tout moment',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'workspace_premium',
      title: 'Garantie Qualité',
      description: 'Garantie 5 ans sur tous nos produits',
      color: 'from-primary-500 to-primary-600'
    }
  ];

  ngOnInit() {
    this.store.dispatch(loadFeaturedProducts());
  }
}
