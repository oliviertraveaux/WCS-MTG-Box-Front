import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService, SnackbarStatus, UserCard } from '@shared';
import { Observable, of } from 'rxjs';
import { CardBasketComponent } from '../../../../../../shared/ui/card-basket/card-basket.component';
import { CollectionAddCardBasketStatesService } from '../../../shared/services/collection-add-card-basket-states.service';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card-basket.service';

@Component({
    selector: 'app-collection-add-card-basket-list',
    standalone: true,
    imports: [CommonModule, CardBasketComponent],
    templateUrl: './collection-add-card-basket.component.html',
    styleUrls: ['./collection-add-card-basket.component.scss'],
})
export class CollectionAddCardBasketComponent implements OnInit {
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _destroyRef = inject(DestroyRef);
    private _snackbarService = inject(SnackbarService);
    private _translate = inject(TranslateService);

    protected readonly Object = Object;

    cards$: Observable<UserCard[]> = of([]);

    ngOnInit() {
        this.cards$ = this._cardBasketStateService
            .getCardBasket$()
            .pipe(takeUntilDestroyed(this._destroyRef));
    }

    removeRow(uniqueId: string | number): void {
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
        const cards: UserCard[] = this._cardBasketService.fromCardBasketToCollection();
        this._cardBasketService
            .saveCardCollection(cards)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: (response) => {
                    this._snackbarService.openSnackBar(
                        response.length > 1
                            ? response.length +
                                  this._translate.instant(
                                      'Collection.addCard.toast.card-saved-success-plural'
                                  )
                            : this._translate.instant(
                                  'Collection.addCard.toast.card-saved-success-singular'
                              ),
                        SnackbarStatus.success
                    );
                },
                error: () => {
                    const logFailed = this._translate.instant(
                        'Collection.addCard.toast.card-saved-fail'
                    );
                    this._snackbarService.openSnackBar(logFailed, SnackbarStatus.error);
                },
            });
    }

    empty(): void {
        this._cardBasketService.emptyCardBasket();
    }
}
