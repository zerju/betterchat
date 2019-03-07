export interface IUser {
  id: string;
  name: string;
  isOnline: boolean;
  image: string;
  jwtToken?: string;
  iat?: number;
  exp?: number;
}
