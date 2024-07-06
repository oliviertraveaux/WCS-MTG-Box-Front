import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferCreation } from '../../../features/transaction/offer/shared/models/offer-creation-data.model';
import { UserCard } from '../../collection/models/user-card.model';
import { OfferFullWantedCard } from '../models/offer-full-wanted-card.model';
import { Offer } from '../models/offer.model';
import { OfferRepositoryService } from '../repository/offer.repository.service';
import { OfferStatesService } from './offer.states.service';

@Injectable({
    providedIn: 'root',
})
export class OfferService {
    private _offerRepositoryService = inject(OfferRepositoryService);
    private _offerStatesService = inject(OfferStatesService);

    getOffersMade(id: number): void {
        this._offerRepositoryService
            .getOffersMade(id)
            .subscribe((offersMade: OfferFullWantedCard[]) => {
                this._offerStatesService.setOffersMade(offersMade);
                this._offerStatesService.setIsOffersMadeLoaded(true);
            });
    }

    getOffersReceived(id: number): void {
        this._offerRepositoryService
            .getOffersReceived(id)
            .subscribe((offersReceived: OfferFullWantedCard[]) => {
                this._offerStatesService.setOffersReceived(offersReceived);
                this._offerStatesService.setIsOffersReceivedLoaded(true);
            });
    }

    init(id: number) {
        this.getOffersMade(id);
        this.getOffersReceived(id);
    }

    reset(): void {
        this._offerStatesService.setOffersMade([]);
        this._offerStatesService.setOffersReceived([]);
        this._offerStatesService.setIsOffersMadeLoaded(false);
        this._offerStatesService.setIsOffersReceivedLoaded(false);
    }

    createOffer(
        userId: number,
        wantedUserCardId: number,
        userCards: UserCard[]
    ): Observable<Offer> {
        const offerCreation: OfferCreation = {
            userId: userId,
            userCardIds: userCards.map((card) => card.userInfo.userCardId) as number[],
            wantedUserCardId: wantedUserCardId,
        };
        return this._offerRepositoryService.createOffer(offerCreation);
    }

    acceptOffer(offerId: number): Observable<Offer> {
        return this._offerRepositoryService.acceptOffer(offerId);
    }

    validateOffer(offerId: number): Observable<Offer> {
        return this._offerRepositoryService.validateOffer(offerId);
    }

    deleteOffer(offerId: number): Observable<void> {
        return this._offerRepositoryService.deleteOffer(offerId);
    }
}
