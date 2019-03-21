import { IUser } from 'src/app/core/models/user.model';
import { IFriend } from './../../core/models/friend.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent implements OnInit {
  @Input()
  friend: IUser;

  @Output()
  friendSelected = new EventEmitter<IUser>();

  constructor() {}

  ngOnInit() {}
}
