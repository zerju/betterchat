import { HttpClient } from '@angular/common/http';
import { existUsernameValidator } from './../../utils/validators/username-exists.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validatePassword } from './../../utils/validators/password.validator';
import { Store, Select } from '@ngxs/store';
import { RegisteruserAction } from './../../core/actions/auth.action';
import { IRegisterUser } from './../../core/models/register-user.model';
import { existEmailValidator } from 'src/app/utils/validators/email-exists.validator';
import { AuthState } from 'src/app/core/state/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Select(AuthState.getApiError) loginError$: Observable<string>;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required], [existUsernameValidator(this.http)]),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [existEmailValidator(this.http)]
    ),
    pwGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required])
      },
      [validatePassword]
    )
  });

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('pwGroup').get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('pwGroup').get('repeatPassword');
  }

  get pwGroup() {
    return this.registerForm.get('pwGroup');
  }

  constructor(private store: Store, private http: HttpClient) {}

  ngOnInit() {}

  register() {
    const user: IRegisterUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.pwGroup.password
    };
    this.store.dispatch(new RegisteruserAction(user));
  }
}
