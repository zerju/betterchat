import { IFriend } from './../../core/models/friend.model';
import { IUser } from './../../core/models/user.model';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  @Output()
  searchUsers = new EventEmitter<string>();
  @Output()
  addFriend = new EventEmitter<IUser>();
  @Output()
  removeFriend = new EventEmitter<IUser>();

  addingIds = [];

  private _foundUsers: IUser[];
  @Input()
  set foundUsers(users: IUser[]) {
    this._foundUsers = users;
    console.log(users);
    this.addingIds = [];
  }
  get foundUsers(): IUser[] {
    return this._foundUsers;
  }

  usernameControl = new FormControl();

  added = false;
  constructor() {}

  ngOnInit() {}

  onAddFriend(friend: IUser) {
    this.addingIds.push(friend.id);
    this.addFriend.next(friend);
  }
}
