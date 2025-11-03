import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TunisiaService, TUNISIA_GOVERNORATES, PAYMENT_METHODS } from '../../shared/services/tunisia.service';
import { TndCurrencyPipe } from '../../shared/pipes/tnd-currency.pipe';

@Component({
  selector: 'app-tunisia-info',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TndCurrencyPipe],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <!-- Header -->
      <section class="section-padding gradient-bg text-white">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-display font-bold mb-6">
            🇹🇳 Livraison en Tunisie
          </h1>
          <p class="text-xl text-white/90 max-w-3xl mx-auto">
            Nous livrons dans tous les gouvernorats tunisiens avec des tarifs transparents et des délais garantis
          </p>
        </div>
      </section>

      <!-- Gouvernorats -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Zones de Livraison
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300">
              24 gouvernorats couverts
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (gov of governorates; track gov.code) {
              <div class="card-elegant p-6 hover:shadow-elegant-lg transition-shadow">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-1">
                      {{ gov.name }}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">{{ gov.nameAr }}</p>
                  </div>
                  <mat-icon class="text-primary-600">location_on</mat-icon>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Délai</div>
                    <div class="font-semibold text-neutral-900 dark:text-white">{{ gov.shippingDays }} jours</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Frais</div>
                    <div class="font-semibold text-primary-600">{{ gov.shippingFeeTnd | tndCurrency }}</div>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Free Shipping Info -->
          <div class="mt-12 card-elegant bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 text-center">
            <mat-icon class="text-6xl text-green-600 mb-4">local_shipping</mat-icon>
            <h3 class="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
              Livraison Gratuite
            </h3>
            <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-4">
              Pour toute commande supérieure à <strong>200 TND</strong>
            </p>
            <button class="btn-primary">
              Commander Maintenant
              <mat-icon class="ml-2">arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- Payment Methods -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Méthodes de Paiement
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300">
              Payez comme vous préférez
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            @for (method of paymentMethods; track method.id) {
              <div class="card-elegant p-6 hover:shadow-elegant-lg transition-all hover:-translate-y-1 cursor-pointer">
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                    <mat-icon class="text-3xl text-white">{{ method.icon }}</mat-icon>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-1">
                      {{ method.name }}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{{ method.nameAr }}</p>
                    <p class="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                      {{ method.description }}
                    </p>
                    @if (method.maxAmountTnd) {
                      <div class="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                        Limite: {{ method.maxAmountTnd | tndCurrency }}
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Shipping Process -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Comment Ça Marche ?
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-300">
              Processus simple en 4 étapes
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (step of shippingSteps; track step.number) {
              <div class="text-center">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br {{ step.color }} text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-elegant">
                  {{ step.number }}
                </div>
                <h3 class="text-xl font-display font-bold text-neutral-900 dark:text-white mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                  {{ step.description }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section-padding bg-white dark:bg-neutral-900">
        <div class="container-custom max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Questions Fréquentes
            </h2>
          </div>

          <div class="space-y-4">
            @for (faq of faqs; track faq.question) {
              <div class="card-elegant p-6">
                <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-start gap-3">
                  <mat-icon class="text-primary-600 flex-shrink-0">help_outline</mat-icon>
                  {{ faq.question }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400 ml-11">
                  {{ faq.answer }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class TunisiaInfoComponent {
  private tunisiaService = inject(TunisiaService);

  governorates = TUNISIA_GOVERNORATES;
  paymentMethods = PAYMENT_METHODS;

  shippingSteps = [
    {
      number: 1,
      title: 'Commandez',
      description: 'Choisissez vos produits et passez commande en ligne',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 2,
      title: 'Confirmation',
      description: 'Recevez la confirmation par email et SMS',
      color: 'from-green-500 to-green-600'
    },
    {
      number: 3,
      title: 'Préparation',
      description: 'Nous préparons votre commande avec soin',
      color: 'from-amber-500 to-amber-600'
    },
    {
      number: 4,
      title: 'Livraison',
      description: 'Recevez votre commande à domicile',
      color: 'from-primary-500 to-primary-600'
    }
  ];

  faqs = [
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais varient selon le gouvernorat : 1-2 jours pour le Grand Tunis, 2-4 jours pour le Sahel, et jusqu\'à 4-6 jours pour les régions du Sud.'
    },
    {
      question: 'Comment puis-je suivre ma commande ?',
      answer: 'Vous recevrez un numéro de suivi par SMS et email dès l\'expédition de votre commande. Vous pourrez suivre votre colis en temps réel.'
    },
    {
      question: 'Puis-je payer à la livraison ?',
      answer: 'Oui, le paiement à la livraison est disponible pour les commandes jusqu\'à 2000 TND. Au-delà, vous devrez utiliser D17, Konnect ou Flouci.'
    },
    {
      question: 'Que faire si je ne suis pas disponible lors de la livraison ?',
      answer: 'Notre livreur vous contactera avant la livraison. Si vous n\'êtes pas disponible, nous pouvons reprogrammer la livraison ou livrer à une autre adresse.'
    },
    {
      question: 'Les produits sont-ils garantis ?',
      answer: 'Oui, tous nos produits sont garantis. Les produits Made in Tunisia bénéficient d\'une garantie de 5 ans.'
    }
  ];
}
