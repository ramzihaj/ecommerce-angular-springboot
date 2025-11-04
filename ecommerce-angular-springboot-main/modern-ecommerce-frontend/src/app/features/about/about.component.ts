import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-white dark:bg-neutral-900">
      <!-- Hero Section -->
      <section class="gradient-bg text-white py-20">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-display font-bold mb-6">
            À Propos de Darna
          </h1>
          <p class="text-xl text-white/90 max-w-3xl mx-auto">
            Votre destination pour du mobilier tunisien de qualité, alliant tradition et modernité
          </p>
        </div>
      </section>

      <!-- Story Section -->
      <section class="section-padding gradient-bg-subtle">
        <div class="container-custom">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span class="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6">
                Notre Histoire
              </span>
              <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                Mobilier Tunisien d'Excellence
              </h2>
              <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-4">
                Depuis notre création, Darna s'engage à proposer des meubles tunisiens de haute qualité, 
                fabriqués localement par des artisans passionnés. Notre mission est de transformer votre 
                maison en un espace de vie exceptionnel.
              </p>
              <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                Chaque pièce de notre collection est soigneusement sélectionnée pour son design, sa qualité 
                et son confort. Nous travaillons avec des fabricants tunisiens renommés pour vous offrir 
                le meilleur du savoir-faire local.
              </p>
              <div class="flex flex-wrap gap-4">
                <a routerLink="/products" class="btn-primary">
                  Découvrir nos produits
                  <mat-icon class="ml-2">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
            <div class="relative">
              <div class="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900 dark:to-accent-900 shadow-elegant-lg overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <mat-icon class="text-[200px] text-white/20">home_work</mat-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Nos Valeurs
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (value of values; track value.title) {
              <div class="text-center group">
                <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br {{ value.gradient }} flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
                  <mat-icon class="text-4xl text-white">{{ value.icon }}</mat-icon>
                </div>
                <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-3">
                  {{ value.title }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                  {{ value.description }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="section-padding gradient-bg-subtle">
        <div class="container-custom">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            @for (stat of stats; track stat.label) {
              <div class="text-center">
                <div class="text-5xl font-display font-bold text-gradient mb-2">
                  {{ stat.value }}
                </div>
                <div class="text-neutral-600 dark:text-neutral-400 font-medium">
                  {{ stat.label }}
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Pourquoi Choisir Darna ?
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Des avantages qui font la différence
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (feature of features; track feature.title) {
              <div class="card-elegant p-8 text-center group hover:shadow-elegant-lg transition-all">
                <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br {{ feature.color }} flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <mat-icon class="text-3xl text-white">{{ feature.icon }}</mat-icon>
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

      <!-- Tunisian Identity Section -->
      <section class="section-padding gradient-bg text-white">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto text-center">
            <div class="text-6xl mb-6">🇹🇳</div>
            <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">
              Fier de Notre Identité Tunisienne
            </h2>
            <p class="text-xl text-white/90 mb-8">
              Nous soutenons l'économie locale et valorisons le savoir-faire tunisien. 
              Tous nos produits sont fabriqués en Tunisie par des artisans locaux, 
              avec des matériaux de qualité et un contrôle rigoureux.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div class="text-3xl font-bold mb-2">100%</div>
                <div class="text-white/80">Made in Tunisia</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div class="text-3xl font-bold mb-2">24</div>
                <div class="text-white/80">Gouvernorats Livrés</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div class="text-3xl font-bold mb-2">5 ans</div>
                <div class="text-white/80">Garantie</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom">
          <div class="card-elegant bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 text-center p-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Prêt à Transformer Votre Maison ?
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              Explorez notre collection et trouvez les meubles parfaits pour votre intérieur
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <a routerLink="/products" class="btn-primary">
                Voir la collection
                <mat-icon class="ml-2">arrow_forward</mat-icon>
              </a>
              <a routerLink="/categories" class="btn-outline">
                Parcourir par catégorie
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AboutComponent {
  values = [
    {
      icon: 'verified',
      title: 'Qualité Garantie',
      description: 'Tous nos produits sont testés et garantis 5 ans',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: 'handshake',
      title: 'Service Client',
      description: 'Une équipe tunisienne à votre écoute 7j/7',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'local_shipping',
      title: 'Livraison Rapide',
      description: 'Livraison dans toute la Tunisie sous 48h',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: 'workspace_premium',
      title: 'Artisanat Local',
      description: 'Fabrication tunisienne par des artisans qualifiés',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  stats = [
    { value: '5,000+', label: 'Clients Satisfaits' },
    { value: '200+', label: 'Produits' },
    { value: '24', label: 'Gouvernorats' },
    { value: '5 ans', label: 'Garantie' }
  ];

  features = [
    {
      icon: 'payments',
      title: 'Paiement Flexible',
      description: 'D17, Konnect, Flouci ou paiement à la livraison disponibles',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'sync',
      title: 'Échange & Retour',
      description: 'Politique d\'échange flexible sous 14 jours',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: 'support_agent',
      title: 'Support Technique',
      description: 'Assistance gratuite pour montage et installation',
      color: 'from-green-500 to-emerald-600'
    }
  ];
}
