import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, pipe, tap} from "rxjs";
import { Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ENVIRONMENT} from "../../../../../env";
import {stringify} from "postcss";


@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  private loginUrl = `${ENVIRONMENT.apiLoginConfigurationURL}`;

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

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }


  checkToken(token: string): Observable<string> {
    const params = { token };
    return this.http.get<string>(this.loginUrl, { params });
  }
}





