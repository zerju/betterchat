import { State, Action, StateContext } from '@ngxs/store';
import { IUser } from '../models/user.model';
import { RegisteruserAction } from '../actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';

export class AuthStateModel {
  user: IUser;
}

@State<AuthStateModel>({ name: 'auth' })
export class AuthState {
  constructor(private http: HttpClient) {}

  @Action(RegisteruserAction)
  register(context: StateContext<AuthStateModel>, action: RegisteruserAction) {
    this.http
      .post(environment.apiUrl + '/auth/register', action.userData)
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(err => of(err))
      )
      .subscribe();
  }
}
