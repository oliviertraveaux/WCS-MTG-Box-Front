import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { FilterValues } from '../../../features/user-panel/collection/models/filter-values.model';
import { GetUserCardImgPipe } from '../../../features/user-panel/collection/shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../features/user-panel/collection/shared/pipes/get-user-card-name.pipe';
import { CardQuality } from '../../collection/enums/cardQuality';
import { UserCard } from '../../collection/models/user-card.model';
import { QualityFilter } from '../../filter/models/quality-filter.interface';
import { FiltersStateService } from '../../filter/services/filters-states.service';
import { BreakpointObserverService } from '../../services/breakpoint-observer.service';

@Component({
    selector: 'app-card-basket',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        ReactiveFormsModule,
        TranslateModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTooltipModule,
        GetUserCardImgPipe,
        GetUserCardNamePipe,
    ],
    templateUrl: './card-basket.component.html',
    styleUrls: ['./card-basket.component.scss'],
})
export class CardBasketComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input() cards$: Observable<UserCard[]> = of([]);
    @Input() isCardListSavable = false;
    @Input() isCardListEmpty = false;

    @Output() cardToRemove = new EventEmitter<string | number>();
    @Output() saveCards = new EventEmitter();
    @Output() emptyCardBasket = new EventEmitter();
    @Output() newQuality = new EventEmitter<UserCard>();

    private _liveAnnouncer = inject(LiveAnnouncer);
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _filtersStateService = inject(FiltersStateService);

    displayedColumns: string[] = [
        'show',
        'cardInfo.name',
        'cardInfo.setAbbreviation',
        'userInfo.qualityName',
        'action',
    ];
    cardsData = new MatTableDataSource<UserCard>([]);
    selectedCard: UserCard | null = null;
    cardQuality: QualityFilter[] = [];
    nameFilter = new FormControl('');
    filterValues: FilterValues = {
        name: '',
    };
    displaySelect = !!this._activatedRoute.snapshot.routeConfig?.path?.includes('collection/add');

    ngOnInit() {
        this.cards$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => (this.cardsData.data = cards));

        this.cardsData.paginator = this.paginator;
        this.cardsData.filterPredicate = this.createFilter();

        this.nameFilter.valueChanges.subscribe((name) => {
            this.filterValues.name = name;
            this.cardsData.filter = JSON.stringify(this.filterValues);
        });

        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

        this.cardQuality = this._filtersStateService.getQualitiesValue();

        this.cardsData.sortingDataAccessor = (item, property) => {
            // Split '.' to allow accessing property of nested object
            if (property.includes('.')) {
                const accessor = property.split('.');
                let value: any = item;
                accessor.forEach((a) => {
                    value = value[a];
                });
                return value;
            }
            // Access as normal (non nested object) not working with userCard
            // return item[property];
        };
    }

    ngAfterViewInit() {
        this.cardsData.sort = this.sort;
        this.cardsData.paginator = this.paginator;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    removeRow(userCard: UserCard): void {
        const id = userCard.userInfo.userCardId || userCard.cardInfo.uniqueId;
        this.cardToRemove.emit(id);
    }

    createFilter(): (data: any, filter: string) => boolean {
        return function (data: any, filter: any): boolean {
            let searchTerms = JSON.parse(filter);
            return (
                data.cardInfo.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 ||
                data.cardInfo.frenchName.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !==
                    -1
            );
        };
    }

    setQuality(card: UserCard, quality: string) {
        const updatedCard: UserCard = {
            ...card,
            userInfo: {
                ...card.userInfo,
                qualityName: quality as CardQuality,
            },
        };
        this.newQuality.emit(updatedCard);
    }

    save(): void {
        this.saveCards.emit();
    }

    empty(): void {
        this.emptyCardBasket.emit();
    }

    showImage(card: UserCard): void {
        this.selectedCard = card;
    }

    closeImage(): void {
        this.selectedCard = null;
    }
}
