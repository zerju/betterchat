import { IUser } from './user.interface';
export interface ISocket {
  id: string;
  user?: IUser;
}
