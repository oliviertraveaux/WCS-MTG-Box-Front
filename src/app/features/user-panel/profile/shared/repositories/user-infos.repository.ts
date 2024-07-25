import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../../backend-endpoints';
import { UserInfo } from '../../../../../shared/user/models/user-info.interface';
import { AdministrateUserRequest } from '../model/administrate-user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class UserInfosRepository {
  private http = inject(HttpClient);
  private apiUrlUpdateUsername = ENVIRONMENT.apiUpdateUsernameURL;
  private apiUrlUpdatePassword = ENVIRONMENT.apiUpdatePasswordURL;
  private apiUrlUpdateUser = ENVIRONMENT.apiUpdateUserURL;
  private apiUrlVerifyPassword = ENVIRONMENT.apiVerifyPasswordURL;
  private apiUrlDeleteUser = ENVIRONMENT.apiDeleteUserURL;
  private apiUrlAdministrate = ENVIRONMENT.apiAdministrateUser;

  updateUsername(userId: number, newUsername: string): Observable<void> {
    const url = `${this.apiUrlUpdateUsername}/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.put<void>(url, newUsername, { headers, withCredentials: true });
  }

  updatePassword(userId: number, newPassword: string): Observable<void> {
    const url = `${this.apiUrlUpdatePassword}/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.put<void>(url, newPassword, { headers, withCredentials: true });
  }

  updateUser(userId: number, updateUserRequest: any): Observable<void> {
    const url = `${this.apiUrlUpdateUser}/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url, updateUserRequest, { headers, withCredentials: true });
  }

  verifyPassword(userId: number, password: string): Observable<boolean> {
    const url = `${this.apiUrlVerifyPassword}/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<boolean>(url, password, { headers, withCredentials: true });
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrlDeleteUser}/${userId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.apiUrlAdministrate, { withCredentials: true });
  }

  administrateUser(userId: number, requestBody: AdministrateUserRequest): Observable<UserInfo> {
    const url = `${this.apiUrlAdministrate}/${userId}`;
    return this.http.put<UserInfo>(url, requestBody, { withCredentials: true });
  }
}
