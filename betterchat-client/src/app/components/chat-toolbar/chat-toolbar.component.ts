import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrls: ['./chat-toolbar.component.scss']
})
export class ChatToolbarComponent implements OnInit {
  contact = {
    id: '2',
    name: 'Teo',
    image:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg',
    online: false
  };

  constructor() {}

  ngOnInit() {}
}
