import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { register } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule, MatCheckboxModule],
  template: `
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center py-12 px-4">
      <div class="max-w-2xl w-full">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
            <mat-icon class="!w-12 !h-12 !text-5xl text-white">person_add</mat-icon>
          </div>
          <h1 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-2">Créer un compte</h1>
          <p class="text-neutral-600 dark:text-neutral-400">Rejoignez Tunisia Shop aujourd'hui</p>
        </div>

        <!-- Register Form -->
        <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-elegant p-8">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Name Fields -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  formControlName="firstName"
                  placeholder="Jean"
                  class="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                @if (registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched) {
                  <p class="text-red-600 text-sm mt-1">Prénom requis</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  formControlName="lastName"
                  placeholder="Dupont"
                  class="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                @if (registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched) {
                  <p class="text-red-600 text-sm mt-1">Nom requis</p>
                }
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email *
              </label>
              <div class="relative">
                <input
                  type="email"
                  formControlName="email"
                  placeholder="votre@email.com"
                  class="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">email</mat-icon>
              </div>
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <p class="text-red-600 text-sm mt-1">Email valide requis</p>
              }
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Téléphone (Tunisie) *
              </label>
              <div class="relative">
                <input
                  type="tel"
                  formControlName="phone"
                  placeholder="12 345 678"
                  class="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">phone</mat-icon>
              </div>
              @if (registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched) {
                <p class="text-red-600 text-sm mt-1">Téléphone requis (8 chiffres)</p>
              }
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Mot de passe *
              </label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 pl-12 pr-12 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">lock</mat-icon>
                <button
                  type="button"
                  (click)="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <p class="text-red-600 text-sm mt-1">Minimum 6 caractères requis</p>
              }
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Confirmer le mot de passe *
              </label>
              <div class="relative">
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  formControlName="confirmPassword"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 pl-12 pr-12 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">lock_open</mat-icon>
                <button
                  type="button"
                  (click)="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <mat-icon>{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
              @if (registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched) {
                <p class="text-red-600 text-sm mt-1">Les mots de passe ne correspondent pas</p>
              }
            </div>

            <!-- Terms & Conditions -->
            <div>
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" formControlName="acceptTerms" class="w-4 h-4 mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span class="text-sm text-neutral-700 dark:text-neutral-300">
                  J'accepte les <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">conditions d'utilisation</a> et la <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">politique de confidentialité</a>
                </span>
              </label>
              @if (registerForm.get('acceptTerms')?.invalid && registerForm.get('acceptTerms')?.touched) {
                <p class="text-red-600 text-sm mt-1">Vous devez accepter les conditions</p>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="registerForm.invalid || isLoading"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              @if (isLoading) {
                <mat-icon class="animate-spin">refresh</mat-icon>
                Création en cours...
              } @else {
                <mat-icon>person_add</mat-icon>
                Créer mon compte
              }
            </button>
          </form>
        </div>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <p class="text-neutral-600 dark:text-neutral-400">
            Vous avez déjà un compte ?
            <a routerLink="/auth/login" class="text-primary-600 hover:text-primary-700 font-semibold ml-1">
              Se connecter
            </a>
          </p>
        </div>

        <!-- Back Home -->
        <div class="text-center mt-4">
          <a routerLink="/" class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm flex items-center justify-center gap-1">
            <mat-icon class="!text-lg">arrow_back</mat-icon>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        const { confirmPassword, acceptTerms, ...userData } = this.registerForm.value;
        this.store.dispatch(register(userData));
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      }, 1500);
    }
  }
}
