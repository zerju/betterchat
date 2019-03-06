import { LogoutUserAction } from './../actions/auth.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IUser } from '../models/user.model';
import { RegisteruserAction, LoginUserAction, GetSavedUserAction } from '../actions/auth.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export class AuthStateModel {
  user: IUser;
  apiError: string;
}

const API_URL = environment.apiUrl;

@State<AuthStateModel>({ name: 'auth', defaults: { apiError: null, user: null } })
export class AuthState {
  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router) {}

  @Selector() static getUser(state: AuthStateModel) {
    return state.user;
  }
  @Selector() static getToken(state: AuthStateModel) {
    return state.user.jwtToken;
  }

  @Selector() static getApiError(state: AuthStateModel) {
    return state.apiError;
  }

  @Action(RegisteruserAction)
  register(context: StateContext<AuthStateModel>, action: RegisteruserAction) {
    this.http
      .post(`${API_URL}/auth/register`, action.userData)
      .pipe(
        tap(res => {
          context.patchState({ apiError: null });
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
        }),
        catchError(err => {
          if (err.error.message) {
            context.patchState({ apiError: err.error.message });
          } else {
            context.patchState({ apiError: err.statusText });
          }
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(LoginUserAction)
  login(context: StateContext<AuthStateModel>, action: LoginUserAction) {
    this.http
      .post<any>(`${API_URL}/auth/login`, action.loginUserData)
      .pipe(
        tap(res => {
          const user = jwt_decode(res.jwt);
          localStorage.setItem('user', JSON.stringify(user));
          context.patchState({ user, apiError: null });
          this.ngZone.run(() => this.router.navigate(['']));
        }),
        catchError(err => {
          if (err.error.message) {
            context.patchState({ apiError: err.error.message });
          } else {
            context.patchState({ apiError: err.statusText });
          }
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(GetSavedUserAction)
  setUserData(context: StateContext<AuthStateModel>, action: GetSavedUserAction) {
    context.patchState({ user: action.userData });
  }

  @Action(LogoutUserAction)
  LogoutUserAction(context: StateContext<AuthStateModel>) {
    localStorage.removeItem('user');
    context.patchState({ user: null });
    this.ngZone.run(() => this.router.navigate(['auth', 'login']));
  }
}
