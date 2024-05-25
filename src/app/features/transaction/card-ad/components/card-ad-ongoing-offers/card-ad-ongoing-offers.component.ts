import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    Input,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { GetRarityClassPipe } from '../../../../../shared/collection/pipes/get-rarity-class.pipe';
import { GetRaritySymbolPipe } from '../../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import { Offer } from '../../../../../shared/offer/models/offer.model';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { HomeSearchResultComponent } from '../../../../home/components/home-search-result/home-search-result.component';

@Component({
    selector: 'app-card-ad-ongoing-offers',
    standalone: true,
    imports: [
        CommonModule,
        GetRarityClassPipe,
        GetRaritySymbolPipe,
        HomeSearchResultComponent,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TranslateModule,
    ],
    templateUrl: './card-ad-ongoing-offers.component.html',
    styleUrls: ['./card-ad-ongoing-offers.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdOngoingOffersComponent {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);
    private _liveAnnouncer = inject(LiveAnnouncer);

    readonly isDesktop = this._breakpointObserverService.isDesktop;
    @Input() cardAdOffers$: Observable<Offer[]> = of([]);

    displayedColumns: string[] = ['userName', 'city', 'quantity'];
    displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];

    expandedElement?: Offer | null;
    offersData: MatTableDataSource<Offer> = new MatTableDataSource<Offer>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.cardAdOffers$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => (this.offersData.data = cards));

        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }

    ngAfterViewInit() {
        this.offersData.paginator = this.paginator;
        this.offersData.sort = this.sort;

        this.offersData.sortingDataAccessor = (item, property) => {
            // Split '.' to allow accessing property of nested object
            if (property.includes('.')) {
                const accessor = property.split('.');
                let value: any = item;
                accessor.forEach((a) => {
                    value = value[a];
                });
                return value;
            }
            if (property == 'quantity') {
                return item.userCards.length;
            }
            // Access as normal (non nested object)
            // @ts-ignore
            return item[property as keyof typeof item];
        };
    }

    onClick(row: Offer): void {
        this.expandedElement = this.expandedElement === row ? null : row;
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
