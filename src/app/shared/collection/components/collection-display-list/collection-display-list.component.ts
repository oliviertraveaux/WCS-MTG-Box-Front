import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { GetApiCardImgPipe } from '../../../../features/user-panel/collection/shared/pipes/get-api-card-img.pipe';
import { GetApiCardNamePipe } from '../../../../features/user-panel/collection/shared/pipes/get-api-card-name.pipe';
import { GetUserCardImgPipe } from '../../../../features/user-panel/collection/shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../../features/user-panel/collection/shared/pipes/get-user-card-name.pipe';
import { AlertService } from '../../../services/alert.service';
import { BreakpointObserverService } from '../../../services/breakpoint-observer.service';
import { UserCard } from '../../models/user-card.model';
import { GetQualityClassPipe } from '../../pipes/get-quality.pipe';
import { GetRarityClassPipe } from '../../pipes/get-rarity-class.pipe';
import { GetRaritySymbolPipe } from '../../pipes/get-rarity-symbol.pipe';

@Component({
    selector: 'app-collection-display-list',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        GetUserCardImgPipe,
        GetUserCardNamePipe,
        MatButtonModule,
        GetApiCardImgPipe,
        GetApiCardNamePipe,
        TranslateModule,
        NgOptimizedImage,
        GetRarityClassPipe,
        GetRaritySymbolPipe,
        MatListModule,
        GetQualityClassPipe,
    ],
    templateUrl: './collection-display-list.component.html',
    styleUrls: ['./collection-display-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayListComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);
    private _liveAnnouncer = inject(LiveAnnouncer);

    readonly isDesktop = this._breakpointObserverService.isDesktop;

    @Input() cards$: Observable<UserCard[]> = of([]);
    @Output() cardToRemove = new EventEmitter<number>();

    displayedColumns: string[] = [
        'cardInfo.name',
        'userInfo.qualityName',
        'cardInfo.setName',
        'cardInfo.rarity',
        'expand',
    ];
    displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
    expandedElement?: UserCard | null;
    selectedCard: UserCard | null = null;

    cardsData: MatTableDataSource<UserCard> = new MatTableDataSource<UserCard>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.cards$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((cards) => (this.cardsData.data = cards));

        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

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
        this.cardsData.paginator = this.paginator;
        this.cardsData.sort = this.sort;
    }

    onClick(row: UserCard): void {
        this.expandedElement = this.expandedElement === row ? null : row;
    }

    onDelete(uniqueId: number): void {
        this._alertService
            .openConfirmDialog(
                this._translate.instant('Modal.confirm-delete.title'),
                this._translate.instant('Modal.confirm-delete.message')
            )
            .subscribe((result) => {
                if (result) {
                    this.cardToRemove.emit(uniqueId);
                }
            });
    }

    showImage(card: UserCard): void {
        this.selectedCard = card;
    }

    closeImage(): void {
        this.selectedCard = null;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
