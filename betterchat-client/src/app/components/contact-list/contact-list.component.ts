import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CloseSidebar } from './../../core/actions/layout.action';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList = [
    {
      id: '1',
      name: 'Johny 1231 312 3123 12312',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
      online: true
    },
    {
      id: '2',
      name: 'Teo',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
      online: false
    }
  ];

  constructor(private store: Store) {}

  ngOnInit() {}

  openChat(personId: string) {
    this.store.dispatch(new CloseSidebar());
  }
}
