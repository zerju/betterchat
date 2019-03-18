import { UserSession } from './../entity/user-session.entity';
import { IUserSession } from './user-session.interface';
export interface IUser {
  id?: string;
  username: string;
  email?: string;
  image?: string;
  isOnline?: boolean;
  jwtToken?: string;
  password?: string;
  sessions?: UserSession;
}
