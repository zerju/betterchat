import { WebsocketService } from './../../core/services/websocket.service';
import { SendMessage } from './../../core/actions/message.action';
import { Store } from '@ngxs/store';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input-box',
  templateUrl: './chat-input-box.component.html',
  styleUrls: ['./chat-input-box.component.scss']
})
export class ChatInputBoxComponent implements OnInit {
  message = '';
  @Output()
  sendMessage = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  private _sendMessage(event: any) {
    event.preventDefault();
    if (this.message.trim().length > 0) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}
