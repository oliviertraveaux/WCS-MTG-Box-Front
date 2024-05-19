import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../env';
import { OfferCreation } from '../../../features/transaction/offer/shared/models/offer-creation-data.model';
import { Offer } from '../models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferRepositoryService {
    private http = inject(HttpClient);

    private cardAdOffersURL: string = ENVIRONMENT.apiCardAdOffersURL;
    private apiOfferUrl: string = ENVIRONMENT.apiOffer;

    getCardAdOffers(id: number): Observable<Offer[]> {
        return this.http.get<Offer[]>(`${this.cardAdOffersURL}/${id}`);
    }

    createOffer(offerCreation: OfferCreation): Observable<Offer> {
        return this.http.post<Offer>(`${this.apiOfferUrl}`, offerCreation);
    }
}
