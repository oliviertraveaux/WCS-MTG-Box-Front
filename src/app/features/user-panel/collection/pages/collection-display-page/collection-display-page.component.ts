import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, of, tap } from 'rxjs';
import { CollectionDisplayImageComponent } from '../../../../../shared/collection/components/collection-display-image/collection-display-image.component';
import { CollectionDisplayListComponent } from '../../../../../shared/collection/components/collection-display-list/collection-display-list.component';
import { PaginationComponent } from '../../../../../shared/collection/components/pagination/pagination.component';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
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
        MatIconModule,
        MatSidenavModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        PaginationComponent,
    ],
    templateUrl: './collection-display-page.component.html',
    styleUrls: ['./collection-display-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayPageComponent implements OnInit {
    private _searchResultsService = inject(CollectionDisplaySearchResultsService);
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _searchFormService = inject(SearchFormService);
    cards$ = inject(CollectionDisplaySearchResultsStatesService).getCards$();
    displayedImageCards$: Observable<UserCard[]> = of([]);
    listDisplay = false;
    searchForm = this._searchFormService.searchForm;
    pageSize: number = 10;
    pageIndex: number = 0;
    readonly isTablet = this._breakpointObserverService.isTablet;
    readonly isDesktop = this._breakpointObserverService.isDesktop;

    ngOnInit() {
        this._searchResultsService.init();
        this._searchFormService.updateValidityWhenFormValueChanges();
        this.displayedImageCards$ = this.cards$.pipe(
            tap((cards) =>
                this.displayImageHandlePage({
                    startIndex: 0,
                    endIndex: cards.length > this.pageSize ? this.pageSize : cards.length,
                })
            )
        );
    }

    handleCardDeleted(userCardId: number) {
        this._searchResultsService.deleteCard(userCardId as number).subscribe();
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuery);
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
    }
}
