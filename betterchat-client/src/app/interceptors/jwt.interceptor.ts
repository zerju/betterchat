import { LogoutUserAction } from "./../core/actions/auth.action";
import { environment } from "./../../environments/environment";
import { AppState } from "./../core/state/app.state";
import { AuthState, AuthStateModel } from "./../core/state/auth.state";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

const API_URL = environment.apiUrl;
const PATHS_WITHOUT_TOKEN = [
  `${API_URL}/auth/login`,
  `${API_URL}/auth/register`,
  `${API_URL}/auth/user-exists`
];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (PATHS_WITHOUT_TOKEN.includes(req.url.split("?")[0])) {
      return next.handle(req);
    }
    const token = this._store.selectSnapshot<string>((state: AppState) => {
      if (state.auth && state.auth.user) {
        return state.auth.user.jwtToken;
      }
    });
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._store.dispatch(new LogoutUserAction(""));
            }
          }
        }
      )
    );
  }
}
