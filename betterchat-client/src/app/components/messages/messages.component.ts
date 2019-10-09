import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../core/models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  contactList = [
    {
      id: '1',
      username: 'Johny 1231 312 3123 12312',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
      isOnline: true
    },
    {
      id: '2',
      username: 'Teo',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
      isOnline: false
    }
  ];
  me = this.contactList[0];

  messages: IMessage[] = [
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[0],
      to: this.contactList[1],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    },
    {
      id: '2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Etiam vitae lorem iaculis, ultrices tortor sit amet, pretium nisl. Vestibulum accumsan.',
      from: this.contactList[1],
      to: this.contactList[0],
      date: new Date().toISOString()
    }
  ];

  constructor() {}

  ngOnInit() {}

  focus(el: HTMLElement, index: number) {
    console.log(el, index);
  }
}
