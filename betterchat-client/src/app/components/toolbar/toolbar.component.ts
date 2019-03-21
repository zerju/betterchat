import { LogoutUserAction, UpdateUserAction } from './../../core/actions/auth.action';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleSidebar } from 'src/app/core/actions/layout.action';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  me: IUser;

  @Output()
  openProfileModal = new EventEmitter<void>();

  @Output()
  openAddFriend = new EventEmitter<void>();

  constructor(private store: Store) {}

  toggleSidenav() {
    this.store.dispatch(new ToggleSidebar());
  }

  logout() {
    this.store.dispatch(new LogoutUserAction(this.me.username));
  }

  toggleUserVisibility() {
    const meTemp: IUser = { ...this.me };
    meTemp.isOnline = !meTemp.isOnline;
    this.store.dispatch(new UpdateUserAction(meTemp));
  }
}
