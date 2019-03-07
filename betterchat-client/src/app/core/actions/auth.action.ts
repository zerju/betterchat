import { IRegisterUser } from './../models/register-user.model';
import { ILoginUser } from '../models/login-user.model';
import { IUser } from '../models/user.model';
export class RegisteruserAction {
  static readonly type = '[Auth] Register User';
  constructor(public userData: IRegisterUser) {}
}

export class LoginUserAction {
  static readonly type = '[Auth] Login User';
  constructor(public loginUserData: ILoginUser) {}
}

export class GetSavedUserAction {
  static readonly type = '[Auth] Get Saved User';
  constructor(public userData: IUser) {}
}

export class LogoutUserAction {
  static readonly type = '[Auth] Logout User';
}

export class UpdateUserAction {
  static readonly type = '[Auth] Update User';
  constructor(public user: IUser) {}
}
