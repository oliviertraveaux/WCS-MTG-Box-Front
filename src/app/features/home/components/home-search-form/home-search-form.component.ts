import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RequestStatus } from '../../../../shared/enums/request-status.enum';
import { BasicFilter } from '../../../../shared/filter/models/basic-filter.interface';
import { SetFilter } from '../../../../shared/filter/models/set-filter.interface';
import { FiltersStateService } from '../../../../shared/filter/services/filters-states.service';
import { SearchFormHomeService } from '../../../../shared/services/search-form/search-form-home.service';
import { SearchFormComponent } from '../../../../shared/ui/search-form/search-form.component';
import { SearchQuery } from '../../../user-panel/collection/models/search-query.model';
import { HomeSearchResultsService } from '../../shared/services/home-search-results.service';

@Component({
    selector: 'app-home-search-form',
    standalone: true,
    imports: [CommonModule, SearchFormComponent],
    templateUrl: './home-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSearchFormComponent implements OnInit {
    private _searchFormService = inject(SearchFormHomeService);
    private _searchResultsService = inject(HomeSearchResultsService);
    private _filtersStateService = inject(FiltersStateService);

    searchForm!: FormGroup;
    cardRarities: BasicFilter[] = [];
    cardLanguages: BasicFilter[] = [];
    cardSets: SetFilter[] = [];

    cards$: Observable<any> = of([]);
    status$: Observable<RequestStatus> = of(RequestStatus.initial);

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this._searchFormService.updateValidityWhenFormValueChanges();
        this.cardRarities = this._filtersStateService.getRaritiesValue();
        this.cardLanguages = this._filtersStateService.getLanguagesValue();
        this.cardSets = this._filtersStateService.getSetsValue();
        this._searchFormService.addHomeFilters();
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuery);
    }

    reset() {
        this._searchFormService.reset();
    }
}
