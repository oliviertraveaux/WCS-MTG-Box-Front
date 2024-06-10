import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfosRepository } from '../repositories/user-infos.repository';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  private userInfoRepository = new UserInfosRepository();
  constructor(private http: HttpClient) {}

  updateUsername(userId: number, newUsername: string): Observable<void> {
    return this.userInfoRepository.updateUsername(userId, newUsername);
  }

  updatePassword(userId: number, newPassword: string): Observable<void> {
    return this.userInfoRepository.updatePassword(userId, newPassword);
  }


  updateUser(userId: number, updateUserRequest: any): Observable<void> {
    return this.userInfoRepository.updateUser(userId, updateUserRequest);
  }

  verifyPassword(userId: number, password: string): Observable<boolean> {
    return this.userInfoRepository.verifyPassword(userId, password);
  }
}
