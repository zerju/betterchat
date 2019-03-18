import { ImageUploadComponent } from './../image-upload/image-upload.component';
import { UpdateUserAction } from './../../core/actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from './../../core/models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { existUsernameValidator } from './../../utils/validators/username-exists.validator';
import { existEmailValidator } from './../../utils/validators/email-exists.validator';
import { validatePassword } from 'src/app/utils/validators/password.validator';
import { newPasswordValidator } from 'src/app/utils/validators/new-password.validator';
import { otfCheckPasswordValidator } from 'src/app/utils/validators/otf-check-password.validator';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent {
  user: IUser;

  profileForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private http: HttpClient,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.user = data;
    this.profileForm = new FormGroup({
      username: new FormControl(
        data.username,
        [Validators.required],
        [existUsernameValidator(this.http, data.username)]
      ),
      email: new FormControl(
        data.email,
        [Validators.required],
        [existEmailValidator(this.http, data.email)]
      ),
      passwordGroup: new FormGroup(
        {
          currentPassword: new FormControl(null, [], [otfCheckPasswordValidator(this.http)]),
          password: new FormControl(null),
          repeatPassword: new FormControl(null)
        },
        [validatePassword, newPasswordValidator]
      )
    });
  }
  updateUser() {
    const username = this.profileForm.get('username').value;
    const email = this.profileForm.get('email').value;
    const password = this.profileForm.get('passwordGroup').get('password').value;
    const user: IUser = {
      username,
      email,
      password,
      isOnline: this.user.isOnline,
      id: this.user.id
    };
    this.store.dispatch(new UpdateUserAction(user));
  }

  openUploadImage() {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: this.user
    });
  }
}
