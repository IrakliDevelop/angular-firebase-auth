// this file may not be useful at all, so I faked returned observables, so the compiler doesn't give errors
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthService, private jwtInterceptor: JwtInterceptor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable <any> {
    if (this.jwtInterceptor.isWhitelistedDomain(req) && !this.jwtInterceptor.isBlacklistedRoute(req)) {
      return next.handle(req).pipe(
        catchError((err) => {
          const errorResponse = err as HttpErrorResponse;
          if (errorResponse.status === 401 && errorResponse.error.message === 'Expired JWT Token') {
            return of({message: 'just a trick'});
          }
          return throwError(err);
        }));
    } else {
      return next.handle(req);
    }
  }

}

