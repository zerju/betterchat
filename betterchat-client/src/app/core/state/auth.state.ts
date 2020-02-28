import { IJwtResponse } from "./../models/jwt-response.model";
import {
  LogoutUserAction,
  UpdateUserAction,
  UploadImageAction,
  SearchUsersAction,
  AddFriendAction,
  GetFriendsAction,
  RemoveFriendAction
} from "./../actions/auth.action";
import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { IUser } from "../models/user.model";
import {
  RegisteruserAction,
  LoginUserAction,
  GetSavedUserAction
} from "../actions/auth.action";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { NgZone } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { IFriend } from "../models/friend.model";

export class AuthStateModel {
  user: IUser;
  friends: IUser[];
  foundUsers: IUser[];
  apiError: string;
}

const API_URL = environment.apiUrl;

// AUTH STATE OR USER STATE - BOTH IN THE SAME STATE
@State<AuthStateModel>({
  name: "auth",
  defaults: { apiError: null, user: null, friends: null, foundUsers: null }
})
export class AuthState {
  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  @Selector() static getUser(state: AuthStateModel) {
    return state.user;
  }
  @Selector() static getToken(state: AuthStateModel) {
    return state.user.jwtToken;
  }

  @Selector() static getApiError(state: AuthStateModel) {
    return state.apiError;
  }

  @Selector() static getFoundUsers(state: AuthStateModel) {
    return state.foundUsers;
  }

  @Selector() static getFriendList(state: AuthStateModel) {
    return state.friends;
  }

  @Action(RegisteruserAction)
  register(context: StateContext<AuthStateModel>, action: RegisteruserAction) {
    this.http
      .post(`${API_URL}/auth/register`, action.userData)
      .pipe(
        tap(res => {
          context.patchState({ apiError: null });
          this.ngZone.run(() => this.router.navigate(["auth", "login"]));
        }),
        catchError(err => {
          if (err.error.message) {
            context.patchState({ apiError: err.error.message });
          } else {
            context.patchState({ apiError: err.statusText });
          }
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(LoginUserAction)
  login(context: StateContext<AuthStateModel>, action: LoginUserAction) {
    this.http
      .post<any>(`${API_URL}/auth/login`, action.loginUserData)
      .pipe(
        tap(res => {
          const user = res.user;
          const jwt = jwt_decode(res.jwt);
          user.iat = jwt.iat;
          user.exp = jwt.exp;
          user.jwtToken = res.jwt;
          context.patchState({ apiError: null });
          this.store.dispatch(new GetSavedUserAction(user));
          this.store.dispatch(new GetFriendsAction());
          this.ngZone.run(() => this.router.navigate([""]));
        }),
        catchError(err => {
          if (err.error.message) {
            context.patchState({ apiError: err.error.message });
          } else {
            context.patchState({ apiError: err.statusText });
          }
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(GetSavedUserAction)
  setUserData(
    context: StateContext<AuthStateModel>,
    action: GetSavedUserAction
  ) {
    context.patchState({ user: action.userData });
  }

  @Action(LogoutUserAction)
  LogoutUserAction(
    context: StateContext<AuthStateModel>,
    action: LogoutUserAction
  ) {
    const state = context.getState();
    this.http
      .post(`${API_URL}/auth/logout`, { username: action.username })
      .pipe(
        tap(() => {
          // window.location.reload();
          this.ngZone.run(() => this.router.navigate(["auth", "login"]));
        }),
        catchError(err => {
          // window.location.reload();
          this.ngZone.run(() => this.router.navigate(["auth", "login"]));
          return of(err);
        })
      )
      .subscribe();
  }

  @Action(UpdateUserAction)
  updateUser(context: StateContext<AuthStateModel>, action: UpdateUserAction) {
    this.http
      .put<any>(`${API_URL}/user/update`, action.user)
      .pipe(
        tap(res => {
          const state = context.getState();
          const user = { ...state.user };

          for (const key in res.user) {
            user[key] = res.user[key];
          }
          this.store.dispatch(new GetSavedUserAction(user));
          // context.setState({ ...state, user });
          // context.patchState({ user });
        }),
        catchError(err => of(err))
      )
      .subscribe();
  }

  @Action(UploadImageAction)
  uploadImage(
    context: StateContext<AuthStateModel>,
    action: UploadImageAction
  ) {
    const formData = new FormData();
    const state = context.getState();
    formData.append("image", action.image);
    this.http
      .post<any>(`${API_URL}/user/avatar`, formData)
      .pipe(
        tap(res => {
          const user = res.user;
          const jwt = jwt_decode(res.jwt);
          user.iat = jwt.iat;
          user.exp = jwt.exp;
          user.jwtToken = res.jwt;
          const updatedUser = { ...state.user };
          for (const key in user) {
            updatedUser[key] = user[key];
          }
          this.store.dispatch(new GetSavedUserAction(user));
        })
      )
      .subscribe();
  }

  @Action(SearchUsersAction)
  searchUsers(
    context: StateContext<AuthStateModel>,
    action: SearchUsersAction
  ) {
    this.http
      .get<any>(`${API_URL}/user/search/${action.username}`)
      .pipe(
        tap(res => {
          const state = context.getState();
          const friends = [...state.friends];
          res.map(user => {
            for (let i = 0; i < friends.length; i++) {
              if (friends[i].username === user.username) {
                user.isFriend = true;
              }
            }
          });
          context.patchState({ foundUsers: res });
        })
      )
      .subscribe();
  }

  @Action(AddFriendAction)
  addFriend(context: StateContext<AuthStateModel>, action: AddFriendAction) {
    this.http
      .post<any>(`${API_URL}/user/add-friend`, action.friend)
      .pipe(tap(() => this.store.dispatch(new GetFriendsAction())))
      .subscribe();
  }

  @Action(GetFriendsAction)
  getFriends(context: StateContext<AuthStateModel>) {
    this.http
      .get<any>(`${API_URL}/user/friends`)
      .pipe(
        tap(friends => {
          context.patchState({ friends });
          const state = context.getState();
          if (state.foundUsers && state.foundUsers.length > 0) {
            const foundNew = [];
            state.foundUsers.map(user => {
              const u = { ...user };
              for (let i = 0; i < friends.length; i++) {
                if (friends[i].username === user.username) {
                  u.isFriend = true;
                }
              }
              foundNew.push(u);
            });
            context.patchState({ friends, foundUsers: foundNew });
          } else {
            context.patchState({ friends });
          }
        })
      )
      .subscribe();
  }

  @Action(RemoveFriendAction)
  removeFriend(
    context: StateContext<AuthStateModel>,
    action: RemoveFriendAction
  ) {
    this.http
      .delete(`${API_URL}/user/friends/${action.friend.username}`)
      .pipe(tap(() => this.store.dispatch(new GetFriendsAction())))
      .subscribe();
  }
}
