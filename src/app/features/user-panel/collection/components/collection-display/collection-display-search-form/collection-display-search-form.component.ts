import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { BasicFilter } from '../../../../../../shared/filter/models/basic-filter.interface';
import { SetFilter } from '../../../../../../shared/filter/models/set-filter.interface';
import { FiltersStateService } from '../../../../../../shared/filter/services/filters-states.service';
import { SearchFormService } from '../../../../../../shared/services/search-form/search-form.service';
import { SearchFormComponent } from '../../../../../../shared/ui/search-form/search-form.component';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from '../../../shared/services/collection-display/collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from '../../../shared/services/collection-display/collection-display-search-results.service';

@Component({
    selector: 'app-collection-display-search-form',
    standalone: true,
    imports: [CommonModule, SearchFormComponent],
    templateUrl: './collection-display-search-form.component.html',
    styleUrls: ['./collection-display-search-form.component.scss'],
})
export class CollectionDisplaySearchFormComponent implements OnInit {
    private _searchFormService = inject(SearchFormService);
    private _searchResultsService = inject(CollectionDisplaySearchResultsService);
    private _searchResultsStateService = inject(CollectionDisplaySearchResultsStatesService);
    private _filtersStateService = inject(FiltersStateService);

    searchForm!: FormGroup;
    cardRarities: BasicFilter[] = [];
    cardLanguages: BasicFilter[] = [];
    cardSets: SetFilter[] = [];

    cards$: Observable<any> = this._searchResultsStateService.getCards$();
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this._searchFormService.updateValidityWhenFormValueChanges();
        this.cardRarities = this._filtersStateService.getRaritiesValue();
        this.cardLanguages = this._filtersStateService.getLanguagesValue();
        this.cardSets = this._filtersStateService.getSetsValue();
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuery);
    }

    reset() {
        this._searchFormService.reset();
        this._searchResultsService.init();
    }
}
