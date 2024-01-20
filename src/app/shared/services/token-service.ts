import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    public saveToken(): void {
        localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2VYIiwiaWF0IjoxNzA4MDM2NzA1LCJleHAiOjE4ODgwMzY3MDV9.4e8LQxpKzPQguZ00D8Jwc0Iy1v9hECd1fLfjiQ4rO3E'
        );
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }
}
