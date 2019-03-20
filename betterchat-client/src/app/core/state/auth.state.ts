import { IJwtResponse } from './../models/jwt-response.model';
import { LogoutUserAction, UpdateUserAction, UploadImageAction } from './../actions/auth.action';
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

// AUTH STATE OR USER STATE - BOTH IN THE SAME STATE
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
          const user = res.user;
          const jwt = jwt_decode(res.jwt);
          user.iat = jwt.iat;
          user.exp = jwt.exp;
          user.jwtToken = res.jwt;
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
    const state = context.getState();
    this.http
      .post(`${API_URL}/auth/logout`, { username: state.user.username })
      .pipe(
        tap(() => {
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
          context.patchState({ user: null });
        }),
        catchError(err => {
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
          context.patchState({ user: null });
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(UpdateUserAction)
  updateUser(context: StateContext<AuthStateModel>, action: UpdateUserAction) {
    const state = context.getState();
    this.http
      .put<any>(`${API_URL}/user/update`, action.user)
      .pipe(
        tap(res => {
          let user = { ...state.user };
          user = { ...user, ...res.user };
          return context.patchState({ user });
        }),
        catchError(err => of(err))
      )
      .subscribe();
  }

  @Action(UploadImageAction)
  uploadImage(context: StateContext<AuthStateModel>, action: UploadImageAction) {
    const formData = new FormData();
    const state = context.getState();
    formData.append('image', action.image);
    this.http
      .post<any>(`${API_URL}/user/avatar`, formData)
      .pipe(
        tap(user => {
          let updatedUser = { ...state.user };
          updatedUser = { ...updatedUser, ...user };
          context.patchState({ user: updatedUser });
        })
      )
      .subscribe();
  }
}
