import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../backend-endpoints';

@Injectable({
    providedIn: 'root',
})
export class LoginRepository {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    private loginUrl = `${ENVIRONMENT.apiLoginConfigurationURL}`;
    private logoutUrl = `${ENVIRONMENT.apiLogoutConfigurationURL}`;
    private passwordForgottenUrl = `${ENVIRONMENT.apiPasswordForgottenConfigurationURL}`;
    private newPasswordUrl = `${ENVIRONMENT.apiNewPasswordConfigurationURL}`;

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

    logout(): Observable<any> {
        return this.http.post(this.logoutUrl, { withCredentials: true });
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.http.post(`${this.passwordForgottenUrl}/${email}`, {});
    }

    resetPassword(
        token: string,
        newPasswordData: { plainPassword: string; plainPasswordVerification: string }
    ): Observable<any> {
        return this.http.post(`${this.newPasswordUrl}/${token}`, newPasswordData, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        });
    }
}
