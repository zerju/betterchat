export interface IUser {
  id: string;
  name: string;
  online: boolean;
  image: string;
  jwtToken?: string;
}
