import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, pipe, tap, throwError} from "rxjs";
import { Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ENVIRONMENT} from "../../../../../env";



@Injectable({
  providedIn: 'root'
})
export class LoginRepository {
  private loginUrl = `${ENVIRONMENT.apiLoginConfigurationURL}`;
  private logoutUrl = `${ENVIRONMENT.apiLogoutConfigurationURL}`;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  login(credentials: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(this.loginUrl, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true,
      observe: 'response', params: undefined
    }).pipe(
      map(response => {
        if (response.status === 200) {
          localStorage.setItem('loggedIn', 'true');
          return true;
        }
        return false;
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      })
    );
  }





}
