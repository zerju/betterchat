import {
  SearchUsersAction,
  AddFriendAction,
  RemoveFriendAction
} from './../../core/actions/auth.action';
import { AuthState } from '../../core/state/auth.state';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from '../../core/state/layout.state';
import { PlatformState } from '../../core/state/platform.state';
import { GetPlatformAction } from '../../core/actions/platfrom.action';
import { CloseSidebar } from '../../core/actions/layout.action';
import { IUser } from '../../core/models/user.model';
import { MatDialog } from '@angular/material';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(LayoutState.getSidenavState) sidenavState$: Observable<boolean>;
  @Select(PlatformState.isMobile) isMobileState$: Observable<boolean>;
  @Select(AuthState.getUser) user$: Observable<IUser>;
  @Select(AuthState.getFoundUsers) foundUsers$: Observable<IUser[]>;
  @Select(AuthState.getFriendList) friends$: Observable<IUser[]>;

  @ViewChild('addFriendModal', { static: true })
  private _addFriendModal: TemplateRef<any>;

  onMobile: boolean;

  constructor(private store: Store, public dialog: MatDialog) {
    this.isMobileState$.subscribe(isMobile => {
      this.onMobile = isMobile;
      if (isMobile) {
        this.store.dispatch(new CloseSidebar());
      }
    });
    this.store.dispatch(new GetPlatformAction());
  }

  ngOnInit() {}

  openProfileModal() {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      data: this.user$
    });
  }
  openAddFriend() {
    this.dialog.open(this._addFriendModal);
  }

  searchUsers(username: string) {
    this.store.dispatch(new SearchUsersAction(username));
  }

  addFriend(friend: IUser) {
    this.store.dispatch(new AddFriendAction(friend));
  }
  removeFriend(friend: IUser) {
    this.store.dispatch(new RemoveFriendAction(friend));
  }
}
