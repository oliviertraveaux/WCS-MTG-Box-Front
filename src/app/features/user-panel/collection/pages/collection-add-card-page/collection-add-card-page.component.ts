import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserverService } from '@shared';
import { CollectionAddCardBasketComponent } from '../../components/collection-add-card/collection-add-card-basket/collection-add-card-basket.component';
import { CollectionAddCardSearchFormComponent } from '../../components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component';
import { CollectionAddCardSearchResultsComponent } from '../../components/collection-add-card/collection-add-card-search-results/collection-add-card-search-results.component';
import { SearchQuery } from '../../models/search-query.model';
import { CollectionAddCardBasketService } from '../../shared/services/collection-add-card-basket.service';
import { CollectionAddCardSearchFormService } from '../../shared/services/collection-add-card-search-form.service';
import { CollectionAddCardSearchResultsService } from '../../shared/services/collection-add-card-search-results.service';

@Component({
    selector: 'app-collection-page',
    standalone: true,
    imports: [
        CommonModule,
        CollectionAddCardSearchResultsComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        CollectionAddCardSearchFormComponent,
        MatSidenavModule,
        MatIconModule,
        RouterOutlet,
        MatListModule,
        MatOptionModule,
        CollectionAddCardBasketComponent,
        TranslateModule,
    ],
    templateUrl: './collection-add-card-page.component.html',
    styleUrls: ['./collection-add-card-page.component.scss'],
})
export class CollectionAddCardPageComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _searchFormService = inject(CollectionAddCardSearchFormService);
    private _searchResultsService = inject(CollectionAddCardSearchResultsService);
    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _destroyRef = inject(DestroyRef);

    readonly isTablet = this._breakpointObserverService.isTablet;
    readonly isDesktop = this._breakpointObserverService.isDesktop;

    searchForm = this._searchFormService.searchForm;

    ngOnInit() {
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }

    search() {
        const searchQuerry: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuerry);
    }

    isCardCollectionEmpty(): boolean {
        return this._cardBasketService.isCardBasketEmpty();
    }
}
