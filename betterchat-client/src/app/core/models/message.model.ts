import { IUser } from './user.model';

export interface IMessage {
  id: string;
  text: string;
  from: IUser;
  to: IUser;
  date?: string;
}
