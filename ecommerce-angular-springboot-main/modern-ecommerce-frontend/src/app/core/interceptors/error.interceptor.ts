import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Unauthorized - redirect to login
        router.navigate(['/auth/login']);
      } else if (error.status === 403) {
        // Forbidden
        console.error('Access denied');
      } else if (error.status === 404) {
        // Not found
        console.error('Resource not found');
      } else if (error.status >= 500) {
        // Server error
        console.error('Server error occurred');
      }
      
      return throwError(() => error);
    })
  );
};
