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
  constructor(public username: string) {}
}

export class UpdateUserAction {
  static readonly type = '[Auth] Update User';
  constructor(public user: IUser) {}
}

export class UploadImageAction {
  static readonly type = '[Auth] Upload Image';
  constructor(public image: File) {}
}

export class SearchUsersAction {
  static readonly type = '[Auth] Search User';
  constructor(public username: string) {}
}

export class AddFriendAction {
  static readonly type = '[Auth] Add Friend';
  constructor(public friend: IUser) {}
}

export class GetFriendsAction {
  static readonly type = '[Auth] Get Friends';
}

export class RemoveFriendAction {
  static readonly type = '[Auth] Remove Friend'
  constructor(public friend: IUser) {}
}
