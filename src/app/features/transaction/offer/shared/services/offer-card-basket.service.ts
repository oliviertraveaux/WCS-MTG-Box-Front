import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { Offer } from '../../../../../shared/offer/models/offer.model';
import { OfferRepositoryService } from '../../../../../shared/offer/repository/offer.repository.service';
import { OfferCreation } from '../models/offer-creation-data.model';

@Injectable({
    providedIn: 'root',
})
export class OfferCardBasketService {
    private _offerRepositoryService = inject(OfferRepositoryService);

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
}
