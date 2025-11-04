import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
  subcategories?: Category[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <!-- Hero Section -->
      <section class="gradient-bg text-white py-20">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-display font-bold mb-6">
            Nos Catégories
          </h1>
          <p class="text-xl text-white/90 max-w-2xl mx-auto">
            Explorez notre large gamme de meubles tunisiens pour chaque pièce de votre maison
          </p>
        </div>
      </section>

      <!-- Categories Grid -->
      <section class="section-padding">
        <div class="container-custom">
          @if (loading) {
            <div class="flex items-center justify-center py-20">
              <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
            </div>
          } @else if (categories.length > 0) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (category of categories; track category.id) {
                <div class="card-elegant card-hover group cursor-pointer" 
                     [routerLink]="['/products']" 
                     [queryParams]="{category: category.id}">
                  <!-- Category Image/Icon -->
                  <div class="aspect-[4/3] bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 relative overflow-hidden">
                    @if (category.imageUrl) {
                      <img [src]="category.imageUrl" [alt]="category.name" 
                           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    } @else {
                      <div class="absolute inset-0 flex items-center justify-center">
                        <mat-icon class="text-[120px] text-primary-600/20 dark:text-primary-400/20 group-hover:scale-110 transition-transform duration-300">
                          {{ getCategoryIcon(category.name) }}
                        </mat-icon>
                      </div>
                    }
                    <!-- Product Count Badge -->
                    @if (category.productCount !== undefined && category.productCount > 0) {
                      <div class="absolute top-4 right-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-elegant">
                        <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                          {{ category.productCount }} produits
                        </span>
                      </div>
                    }
                  </div>

                  <!-- Category Info -->
                  <div class="p-6">
                    <h3 class="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {{ category.name }}
                    </h3>
                    @if (category.description) {
                      <p class="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                        {{ category.description }}
                      </p>
                    }
                    
                    <!-- Subcategories -->
                    @if (category.subcategories && category.subcategories.length > 0) {
                      <div class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div class="flex flex-wrap gap-2">
                          @for (sub of category.subcategories.slice(0, 3); track sub.id) {
                            <span class="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                              {{ sub.name }}
                            </span>
                          }
                          @if (category.subcategories.length > 3) {
                            <span class="text-xs px-3 py-1 text-primary-600 dark:text-primary-400 font-semibold">
                              +{{ category.subcategories.length - 3 }}
                            </span>
                          }
                        </div>
                      </div>
                    }

                    <!-- Action Button -->
                    <div class="mt-6">
                      <div class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all">
                        Explorer la catégorie
                        <mat-icon class="text-sm">arrow_forward</mat-icon>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="text-center py-20">
              <mat-icon class="text-[120px] text-neutral-300 dark:text-neutral-700 mb-6">category</mat-icon>
              <h3 class="text-2xl font-display font-bold text-neutral-700 dark:text-neutral-300 mb-4">
                Aucune catégorie disponible
              </h3>
              <p class="text-neutral-500 dark:text-neutral-400 mb-8">
                Les catégories seront bientôt disponibles
              </p>
              <a routerLink="/" class="btn-primary">
                Retour à l'accueil
              </a>
            </div>
          }
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom">
          <div class="card-elegant bg-gradient-bg text-white text-center p-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contactez notre équipe pour des recommandations personnalisées
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <a routerLink="/products" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Voir tous les produits
              </a>
              <a routerLink="/contact" class="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
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
export class CategoriesComponent implements OnInit {
  private http = inject(HttpClient);
  
  categories: Category[] = [];
  loading = true;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.http.get<{ success: boolean; data: Category[] }>(`${environment.apiUrl}/categories`)
      .subscribe({
        next: (response) => {
          this.categories = response.data || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.loading = false;
          // Fallback to mock data if backend is not available
          this.categories = this.getMockCategories();
        }
      });
  }

  getCategoryIcon(categoryName: string): string {
    const name = categoryName.toLowerCase();
    if (name.includes('salon') || name.includes('canapé')) return 'weekend';
    if (name.includes('chambre') || name.includes('lit')) return 'bed';
    if (name.includes('salle') || name.includes('manger')) return 'table_restaurant';
    if (name.includes('cuisine')) return 'countertops';
    if (name.includes('bureau')) return 'chair';
    if (name.includes('décor') || name.includes('éclairage')) return 'light';
    return 'category';
  }

  getMockCategories(): Category[] {
    return [
      {
        id: 1,
        name: 'Canapés & Fauteuils',
        description: 'Découvrez notre collection de canapés et fauteuils confortables et élégants',
        productCount: 45,
        subcategories: [
          { id: 11, name: 'Canapés 3 places' },
          { id: 12, name: 'Canapés d\'angle' },
          { id: 13, name: 'Fauteuils' }
        ]
      },
      {
        id: 2,
        name: 'Chambres',
        description: 'Ensembles de chambres à coucher complets et meubles individuels',
        productCount: 38,
        subcategories: [
          { id: 21, name: 'Lits' },
          { id: 22, name: 'Armoires' },
          { id: 23, name: 'Tables de chevet' }
        ]
      },
      {
        id: 3,
        name: 'Salles à manger',
        description: 'Tables, chaises et buffets pour vos moments en famille',
        productCount: 28,
        subcategories: [
          { id: 31, name: 'Tables' },
          { id: 32, name: 'Chaises' },
          { id: 33, name: 'Buffets' }
        ]
      },
      {
        id: 4,
        name: 'Bureaux',
        description: 'Mobilier de bureau moderne pour un espace de travail productif',
        productCount: 22,
        subcategories: [
          { id: 41, name: 'Bureaux' },
          { id: 42, name: 'Chaises de bureau' },
          { id: 43, name: 'Rangements' }
        ]
      },
      {
        id: 5,
        name: 'Éclairages',
        description: 'Luminaires design pour illuminer votre intérieur',
        productCount: 35,
        subcategories: [
          { id: 51, name: 'Suspensions' },
          { id: 52, name: 'Lampadaires' },
          { id: 53, name: 'Lampes de table' }
        ]
      },
      {
        id: 6,
        name: 'Décoration',
        description: 'Accessoires et objets déco pour personnaliser votre espace',
        productCount: 50,
        subcategories: [
          { id: 61, name: 'Miroirs' },
          { id: 62, name: 'Tapis' },
          { id: 63, name: 'Coussins' }
        ]
      }
    ];
  }
}
