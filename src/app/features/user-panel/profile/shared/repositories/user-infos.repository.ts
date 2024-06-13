import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ENVIRONMENT} from "../../../../../../env";

@Injectable({
  providedIn: 'root'
})
export class UserInfosRepository {

  private http = inject(HttpClient);
  private apiUrlUpdateUsername = ENVIRONMENT.apiUpdateUsernameURL;
  private apiUrlUpdatePassword = ENVIRONMENT.apiUpdatePasswordURL;
  private apiUrlUpdateUser = ENVIRONMENT.apiUpdateUserURL;
  private  apiUrlVerifyPassword = ENVIRONMENT.apiVerifyPasswordURL;
  private apiUrlDeleteUser= ENVIRONMENT.apiDeleteUserURL;


  updateUsername(userId: number, newUsername: string): Observable<void> {
    const url = `${this.apiUrlUpdateUsername}/${userId}`;
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.put<void>(url, newUsername, {headers});
  }

  updatePassword(userId: number, newPassword: string): Observable<void> {
    const url = `${this.apiUrlUpdatePassword}/${userId}`;
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.put<void>(url, newPassword, {headers});

  }

  updateUser(userId: number, updateUserRequest: any): Observable<void> {
    const url = `${this.apiUrlUpdateUser}/${userId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<void>(url, updateUserRequest, {headers});
  }
  verifyPassword(userId: number, password: string): Observable<boolean> {
    const url = `${this.apiUrlVerifyPassword}/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<boolean>(url, password, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrlDeleteUser}/${userId}`;
    return this.http.delete(url);
  }
}

