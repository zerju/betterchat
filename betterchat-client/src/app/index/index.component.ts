import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetFriendsAction } from '../core/actions/auth.action';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFriendsAction());
  }
}
