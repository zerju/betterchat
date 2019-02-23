import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleSidebar } from 'src/app/core/actions/layout.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  me = {
    id: '1',
    name: 'Johny 1231 312 3123 12312',
    image:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
    online: true
  };
  constructor(private store: Store) {}

  ngOnInit() {}

  toggleSidenav() {
    this.store.dispatch(new ToggleSidebar());
  }
}
