import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/v1/login';


  constructor(private http: HttpClient,private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials, { responseType: 'text' });
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }


  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


}
