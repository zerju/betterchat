import { User } from '../entity/user.entity';
import { IUser } from './user.interface';

export interface IUserSession {
  id?: string;
  user?: User;
  jwt: string;
  location?: string;
  deviceType?: string;
  lastActivity: number;
}
