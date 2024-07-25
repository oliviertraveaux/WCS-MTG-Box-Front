import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../backend-endpoints';
import { OfferCreation } from '../../../features/transaction/offer/shared/models/offer-creation-data.model';
import { OfferFullWantedCard } from '../models/offer-full-wanted-card.model';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferRepositoryService {
  private http = inject(HttpClient);

  private cardAdOffersURL: string = ENVIRONMENT.apiCardAdOffersURL;
  private apiOfferUrl: string = ENVIRONMENT.apiOffer;

  getCardAdOffers(id: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.cardAdOffersURL}/${id}`, { withCredentials: true });
  }

  createOffer(offerCreation: OfferCreation): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiOfferUrl}`, offerCreation, { withCredentials: true });
  }

  getOffersMade(id: number): Observable<OfferFullWantedCard[]> {
    return this.http.get<OfferFullWantedCard[]>(`${this.apiOfferUrl}/user/${id}`, { withCredentials: true });
  }

  getOffersReceived(id: number): Observable<OfferFullWantedCard[]> {
    return this.http.get<OfferFullWantedCard[]>(`${this.apiOfferUrl}/received/user/${id}`, { withCredentials: true });
  }

  getOffersHistory(id: number): Observable<OfferFullWantedCard[]> {
    return this.http.get<OfferFullWantedCard[]>(`${this.apiOfferUrl}/history/user/${id}`, { withCredentials: true });
  }

  acceptOffer(id: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiOfferUrl}/accept-offer/${id}`, {
      status: 'ACCEPTED',
    }, { withCredentials: true });
  }

  validateOffer(id: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiOfferUrl}/validate-offer/${id}`, {
      status: 'VALIDATED',
    }, { withCredentials: true });
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiOfferUrl}/${id}`, { withCredentials: true });
  }
}
