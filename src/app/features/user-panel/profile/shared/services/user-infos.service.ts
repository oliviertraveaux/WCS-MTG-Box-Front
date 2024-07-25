import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { AdministrateUserRequest } from '../model/administrate-user-request.interface';
import { UserInfosRepository } from '../repositories/user-infos.repository';

@Injectable({
    providedIn: 'root',
})
export class UserInfosService {
    private readonly _userInfoStateService = inject(UserInfoStatesService);
    private readonly _userInfoRepository = inject(UserInfosRepository);

    updateUsername(userId: number, newUsername: string): Observable<void> {
        return this._userInfoRepository.updateUsername(userId, newUsername);
    }

    updatePassword(userId: number, newPassword: string): Observable<void> {
        return this._userInfoRepository.updatePassword(userId, newPassword);
    }

    updateUser(userId: number, updateUserRequest: any): Observable<void> {
        return this._userInfoRepository.updateUser(userId, updateUserRequest);
    }

    verifyPassword(userId: number, password: string): Observable<boolean> {
        return this._userInfoRepository.verifyPassword(userId, password);
    }

    deleteUser(userId: number): Observable<void> {
        return this._userInfoRepository.deleteUser(userId);
    }

    getAllUsers(): void {
        this._userInfoRepository.getAllUsers().subscribe((users) => {
            this._userInfoStateService.setUsers(users);
        });
    }

    administrateUser(userId: number, requestBody: AdministrateUserRequest): Observable<UserInfo> {
        return this._userInfoRepository.administrateUser(userId, requestBody);
    }
}
