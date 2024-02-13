import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthRepository} from "../repositories/auth.repository";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(  private authRepository : AuthRepository) {
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.authRepository.login(credentials);
  }

  isAuthenticated(): boolean {
    return this.authRepository.isAuthenticated()
  }

  logout() {
    this.authRepository.logout()
  }
}
