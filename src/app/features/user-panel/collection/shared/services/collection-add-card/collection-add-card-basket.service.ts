import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CardQuality } from '../../../../../../shared/collection/enums/cardQuality';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { SearchFormAddCardCollectionService } from '../../../../../../shared/services/search-form/search-form-add-card-collection.service';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { ApiCard } from '../../../models/card-api.model';
import { CollectionAddCardRepository } from '../../repositories/collection-add-card.repository';
import { CollectionAddCardBasketStatesService } from './collection-add-card-basket-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardBasketService {
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _searchFormService = inject(SearchFormAddCardCollectionService);
    private _collectionAddCardRepository = inject(CollectionAddCardRepository);
    private _userInfosId = inject(UserInfoStatesService).getUserInfo().id;

    updateCardBasket(updatedCard: UserCard): void {
        return this._cardBasketStateService.setCardBasket(
            this._cardBasketStateService
                .getCardBasketValue()
                .map((card) =>
                    card.cardInfo.uniqueId === updatedCard.cardInfo.uniqueId ? updatedCard : card
                )
        );
    }

    fromSearchResultToCardBasket(apiCard: ApiCard): UserCard {
        return {
            cardInfo: {
                uniqueId: uuidv4(),
                apiCardId: apiCard.cardIdApi,
                name: apiCard.name,
                frenchName:
                    apiCard.foreignNames?.find((foreignName) => foreignName.language === 'French')
                        ?.name || '',
                imageUrl: apiCard.imageUrl,
                frenchImageUrl:
                    apiCard.foreignNames?.find((foreignName) => foreignName.language === 'French')
                        ?.imageUrl || '',
                manaCost: apiCard.manaCost,
                rarity: apiCard.rarity,
                setAbbreviation: apiCard.set,
                setName: apiCard.setName,
                text: apiCard.text,
                artist: apiCard.artist,
            },
            userInfo: {
                userId: this._userInfosId,
                qualityName: CardQuality.excellent,
                qualityId: 3,
                languageName: this._searchFormService.languageControl.name || 'English',
                languageId: this._searchFormService.languageControl.id || 1,
            },
        };
    }

    fromCardBasketToCollection(): UserCard[] {
        return this._cardBasketStateService.getCardBasketValue().map((card) => {
            const {
                cardInfo: { uniqueId, ...restCardInfo },
                userInfo: { qualityId, languageId, ...restUserInfo },
            } = card;
            return {
                cardInfo: restCardInfo,
                userInfo: restUserInfo,
            };
        });
    }

    addCardsToCardBasket(cards: UserCard[]): void {
        this._cardBasketStateService.setCardBasket([
            ...this._cardBasketStateService.getCardBasketValue(),
            ...cards,
        ]);
    }

    removeCardFromCardBasket(uniqueId: string | number): void {
        this._cardBasketStateService.setCardBasket(
            this._cardBasketStateService
                .getCardBasketValue()
                .filter((card) => card.cardInfo.uniqueId !== uniqueId)
        );
    }

    isCardBasketSavable(): boolean {
        return (
            this._cardBasketStateService.getCardBasketValue().length > 0 &&
            this._cardBasketStateService
                .getCardBasketValue()
                .every((card) => card.userInfo.qualityName !== undefined)
        );
    }

    isCardBasketEmpty(): boolean {
        return this._cardBasketStateService.getCardBasketValue().length === 0;
    }

    emptyCardBasket(): void {
        this._cardBasketStateService.setCardBasket([]);
    }

    saveCardCollection(userCards: UserCard[]): Observable<UserCard[]> {
        return this._collectionAddCardRepository.saveCards(userCards);
    }
}
