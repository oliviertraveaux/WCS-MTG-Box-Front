import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/v1/login';


  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials, {responseType: 'text'}).pipe(
      tap(token => this.cookieService.set('authToken', token, { secure: true, sameSite: 'Strict' }))
  );
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('authToken');
  }

  logout() {
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }
}
