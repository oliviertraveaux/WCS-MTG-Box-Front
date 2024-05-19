import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { CollectionCardsService } from '../../../../../../shared/collection/services/collection-cards.service';
import { SnackbarStatus } from '../../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { CardBasketComponent } from '../../../../../../shared/ui/card-basket/card-basket.component';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { CollectionAddCardBasketStatesService } from '../../../shared/services/collection-add-card/collection-add-card-basket-states.service';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card/collection-add-card-basket.service';

@Component({
    selector: 'app-collection-add-card-basket-list',
    standalone: true,
    imports: [CommonModule, CardBasketComponent],
    templateUrl: './collection-add-card-basket.component.html',
    styleUrls: ['./collection-add-card-basket.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionAddCardBasketComponent implements OnInit {
    private _collectionCardsService = inject(CollectionCardsService);
    private _userInfoStatesService = inject(UserInfoStatesService);
    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _destroyRef = inject(DestroyRef);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);

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
                    this._alertService.openSnackBar(
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
                    this._cardBasketService.emptyCardBasket();
                    this._collectionCardsService
                        .getCollectionCards(this._userInfoStatesService.getUserInfo().id)
                        .subscribe();
                },
                error: () => {
                    const logFailed = this._translate.instant(
                        'Collection.addCard.toast.card-saved-fail'
                    );
                    this._alertService.openSnackBar(logFailed, SnackbarStatus.error);
                },
            });
    }

    empty(): void {
        this._cardBasketService.emptyCardBasket();
    }
}
