import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {ENVIRONMENT} from "../../../../env";
import {UserCard} from "../models/user-card.model";



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
}
