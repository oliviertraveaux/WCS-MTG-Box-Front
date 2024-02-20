import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginRepository} from "../repositories/login.repository";


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(  private authRepository : LoginRepository) {
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
