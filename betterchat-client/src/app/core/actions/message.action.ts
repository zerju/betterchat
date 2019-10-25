export class SendMessage {
  static readonly type = '[Message] SendMessage';
  constructor(public message: string) {}
}
