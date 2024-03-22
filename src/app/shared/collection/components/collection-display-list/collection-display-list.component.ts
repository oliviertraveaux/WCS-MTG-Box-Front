import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { GetApiCardImgPipe } from '../../../../features/user-panel/collection/shared/pipes/get-api-card-img.pipe';
import { GetApiCardNamePipe } from '../../../../features/user-panel/collection/shared/pipes/get-api-card-name.pipe';
import { GetUserCardImgPipe } from '../../../../features/user-panel/collection/shared/pipes/get-user-card-img.pipe';
import { GetUserCardNamePipe } from '../../../../features/user-panel/collection/shared/pipes/get-user-card-name.pipe';
import { BreakpointObserverService } from '../../../services/breakpoint-observer.service';
import { UserCard } from '../../models/user-card.model';
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
})
export class CollectionDisplayListComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    readonly isDesktop = this._breakpointObserverService.isDesktop;

    @Input() cards$: Observable<UserCard[]> = of([]);
    @Output() cardToRemove = new EventEmitter<number>();

    displayedColumns: string[] = ['name', 'quality', 'set', 'rarity', 'expand'];
    displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
    expandedElement?: UserCard | null;

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
    }

    ngAfterViewInit() {
        this.cardsData.paginator = this.paginator;
        this.cardsData.sort = this.sort;
    }

    onClick(row: UserCard): void {
        this.expandedElement = this.expandedElement === row ? null : row;
        console.log('row: ', row);
        console.log('expanded elem: ', this.expandedElement);
    }

    onDelete(uniqueId: number): void {
        console.log('delete card: ', uniqueId);
        this.cardToRemove.emit(uniqueId);
    }
}
