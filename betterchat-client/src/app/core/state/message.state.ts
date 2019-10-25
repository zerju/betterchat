import { State, Action, StateContext } from '@ngxs/store';
import { SendMessage } from '../actions/message.action';

export class MessageStateModel {}

@State<MessageStateModel>({ name: 'message', defaults: {} })
export class MessageState {
  @Action(SendMessage)
  toggle(context: StateContext<MessageStateModel>, action: SendMessage) {
    console.log(action.message);
  }
}
