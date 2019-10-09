import { IUser } from '../../core/models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { CloseSidebar } from './../../core/actions/layout.action';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input()
  friends: IUser[];

  @Output()
  friendSelected = new EventEmitter<IUser>();
  @Output()
  removeFriend = new EventEmitter<IUser>();

  constructor(private store: Store) {}

  ngOnInit() {}

  openChat(personId: string) {
    this.store.dispatch(new CloseSidebar());
  }
}
