import { inject, Injectable } from '@angular/core';
import { Card, CardQualityEnum } from '@shared';
import { v4 as uuidv4 } from 'uuid';
import { CardApi } from '../../models/card-api.model';
import { CollectionAddCardBasketStatesService } from './collection-add-card-basket-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardBasketService {
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);

    updateCardBasket(updatedCard: Card): void {
        return this._cardBasketStateService.setCardBasket(
            this._cardBasketStateService
                .getCardBasketValue()
                .map((card) => (card.uniqueId === updatedCard.uniqueId ? updatedCard : card))
        );
    }

    fromSearchResultToCardBasket(cardApi: CardApi): Card {
        return { ...cardApi, uniqueId: uuidv4(), quality: CardQualityEnum.excellent };
    }

    addCardsToCardBasket(cards: Card[]): void {
        this._cardBasketStateService.setCardBasket([
            ...this._cardBasketStateService.getCardBasketValue(),
            ...cards,
        ]);
    }

    removeCardFromCardBasket(uniqueId: string): void {
        this._cardBasketStateService.setCardBasket(
            this._cardBasketStateService
                .getCardBasketValue()
                .filter((card) => card.uniqueId !== uniqueId)
        );
    }

    isCardBasketSavable(): boolean {
        return (
            this._cardBasketStateService.getCardBasketValue().length > 0 &&
            this._cardBasketStateService
                .getCardBasketValue()
                .every((card) => card.quality !== undefined)
        );
    }

    isCardBasketEmpty(): boolean {
        return this._cardBasketStateService.getCardBasketValue().length === 0;
    }

    emptyCardBasket(): void {
        this._cardBasketStateService.setCardBasket([]);
    }
}
