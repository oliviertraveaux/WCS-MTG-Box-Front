import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../backend-endpoints';
import { UserCard } from '../models/user-card.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionCardsRepository {
    private http = inject(HttpClient);
    apiCollectionCardsUrl: string = ENVIRONMENT.apiCollectionCardsConfigurationURL;

    public getCards(userId: number): Observable<UserCard[]> {
        const url = `${this.apiCollectionCardsUrl}/user/${userId}`;
        return this.http.get<UserCard[]>(url);
    }

    public deleteCard(userCardId: number | undefined): Observable<any> {
        const url = `${this.apiCollectionCardsUrl}/usercard/${userCardId}`;
        return this.http.delete(url);
    }

    public deleteCards(userCardsIds: number[]): Observable<void> {
        const url = `${this.apiCollectionCardsUrl}/usercards`;
        return this.http.delete<void>(url, { body: userCardsIds });
    }
}
