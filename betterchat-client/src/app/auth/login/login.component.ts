import { AuthState } from './../../core/state/auth.state';
import { ILoginUser } from './../../core/models/login-user.model';
import { LoginUserAction } from './../../core/actions/auth.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(AuthState.getApiError) loginError$: Observable<string>;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private store: Store) {}

  ngOnInit() {}

  login() {
    const user: ILoginUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new LoginUserAction(user));
  }
}
