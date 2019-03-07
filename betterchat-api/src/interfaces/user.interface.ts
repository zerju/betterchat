export interface IUser {
  id: number;
  username: string;
  email: string;
  image?: string;
  isOnline: boolean;
  jwtToken?: string;
  password?: string;
}
