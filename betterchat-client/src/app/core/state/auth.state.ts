import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IUser } from '../models/user.model';
import { RegisteruserAction, LoginUserAction, GetSavedUser } from '../actions/auth.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export class AuthStateModel {
  user: IUser;
}

const API_URL = environment.apiUrl;

@State<AuthStateModel>({ name: 'auth' })
export class AuthState {
  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router) {}

  @Selector() static getUser(state: AuthStateModel) {
    return state.user;
  }
  @Selector() static getToken(state: AuthStateModel) {
    return state.user.jwtToken;
  }

  @Action(RegisteruserAction)
  register(context: StateContext<AuthStateModel>, action: RegisteruserAction) {
    this.http
      .post(`${API_URL}/auth/register`, action.userData)
      .pipe(
        tap(res => {
          this.ngZone.run(() => this.router.navigate(['auth', 'login']));
        }),
        catchError(err => of(err))
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
          context.patchState({ user });
          this.ngZone.run(() => this.router.navigate(['']));
        })
      )
      .subscribe();
  }

  @Action(GetSavedUser)
  setUserData(context: StateContext<AuthStateModel>, action: GetSavedUser) {
    context.patchState({ user: action.userData });
  }
}
