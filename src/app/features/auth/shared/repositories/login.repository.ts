import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ENVIRONMENT } from '../../../../../env';

@Injectable({
    providedIn: 'root',
})
export class LoginRepository {
    private loginUrl = `${ENVIRONMENT.apiLoginConfigurationURL}`;
    private logoutUrl = `${ENVIRONMENT.apiLogoutConfigurationURL}`;
    private passwordForgottenUrl = `${ENVIRONMENT.apiPasswordForgottenConfigurationURL}`;
    private newPasswordUrl = `${ENVIRONMENT.apiNewPasswordConfigurationURL}`;

    constructor(private http: HttpClient) {}

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
