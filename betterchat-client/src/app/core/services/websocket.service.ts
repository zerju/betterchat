import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: SocketIOClient.Socket;
  private API_URL = environment.apiUrl;

  constructor() {}

  getSocket(): SocketIOClient.Socket {
    return this.socket;
  }
  connect(jwt) {
    this.socket = io(`${this.API_URL}?jwt=${jwt}`);
  }
}
