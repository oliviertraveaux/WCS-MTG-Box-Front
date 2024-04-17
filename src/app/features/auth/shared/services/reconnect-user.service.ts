import { inject, Injectable } from '@angular/core';
import { catchError, map, of, take, tap } from 'rxjs';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
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
        return this._verifyTokenRepository.verifyToken().pipe(
            take(1),
            catchError((err) => of(true)),
            tap((userInfo) =>
                userInfo ? this._userInfoStateService.setUserInfo(userInfo as UserInfo) : null
            ),
            map((userInfo) => !!userInfo)
        );
    }

    getUserInfoAfterLogin() {
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
