import { environment } from './../../environments/environment';
import { AppState } from './../core/state/app.state';
import { AuthState, AuthStateModel } from './../core/state/auth.state';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

const API_URL = environment.apiUrl;
const PATHS_WITHOUT_TOKEN = [`${API_URL}/auth/login`, `${API_URL}/auth/register`];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authState: AuthState, private _store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (PATHS_WITHOUT_TOKEN.includes(req.url)) {
      return next.handle(req);
    }
    const token = this._store.selectSnapshot<string>((state: AppState) => {
      return state.auth.user.jwtToken;
    });
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}
