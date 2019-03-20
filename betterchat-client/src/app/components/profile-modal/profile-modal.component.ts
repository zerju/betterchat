import { ImageUploadComponent } from './../image-upload/image-upload.component';
import { UpdateUserAction } from './../../core/actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from './../../core/models/user.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { existUsernameValidator } from './../../utils/validators/username-exists.validator';
import { existEmailValidator } from './../../utils/validators/email-exists.validator';
import { validatePassword } from 'src/app/utils/validators/password.validator';
import { newPasswordValidator } from 'src/app/utils/validators/new-password.validator';
import { otfCheckPasswordValidator } from 'src/app/utils/validators/otf-check-password.validator';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnDestroy {
  user: IUser;
  closeDialog = false;

  profileForm: FormGroup;
  userSub$: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Observable<IUser>,
    private http: HttpClient,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.userSub$ = this.data.subscribe(res => {
      this.user = res;
      this.profileForm = new FormGroup({
        email: new FormControl(
          res.email,
          [Validators.required],
          [existEmailValidator(this.http, res.email)]
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
    });
  }

  ngOnDestroy() {
    this.userSub$.unsubscribe();
  }

  updateUser() {
    const email = this.profileForm.get('email').value;
    const password = this.profileForm.get('passwordGroup').get('password').value;
    const user: IUser = {
      username: this.user.username,
      email,
      password,
      isOnline: this.user.isOnline,
      id: this.user.id
    };
    if (email === this.user.email && (password == null || password === '')) {
      this.closeDialog = true;
    } else {
      this.store.dispatch(new UpdateUserAction(user));
      this.closeDialog = true;
    }
  }

  openUploadImage() {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: this.user
    });
  }
}
