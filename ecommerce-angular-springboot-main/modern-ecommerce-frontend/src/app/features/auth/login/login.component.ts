import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  template: `
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
            <mat-icon class="!w-12 !h-12 !text-5xl text-white">person</mat-icon>
          </div>
          <h1 class="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-2">Connexion</h1>
          <p class="text-neutral-600 dark:text-neutral-400">Accédez à votre compte Tunisia Shop</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-elegant p-8">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
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
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                <p class="text-red-600 text-sm mt-1">Email requis et valide</p>
              }
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Mot de passe
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
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <p class="text-red-600 text-sm mt-1">Mot de passe requis (min 6 caractères)</p>
              }
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" formControlName="rememberMe" class="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span class="text-sm text-neutral-700 dark:text-neutral-300">Se souvenir de moi</span>
              </label>
              <a href="#" class="text-sm text-primary-600 hover:text-primary-700 font-medium">Mot de passe oublié?</a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              @if (isLoading) {
                <mat-icon class="animate-spin">refresh</mat-icon>
                Connexion en cours...
              } @else {
                <mat-icon>login</mat-icon>
                Se connecter
              }
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white dark:bg-neutral-800 text-neutral-500">OU</span>
              </div>
            </div>

            <!-- Social Login -->
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
              >
                <mat-icon class="text-blue-600">facebook</mat-icon>
                Facebook
              </button>
              <button
                type="button"
                class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
              >
                <mat-icon class="text-red-600">mail</mat-icon>
                Google
              </button>
            </div>
          </form>
        </div>

        <!-- Register Link -->
        <div class="text-center mt-6">
          <p class="text-neutral-600 dark:text-neutral-400">
            Pas encore de compte ?
            <a routerLink="/auth/register" class="text-primary-600 hover:text-primary-700 font-semibold ml-1">
              Créer un compte
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
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.store.dispatch(login(this.loginForm.value));
        this.isLoading = false;
        this.router.navigate(['/']);
      }, 1500);
    }
  }
}
