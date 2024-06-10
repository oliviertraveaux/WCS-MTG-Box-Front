import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';
import { RequestStatus } from '../../../../../shared/enums/request-status.enum';
import { BasicFilter } from '../../../../../shared/filter/models/basic-filter.interface';
import { FiltersStateService } from '../../../../../shared/filter/services/filters-states.service';
import { SearchFormService } from '../../../../../shared/services/search-form/search-form.service';
import { SearchFormComponent } from '../../../../../shared/ui/search-form/search-form.component';
import { SearchQuery } from '../../../../user-panel/collection/models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from '../../../../user-panel/collection/shared/services/collection-display/collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from '../../../../user-panel/collection/shared/services/collection-display/collection-display-search-results.service';

@Component({
    selector: 'app-offer-collection-search-form',
    standalone: true,
    imports: [CommonModule, SearchFormComponent],
    templateUrl: './offer-collection-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCollectionSearchFormComponent implements OnInit {
    private _searchFormService = inject(SearchFormService);
    private _searchResultsService = inject(CollectionDisplaySearchResultsService);
    private _searchResultsStateService = inject(CollectionDisplaySearchResultsStatesService);
    private _filtersStateService = inject(FiltersStateService);

    searchForm!: FormGroup;
    cardLanguages: BasicFilter[] = [];

    cards$: Observable<UserCard[]> = this._searchResultsStateService.getCards$();
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this._searchFormService.updateValidityWhenFormValueChanges();
        this.cardLanguages = this._filtersStateService.getLanguagesValue();
        this.searchForm?.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => {
                    const searchQuery: SearchQuery = this._searchFormService.getSearch();
                    this._searchResultsService.searchCards(searchQuery);
                })
            )
            .subscribe();
    }
}
