import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../../../env';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';

@Injectable({
    providedIn: 'root',
})
export class LoginRepository {
    private loginUrl = `${ENVIRONMENT.apiLoginConfigurationURL}`;
    private logoutUrl = `${ENVIRONMENT.apiLogoutConfigurationURL}`;
    private userInfoStatesService = inject(UserInfoStatesService);

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(credentials: { username: string; password: string }): Observable<boolean> {
        return this.http
            .post<any>(this.loginUrl, credentials, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                withCredentials: true,
                observe: 'response',
                params: undefined,
            })
            .pipe(
                map((response) => {
                    return response.status === 200;
                })
            );
    }

    isAuthenticated(): boolean {
        return !!this.userInfoStatesService.getUserInfo().id;
    }

    logout(): Observable<any> {
        return this.http.post(this.logoutUrl, { withCredentials: true }).pipe(
            tap(() => {
                this.userInfoStatesService.setUserInfo({} as UserInfo);
                this.router.navigate(['/login']);
            })
        );
    }
}
