import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCard } from '@shared';
import { Observable, of } from 'rxjs';
import { CardBasketComponent } from '../../../../../../shared/ui/card-basket/card-basket.component';
import { CollectionAddCardBasketStatesService } from '../../../shared/services/collection-add-card-basket-states.service';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card-basket.service';

@Component({
    selector: 'app-collection-card-list',
    standalone: true,
    imports: [CommonModule, CardBasketComponent],
    templateUrl: './collection-add-card-basket.component.html',
    styleUrls: ['./collection-add-card-basket.component.scss'],
})
export class CollectionAddCardBasketComponent implements OnInit {
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _destroyRef = inject(DestroyRef);

    protected readonly Object = Object;

    cards$: Observable<UserCard[]> = of([]);

    ngOnInit() {
        this.cards$ = this._cardBasketStateService
            .getCardBasket$()
            .pipe(takeUntilDestroyed(this._destroyRef));
    }

    removeRow(uniqueId: string | number): void {
        console.log('card to remove: ', uniqueId);
        this._cardBasketService.removeCardFromCardBasket(uniqueId);
    }

    setQuality(updatedCard: UserCard) {
        this._cardBasketService.updateCardBasket(updatedCard);
    }

    isCardCollectionSavable(): boolean {
        return this._cardBasketService.isCardBasketSavable();
    }

    isCardCollectionEmpty(): boolean {
        return this._cardBasketService.isCardBasketEmpty();
    }

    save(): void {
        this._cardBasketService.fromCardBasketToCollection();
    }

    empty(): void {
        this._cardBasketService.emptyCardBasket();
    }
}
