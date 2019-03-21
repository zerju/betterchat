import { IJwtResponse } from './../models/jwt-response.model';
import { LogoutUserAction, UpdateUserAction, UploadImageAction } from './../actions/auth.action';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
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
  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

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
          context.patchState({ apiError: null });
          this.store.dispatch(new GetSavedUserAction(user));
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
  LogoutUserAction(context: StateContext<AuthStateModel>, action: LogoutUserAction) {
    const state = context.getState();
    this.http
      .post(`${API_URL}/auth/logout`, { username: action.username })
      .pipe(
        tap(() => {
          window.location.reload();
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
        }),
        catchError(err => {
          window.location.reload();
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(UpdateUserAction)
  updateUser(context: StateContext<AuthStateModel>, action: UpdateUserAction) {
    this.http
      .put<any>(`${API_URL}/user/update`, action.user)
      .pipe(
        tap(res => {
          const state = context.getState();
          const user = { ...state.user };

          for (const key in res.user) {
            user[key] = res.user[key];
          }
          this.store.dispatch(new GetSavedUserAction(user));
          // context.setState({ ...state, user });
          // context.patchState({ user });
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
          const updatedUser = { ...state.user };
          for (const key in user) {
            updatedUser[key] = user[key];
          }
          this.store.dispatch(new GetSavedUserAction(user));
        })
      )
      .subscribe();
  }
}
