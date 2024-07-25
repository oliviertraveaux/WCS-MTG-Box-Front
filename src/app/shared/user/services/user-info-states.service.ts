import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.interface';

@Injectable({
    providedIn: 'root',
})
export class UserInfoStatesService {
    private _userInfo$ = new BehaviorSubject<UserInfo>({} as UserInfo);
    private _users$ = new BehaviorSubject<UserInfo[]>([]);

    getUserInfo$(): Observable<UserInfo> {
        return this._userInfo$;
    }

    getUserInfo(): UserInfo {
        return this._userInfo$.getValue();
    }

    setUserInfo(value: UserInfo) {
        this._userInfo$.next(value);
    }

    getUsers$(): Observable<UserInfo[]> {
        return this._users$;
    }

    getUsers(): UserInfo[] {
        return this._users$.getValue();
    }

    setUsers(value: UserInfo[]) {
        this._users$.next(value);
    }

    reset() {
        this.setUserInfo({} as UserInfo);
        this.setUsers([]);
    }
}
