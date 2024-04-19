import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, Observable, of, take, tap } from 'rxjs';
import { CollectionDisplayImageComponent } from '../../../../../shared/collection/components/collection-display-image/collection-display-image.component';
import { CollectionDisplayListComponent } from '../../../../../shared/collection/components/collection-display-list/collection-display-list.component';
import { PaginationComponent } from '../../../../../shared/collection/components/pagination/pagination.component';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { AlertService } from '../../../../../shared/services/alert.service';
import { BreakpointObserverService } from '../../../../../shared/services/breakpoint-observer.service';
import { SearchFormService } from '../../../../../shared/services/search-form/search-form.service';
import { CollectionAddCardSearchFormComponent } from '../../components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component';
import { CollectionDisplaySearchFormComponent } from '../../components/collection-display/collection-display-search-form/collection-display-search-form.component';
import { CollectionDisplaySearchResultComponent } from '../../components/collection-display/collection-display-search-result/collection-display-search-result.component';
import { SearchQuery } from '../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from '../../shared/services/collection-display/collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from '../../shared/services/collection-display/collection-display-search-results.service';

@Component({
    selector: 'app-collection-display-page',
    standalone: true,
    imports: [
        CommonModule,
        CollectionDisplayImageComponent,
        CollectionDisplaySearchResultComponent,
        CollectionDisplayListComponent,
        CollectionAddCardSearchFormComponent,
        CollectionDisplaySearchFormComponent,
        MatButtonModule,
        TranslateModule,
        MatCheckboxModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink,
        PaginationComponent,
    ],
    templateUrl: './collection-display-page.component.html',
    styleUrls: ['./collection-display-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayPageComponent implements OnInit {
    private _collectionDisplayService = inject(CollectionDisplaySearchResultsService);
    private _collectionDisplayStatesService = inject(CollectionDisplaySearchResultsStatesService);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _destroyRef = inject(DestroyRef);
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _searchFormService = inject(SearchFormService);

    readonly isTablet = this._breakpointObserverService.isTablet;
    readonly isDesktop = this._breakpointObserverService.isDesktop;

    cards$!: Observable<UserCard[]>;
    selection!: SelectionModel<UserCard>;
    isAllSelected: Observable<boolean> = of(false);
    listDisplay = false;
    searchForm = this._searchFormService.searchForm;
    displayedImageCards$: Observable<UserCard[]> = of([]);
    pageSize: number = 10;
    pageIndex: number = 0;

    ngOnInit() {
        this._collectionDisplayService.init();
        this.cards$ = this._collectionDisplayStatesService.getCards$();
        this._collectionDisplayStatesService.getSelectedCards().subscribe((selected) => {
            this.selection = new SelectionModel<UserCard>(true, selected);
        });
        this._collectionDisplayStatesService.getIsAllSelected$().subscribe((isAllSelected) => {
            this.isAllSelected = of(isAllSelected);
        });
        this._searchFormService.updateValidityWhenFormValueChanges();

        this.displayedImageCards$ = this.cards$.pipe(
            tap((cards) =>
                this.displayImageHandlePage({
                    startIndex: 0,
                    endIndex: cards.length > this.pageSize ? this.pageSize : cards.length,
                })
            )
        );

        this.cards$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((cards) => {
            const selectedCards = cards.filter((card) =>
                this.selection.selected.some(
                    (selectedCard) => selectedCard.userInfo.userCardId === card.userInfo.userCardId
                )
            );
            this.selection = new SelectionModel<UserCard>(true, selectedCards);
        });
    }
    removeSelection(userCardId?: number) {
        this._alertService
            .openConfirmDialog(
                this._translate.instant('Modal.confirm-delete.title'),
                this._translate.instant('Modal.confirm-delete.message')
            )
            .subscribe((result) => {
                if (result) {
                    userCardId ? this.removeUnique(userCardId) : this.removeAll();
                    (error: any) => {
                        console.error('Error deleting card', error);
                    };
                }
            });
    }

    removeAll() {
        const userCardIdList: number[] = this.selection.selected
            .map((card) => card.userInfo.userCardId)
            .filter((userCardId) => userCardId !== undefined) as number[];
        this._collectionDisplayService.deleteCards(userCardIdList).subscribe();
        this.selection.clear();
        this._collectionDisplayStatesService.setSelectedCards([]);
        this._changeDetectorRef.detectChanges();
    }

    removeUnique(userCardId: number) {
        const card = this.selection.selected.find(
            (card) => card.userInfo.userCardId === userCardId
        );
        if (card) {
            this.selection.deselect(card);
            this._collectionDisplayStatesService.setSelectedCards(this.selection.selected);
        }
        this._collectionDisplayService.deleteCard(userCardId).subscribe();
        this._changeDetectorRef.detectChanges();
    }

    handleSelection(userCards: UserCard[]) {
        this._collectionDisplayStatesService.setSelectedCards(userCards);
        this._changeDetectorRef.detectChanges();
    }

    masterToggle() {
        this.isAllSelected
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

    isChecked() {
        let isChecked: boolean = false;
        this.isAllSelected.pipe(take(1)).subscribe((isAllSelected) => {
            isChecked = isAllSelected && this.selection.hasValue();
        });
        return isChecked;
    }

    isIndeterminate() {
        let isIndeterminate: boolean = false;
        this.isAllSelected.pipe(take(1)).subscribe((isAllSelected) => {
            isIndeterminate = !isAllSelected && this.selection.hasValue();
        });
        return isIndeterminate;
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._collectionDisplayService.searchCards(searchQuery);
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
}
