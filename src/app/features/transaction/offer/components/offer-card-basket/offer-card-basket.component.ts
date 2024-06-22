import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { OfferService } from '../../../../../shared/offer/services/offer.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { CardBasketComponent } from '../../../../../shared/ui/card-basket/card-basket.component';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { CollectionDisplaySearchResultsStatesService } from '../../../../user-panel/collection/shared/services/collection-display/collection-display-search-results-states.service';

@Component({
    selector: 'app-offer-card-basket',
    standalone: true,
    imports: [CommonModule, CardBasketComponent],
    templateUrl: './offer-card-basket.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardBasketComponent implements OnInit {
    public _collectionDisplayStatesService = inject(CollectionDisplaySearchResultsStatesService);
    private _userId = inject(UserInfoStatesService).getUserInfo().id;
    private _offerService = inject(OfferService);
    private _destroyRef = inject(DestroyRef);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);
    private _route = inject(ActivatedRoute);

    cards$: Observable<UserCard[]> = of([]);

    ngOnInit(): void {
        this.cards$ = this._collectionDisplayStatesService
            .getSelectedCards()
            .pipe(takeUntilDestroyed(this._destroyRef));
    }

    removeRow(userCardId: string | number): void {
        const newSelectedCards: UserCard[] = this._collectionDisplayStatesService
            .getSelectedCardsValue()
            .filter((card) => card.userInfo.userCardId !== userCardId);
        this._collectionDisplayStatesService.setSelectedCards(newSelectedCards);
    }

    isCardBasketEmpty(): boolean {
        return this._collectionDisplayStatesService.getSelectedCardsValue().length === 0;
    }

    createOffer(): void {
        this._offerService
            .createOffer(
                this._userId,
                parseInt(this._route.snapshot.paramMap.get('id')!),
                this._collectionDisplayStatesService.getSelectedCardsValue()
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._alertService.openSnackBar(
                        this._translate.instant('transaction.offer.toast.offer-created-success'),
                        SnackbarStatus.success
                    );
                    this.emptyCardBasket();
                },
                error: () => {
                    const logFailed = this._translate.instant(
                        'transaction.offer.toast.offer-created-fail'
                    );
                    this._alertService.openSnackBar(logFailed, SnackbarStatus.error);
                },
            });
    }

    emptyCardBasket(): void {
        this._collectionDisplayStatesService.setSelectedCards([]);
    }
}
