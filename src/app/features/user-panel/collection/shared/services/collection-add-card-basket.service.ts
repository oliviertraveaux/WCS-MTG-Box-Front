import { inject, Injectable } from '@angular/core';
import { CardQuality, UserCard } from '@shared';
import { v4 as uuidv4 } from 'uuid';
import userCardsMock from '../../../../../shared/collection/mocks/user-cards.mock';
import { ApiCard } from '../../models/card-api.model';
import { CollectionAddCardBasketStatesService } from './collection-add-card-basket-states.service';
import { CollectionAddCardSearchFormService } from './collection-add-card-search-form.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardBasketService {
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _searchFormService = inject(CollectionAddCardSearchFormService);

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
        const card = {
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
                userId: 1,
                qualityName: CardQuality.excellent,
                qualityId: 3,
                languageName: this._searchFormService.languageControl.name || 'English',
                languageId: this._searchFormService.languageControl.id || 1,
            },
        };
        console.log('card', card);
        return card;
    }

    fromCardBasketToCollection(): UserCard[] {
        const result = this._cardBasketStateService.getCardBasketValue().map((card) => {
            const {
                cardInfo: { uniqueId, ...restCardInfo },
                userInfo: { qualityName, languageName, ...restUserInfo },
            } = card;
            return {
                cardInfo: restCardInfo,
                userInfo: restUserInfo,
            };
        });
        // todo: send proper objetc when data ready
        console.log(result);
        console.log(userCardsMock);
        return userCardsMock;
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
}
