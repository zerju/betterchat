export interface IUser {
  id?: string;
  username: string;
  email?: string;
  isOnline?: boolean;
  image?: string;
  jwtToken?: string;
  iat?: number;
  exp?: number;
  password?: string;
}
