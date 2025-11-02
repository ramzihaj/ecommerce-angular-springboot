import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { mockInterceptor } from './core/interceptors/mock.interceptor';
import { reducers } from './store/reducers';
import { ProductEffects } from './store/effects/product.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { CartEffects } from './store/effects/cart.effects';
import { OrderEffects } from './store/effects/order.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([mockInterceptor, authInterceptor, errorInterceptor])
    ),
    provideStore(reducers),
    provideEffects([ProductEffects, AuthEffects, CartEffects, OrderEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
