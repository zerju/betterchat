import { IRegisterUser } from './../models/register-user.model';
export class RegisteruserAction {
  static readonly type = '[Auth] Register User';
  constructor(public userData: IRegisterUser) {}
}
