import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../backend-endpoints';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';

@Injectable({
    providedIn: 'root',
})
export class UserRepository {
    private http = inject(HttpClient);
    private userUrl = `${ENVIRONMENT.apiUser}`;
    getUserInfo(id: number): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${this.userUrl}/${id}`);
    }
}
