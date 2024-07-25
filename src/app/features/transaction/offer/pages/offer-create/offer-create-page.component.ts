import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { CollectionDisplayImageComponent } from '../../../../../shared/collection/components/collection-display-image/collection-display-image.component';
import { CollectionDisplayListComponent } from '../../../../../shared/collection/components/collection-display-list/collection-display-list.component';
import { PaginationComponent } from '../../../../../shared/collection/components/pagination/pagination.component';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { SearchFormNameOnlyComponent } from '../../../../../shared/ui/search-form/search-form-name-only/search-form-name-only.component';
import { UserInfo } from '../../../../../shared/user/models/user-info.interface';
import { UserService } from '../../../../auth/shared/services/user.service';
import { CollectionAddCardSearchFormComponent } from '../../../../user-panel/collection/components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component';
import { CollectionDisplaySearchResultComponent } from '../../../../user-panel/collection/components/collection-display/collection-display-search-result/collection-display-search-result.component';
import { CollectionDisplaySearchResultsStatesService } from '../../../../user-panel/collection/shared/services/collection-display/collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from '../../../../user-panel/collection/shared/services/collection-display/collection-display-search-results.service';
import { CardAdInfo } from '../../../card-ad/models/card-ad-info';
import { CardAdService } from '../../../card-ad/shared/services/card-ad.service';
import { OfferCardBasketComponent } from '../../components/offer-card-basket/offer-card-basket.component';
import { OfferCollectionSearchFormComponent } from '../../components/offer-collection-search-form/offer-collection-search-form.component';
import { OfferCreateInfoBarComponent } from '../../components/offer-create-info-bar/offer-create-info-bar/offer-create-info-bar.component';

@Component({
    selector: 'app-offer-page',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        SearchFormNameOnlyComponent,
        CollectionDisplayImageComponent,
        CollectionDisplayListComponent,
        CollectionDisplaySearchResultComponent,
        PaginationComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSidenavModule,
        TranslateModule,
        CollectionAddCardSearchFormComponent,
        MatDividerModule,
        MatCheckboxModule,
        OfferCollectionSearchFormComponent,
        OfferCardBasketComponent,
        MatCardModule,
        OfferCreateInfoBarComponent,
    ],
    templateUrl: './offer-create-page.component.html',
    styleUrls: ['./offer-create-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCreatePageComponent implements OnInit, OnDestroy {
    private readonly _collectionDisplayService = inject(CollectionDisplaySearchResultsService);
    private readonly _collectionDisplayStatesService = inject(
        CollectionDisplaySearchResultsStatesService
    );
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _breakpointObserverService = inject(BreakpointObserverService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _cardAdService = inject(CardAdService);
    private readonly _userService = inject(UserService);

    readonly isTablet = this._breakpointObserverService.isTablet;
    readonly isDesktop = this._breakpointObserverService.isDesktop;

    cardAd$!: Observable<CardAdInfo>;
    cardOwner$!: Observable<UserInfo>;
    cards$!: Observable<UserCard[]>;
    selection!: SelectionModel<UserCard>;
    isIndeterminate$: Observable<boolean> = of(false);
    isAllSelected$: Observable<boolean> = of(false);
    listDisplay = false;
    displayedImageCards$: Observable<UserCard[]> = of([]);
    pageSize: number = 10;
    pageIndex: number = 0;
    id!: number;
    isInfoBarVisible$!: Observable<boolean>;

    searchForm: FormGroup = new FormGroup({
        name: new FormControl(''),
    });
    ngOnInit() {
        this.id = parseInt(this._route.snapshot.paramMap.get('id')!);
        this._collectionDisplayService.init();
        this.cards$ = this._collectionDisplayStatesService.getCards$();
        this.isAllSelected$ = this._collectionDisplayStatesService.getIsAllSelected$();
        this.isIndeterminate$ = this._collectionDisplayStatesService.getIsIndeterminate$();

        this._collectionDisplayStatesService
            .getSelectedCards()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((selected) => {
                this.selection = new SelectionModel<UserCard>(true, selected);
            });

        this.displayedImageCards$ = this.cards$.pipe(
            tap((cards) =>
                this.displayImageHandlePage({
                    startIndex: 0,
                    endIndex: cards.length > this.pageSize ? this.pageSize : cards.length,
                })
            )
        );

        this.cardAd$ = this._cardAdService.getCardAd(this.id);
        this.cardOwner$ = this.cardAd$.pipe(
            switchMap((cardAd: CardAdInfo) => this._userService.getUserInfo(cardAd.userCard.userId))
        );

        this.isInfoBarVisible$ = combineLatest([this.cardAd$, this.cardOwner$]).pipe(
            map(([cardAd, cardOwner]) => !!cardAd && !!cardOwner)
        );
    }

    handleSelection(userCards: UserCard[]) {
        this._collectionDisplayStatesService.setSelectedCards(userCards);
        this._changeDetectorRef.detectChanges();
    }

    masterToggle() {
        this.isAllSelected$
            .pipe(
                take(1),
                tap((isAllSelected) => {
                    this.selection.clear();
                    if (!isAllSelected) {
                        this.cards$
                            .pipe(take(1))
                            .subscribe((cards) => this.selection.select(...cards));
                    }
                }),
                tap(() => this.handleSelection(this.selection.selected))
            )
            .subscribe();
    }

    displayImageHandlePage(event: { startIndex: number; endIndex: number }) {
        this.displayedImageCards$ = this.cards$.pipe(
            map((cards) => {
                return cards.slice(event.startIndex, event.endIndex);
            })
        );
    }

    switchView() {
        this.listDisplay = !this.listDisplay;
        this._changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this._collectionDisplayStatesService.setSelectedCards([]);
    }
}
