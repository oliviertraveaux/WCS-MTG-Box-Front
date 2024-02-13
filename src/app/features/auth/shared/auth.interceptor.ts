import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 constructor(private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get('authToken');
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    return next.handle(authReq);
  }
}
