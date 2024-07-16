import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { GetQualityClassPipe } from '../../../../shared/collection/pipes/get-quality.pipe';
import { GetRarityClassPipe } from '../../../../shared/collection/pipes/get-rarity-class.pipe';
import { GetRaritySymbolPipe } from '../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import { BreakpointObserverService } from '../../../../shared/services/breakpoint-observer.service';
import { GetUserCardImgPipe } from '../../../user-panel/collection/shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../user-panel/collection/shared/pipes/get-user-card-name.pipe';
import { HomeCardSearchResult, UserCardOnMarket } from '../../models/home-search-results.model';
import { HomeSearchResultComponent } from '../home-search-result/home-search-result.component';
import {HomeSearchResultsService} from "../../shared/services/home-search-results.service";

@Component({
    selector: 'app-home-search-results',
    standalone: true,
    imports: [
        CommonModule,
        GetQualityClassPipe,
        GetRarityClassPipe,
        GetRaritySymbolPipe,
        GetUserCardImgPipe,
        GetUserCardNamePipe,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatListModule,
        TranslateModule,
        MatTableModule,
        MatSortModule,
        NgOptimizedImage,
        MatPaginatorModule,
        HomeSearchResultComponent,
    ],
    templateUrl: './home-search-results.component.html',
    styleUrls: ['./home-search-results.component.scss'],
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
export class HomeSearchResultsComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);
    private _liveAnnouncer = inject(LiveAnnouncer);
    private _homeSearchResultsService = inject(HomeSearchResultsService);

    readonly isDesktop = this._breakpointObserverService.isDesktop;
    @Input() resultCards$: Observable<HomeCardSearchResult[]> = of([]);
    @Input() isFrenchSearch: boolean = false;

    displayedColumns: string[] = ['name', 'setName', 'rarity', 'quantity'];
    displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];


    expandedElement?: UserCardOnMarket | null;
    resultData: MatTableDataSource<HomeCardSearchResult> =
        new MatTableDataSource<HomeCardSearchResult>([]);
    lastTenResultsData: MatTableDataSource<HomeCardSearchResult> =
        new MatTableDataSource<HomeCardSearchResult>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.resultCards$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => (
              this.resultData.data = cards));


      this._homeSearchResultsService.getLastTenCards().subscribe((cards) => {
        this.lastTenResultsData.data = cards;
      });



        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }

    ngAfterViewInit() {
        this.resultData.paginator = this.paginator;
        this.resultData.sort = this.sort;
        this.lastTenResultsData = this.resultData;

        this.resultData.sortingDataAccessor = (item, property) => {
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
                return item.userCardsOnMarket.length;
            }

            if (property == 'name') {
                if (this.isFrenchSearch) {
                    return item.frenchName;
                } else return item.name;
            }
            // Access as normal (non nested object)
            // @ts-ignore
            return item[property as keyof typeof item];
        };
    }

    onClick(row: UserCardOnMarket): void {
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
