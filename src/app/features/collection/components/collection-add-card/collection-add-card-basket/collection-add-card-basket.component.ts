import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Breakpoints } from '@angular/cdk/layout';
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
import { BreakpointObserverService, Card, CardQualityEnum } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { FilterValues } from '../../../models/filter-values.model';
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
    ],
    templateUrl: './collection-add-card-basket.component.html',
    styleUrls: ['./collection-add-card-basket.component.scss'],
})
export class CollectionAddCardBasketComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    private _cardBasketStateService = inject(CollectionAddCardBasketStatesService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _liveAnnouncer = inject(LiveAnnouncer);
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    protected readonly Breakpoints = Breakpoints;
    protected readonly CardQuality = CardQualityEnum;
    protected readonly Object = Object;

    currentBreakpoint$: BehaviorSubject<string[]> =
        this._breakpointObserverService.currentBreakpoint;
    displayedColumns: string[] = ['show', 'name', 'set', 'quality', 'action'];
    dataSource = new MatTableDataSource<Card>();
    selectedCard: Card | null = null;

    nameFilter = new FormControl('');
    filterValues: FilterValues = {
        name: '',
    };

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
        this._cardBasketStateService
            .getCardBasket()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => {
                this.dataSource.data = cards;
            });

        this.nameFilter.valueChanges.subscribe((name) => {
            this.filterValues.name = name;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
            return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1;
        };
        return filterFunction;
    }

    setQuality(element: Card, quality: string) {
        const updatedCard: Card = {
            ...element,
            quality: quality as CardQualityEnum,
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
        this._cardBasketStateService.getCardBasket().subscribe((cards) => console.log(cards));
    }

    empty(): void {
        this._cardBasketService.emptyCardBasket();
    }

    showImage(card: Card): void {
        this.selectedCard = card;
    }

    closeImage(): void {
        this.selectedCard = null;
    }
}
