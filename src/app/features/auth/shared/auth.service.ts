import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/v1/login'; // Update with your backend URL


  constructor(private http: HttpClient,private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials, { responseType: 'text' });
  }


  isAuthenticated(): boolean {
    // Vérifiez si un token JWT est présent dans le stockage local
    return !!localStorage.getItem('authToken');
  }


  logout() {
    localStorage.removeItem('authToken');
    // Redirect to login or home page
    this.router.navigate(['/login']);
  }


}
