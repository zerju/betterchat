import { SendMessage } from './../../core/actions/message.action';
import { WebsocketService } from '../../core/services/websocket.service';
import { IUser } from './../../core/models/user.model';
import { Observable } from 'rxjs';
import { AuthState } from './../../core/state/auth.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent implements OnInit {
  @Select(AuthState.getUser) user$: Observable<IUser>;
  constructor(private websocket: WebsocketService, private store: Store) {}

  ngOnInit() {
    this.user$
      .pipe(
        tap(user => {
          this.websocket.connect(user.jwtToken);
        })
      )
      .subscribe();
  }

  sendMessage(message: string) {
    this.store.dispatch(new SendMessage(message));
  }
}
