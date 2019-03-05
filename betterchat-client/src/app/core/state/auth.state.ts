import { State, Action, StateContext } from '@ngxs/store';
import { IUser } from '../models/user.model';
import { RegisteruserAction } from '../actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { Router } from "@angular/router";
import { NgZone } from "@angular/core";

export class AuthStateModel {
  user: IUser;
}

@State<AuthStateModel>({ name: 'auth' })
export class AuthState {
  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router) {}

  @Action(RegisteruserAction)
  register(context: StateContext<AuthStateModel>, action: RegisteruserAction) {
    this.http
      .post(environment.apiUrl + '/auth/register', action.userData)
      .pipe(
        tap(res => {
          this.ngZone.run(() => this.router.navigate(['auth','login']));
        }),
        catchError(err => of(err))
      )
      .subscribe();
  }
}
