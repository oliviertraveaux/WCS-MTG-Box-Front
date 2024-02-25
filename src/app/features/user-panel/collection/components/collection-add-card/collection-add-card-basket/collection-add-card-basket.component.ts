import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    BreakpointObserverService,
    CardQuality,
    QualityFilter,
    SnackbarService,
    SnackbarStatus,
    UserCard,
} from '@shared';
import { FilterValues } from '../../../models/filter-values.model';
import { GetUserCardImgPipe } from '../../../shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../shared/pipes/get-user-card-name.pipe';
import { CollectionAddCardBasketStatesService } from '../../../shared/services/collection-add-card-basket-states.service';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card-basket.service';

@Component({
    selector: 'app-collection-card-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        MatButtonModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatDialogModule,
        TranslateModule,
        GetUserCardImgPipe,
        GetUserCardNamePipe,
    ],
    templateUrl: './collection-add-card-basket.component.html',
    styleUrls: ['./collection-add-card-basket.component.scss'],
})
export class CollectionAddCardBasketComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _snackbarService = inject(SnackbarService);
    private _liveAnnouncer = inject(LiveAnnouncer);
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _translate = inject(TranslateService);

    protected readonly CardQuality = CardQuality;
    protected readonly Object = Object;

    displayedColumns: string[] = ['show', 'name', 'set', 'quality', 'action'];
    CardsData = new MatTableDataSource<UserCard>([]);
    selectedCard: UserCard | null = null;
    cardQuality: QualityFilter[] = [];
    nameFilter = new FormControl('');
    filterValues: FilterValues = {
        name: '',
    };

    ngOnInit() {
        this.CardsData.paginator = this.paginator;
        this.CardsData.filterPredicate = this.createFilter();
        this._cardBasketStateService
            .getCardBasket$()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => {
                this.CardsData.data = cards;
                this.CardsData.paginator = this.paginator;
            });

        this.nameFilter.valueChanges.subscribe((name) => {
            this.filterValues.name = name;
            this.CardsData.filter = JSON.stringify(this.filterValues);
        });

        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

        this._activatedRoute.data.subscribe((response: any) => {
            this.cardQuality = response.filters.qualities;
        });
    }

    ngAfterViewInit() {
        this.CardsData.sort = this.sort;
        this.CardsData.paginator = this.paginator;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    removeRow(uniqueId: string): void {
        this._cardBasketService.removeCardFromCardBasket(uniqueId);
    }

    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data: any, filter: any): boolean {
            let searchTerms = JSON.parse(filter);
            return (
                data.cardInfo.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 ||
                data.cardInfo.frenchName.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !==
                    -1
            );
        };
        return filterFunction;
    }

    setQuality(card: UserCard, quality: string) {
        const updatedCard: UserCard = {
            ...card,
            userInfo: {
                ...card.userInfo,
                qualityName: quality as CardQuality,
            },
        };
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

    showImage(card: UserCard): void {
        this.selectedCard = card;
    }

    closeImage(): void {
        this.selectedCard = null;
    }
}
