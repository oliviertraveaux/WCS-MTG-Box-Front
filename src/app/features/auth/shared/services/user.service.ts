import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _userRepository = inject(UserRepository);
    getUserInfo(id: number): Observable<UserInfo> {
        return this._userRepository.getUserInfo(id);
    }
}
