import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.apiService.post<any>('/auth/login', {
          emailOrUsername: action.emailOrUsername,
          password: action.password
        }).pipe(
          map(response => {
            localStorage.setItem('token', response.data.accessToken);
            return AuthActions.loginSuccess({
              user: response.data.user,
              token: response.data.accessToken
            });
          }),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action =>
        this.apiService.post<any>('/auth/register', action.userData).pipe(
          map(response => {
            localStorage.setItem('token', response.data.accessToken);
            return AuthActions.registerSuccess({
              user: response.data.user,
              token: response.data.accessToken
            });
          }),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      })
    ),
    { dispatch: false }
  );
}
