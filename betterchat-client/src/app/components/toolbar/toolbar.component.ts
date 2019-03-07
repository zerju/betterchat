import { LogoutUserAction, UpdateUserAction } from './../../core/actions/auth.action';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleSidebar } from 'src/app/core/actions/layout.action';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  me: IUser;

  defaultImage =
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg';
  constructor(private store: Store) {}

  toggleSidenav() {
    this.store.dispatch(new ToggleSidebar());
  }

  logout() {
    this.store.dispatch(new LogoutUserAction());
  }

  toggleUserVisibility() {
    const meTemp: IUser = { ...this.me };
    meTemp.isOnline = !meTemp.isOnline;
    this.store.dispatch(new UpdateUserAction(meTemp));
  }
}
