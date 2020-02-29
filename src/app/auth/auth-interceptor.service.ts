import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      // get most recent user token
      take(1),
      // get just the user object from the state
      map(authState => {
        return authState.user;
      }),
      // overwrite outgoing header request with a cloned one that also has "auth" params set
      exhaustMap(user => {
        if (!user) {
          return next.handle(req); // user is null/undefined, e.g. haven't logged in yet
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
