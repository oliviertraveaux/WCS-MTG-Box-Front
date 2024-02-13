import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService : CookieService) {}

  canActivate(): boolean {
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
