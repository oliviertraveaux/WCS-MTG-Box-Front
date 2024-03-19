import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';
import { VerifyTokenRepository } from '../repositories/verify-token.repository';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root',
})
export class ReconnectUserService {
    private _verifyTokenRepository = inject(VerifyTokenRepository);
    private _userInfoStateService = inject(UserInfoStatesService);
    private _loginService = inject(LoginService);

    getUserInfo() {
        this._verifyTokenRepository
            .verifyToken()
            .pipe(take(1))
            .subscribe({
                next: (userInfo) => {
                    this._userInfoStateService.setUserInfo(userInfo);
                },
                error: (error) => {
                    this._loginService.logout();
                },
            });
    }
}
