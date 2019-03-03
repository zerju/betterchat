import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validatePassword } from './../../utils/validators/password.validator';
import { Store } from '@ngxs/store';
import { RegisteruserAction } from './../../core/actions/auth.action';
import { IRegisterUser } from './../../core/models/register-user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pwGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required])
      },
      [validatePassword]
    )
  });

  constructor(private store: Store) {}

  ngOnInit() {}

  register() {
    const user: IRegisterUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.pwGroup.password
    };
    console.log(user);
    this.store.dispatch(new RegisteruserAction(user));
  }
}
