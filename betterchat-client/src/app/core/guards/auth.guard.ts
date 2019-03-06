import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState } from '../state/app.state';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _store: Store, private _router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this._store.selectSnapshot<IUser>((state: AppState) => {
      return state.auth.user;
    });
    let canActivate = false;
    if (user) {
      canActivate = true;
    } else {
      this._router.navigate(['auth', 'login']);
    }
    return canActivate;
  }
}
