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
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GetQualityClassPipe } from '../../../../shared/collection/pipes/get-quality.pipe';
import { BreakpointObserverService } from '../../../../shared/services/breakpoint-observer.service';
import { GetUserCardNamePipe } from '../../../user-panel/collection/shared/pipes/get-user-card-name.pipe';
import { HomeCardSearchResult, UserCardOnMarket } from '../../models/home-search-results.model';

@Component({
    selector: 'app-home-search-result',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule,
        TranslateModule,
        NgOptimizedImage,
        GetUserCardNamePipe,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        GetQualityClassPipe,
        RouterLink,
    ],
    templateUrl: './home-search-result.component.html',
    styleUrls: ['./home-search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchResultComponent implements OnInit {
    @Input() resultCard!: HomeCardSearchResult;
    @Input() isFrenchSearch: boolean = false;

    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);
    private _liveAnnouncer = inject(LiveAnnouncer);

    readonly isDesktop = this._breakpointObserverService.isDesktop;

    displayedColumns: string[] = ['userName', 'quality', 'city', 'language', 'action'];
    resultData!: MatTableDataSource<UserCardOnMarket>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

        this.resultData = new MatTableDataSource<UserCardOnMarket>(
            this.resultCard.userCardsOnMarket
        );
    }

    ngAfterViewInit() {
        this.resultData.paginator = this.paginator;
        this.resultData.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    //TODO add Redirection to Announce
    navigateToAnnounce(userCardId: number) {
        console.log('navigate to announce: ', userCardId);
    }
}
