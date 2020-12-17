import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

// Interceptor service which will add the user token to
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // first listens to user subject in auth service
    return this.authService.user.pipe(
      // grabs 1 value and unsubscribes
      take(1),
      // passes that user value of first subscription into 2nd subscription to add the user.token toi the params
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
