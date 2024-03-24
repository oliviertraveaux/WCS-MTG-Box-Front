import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { GetLanguageAbbreviationPipe } from '../../../../../../shared/collection/pipes/get-language-abbreviation.pipe';
import { getSearchResultTextPipe } from '../../../../../../shared/collection/pipes/get-search-result-text.pipe';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { BasicFilter } from '../../../../../../shared/filter/models/basic-filter.interface';
import { SetFilter } from '../../../../../../shared/filter/models/set-filter.interface';
import { FiltersStateService } from '../../../../../../shared/filter/services/filters-states.service';
import { SearchFormAddCardCollectionService } from '../../../../../../shared/services/search-form/search-form-add-card-collection.service';
import { SearchFormComponent } from '../../../../../../shared/ui/search-form/search-form.component';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionAddCardResultsStatesService } from '../../../shared/services/collection-add-card/collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultsService } from '../../../shared/services/collection-add-card/collection-add-card-search-results.service';

@Component({
    selector: 'app-collection-add-card-search-form',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatIconModule,
        getSearchResultTextPipe,
        TranslateModule,
        GetLanguageAbbreviationPipe,
        SearchFormComponent,
    ],
    templateUrl: './collection-add-card-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionAddCardSearchFormComponent implements OnInit {
    private _searchFormService = inject(SearchFormAddCardCollectionService);
    private _searchResultsService = inject(CollectionAddCardSearchResultsService);
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);
    private _filtersStateService = inject(FiltersStateService);

    searchForm!: FormGroup;
    cardTypes: string[] = [];
    cardRarities: BasicFilter[] = [];
    cardLanguages: BasicFilter[] = [];
    cardSets: SetFilter[] = [];

    cards$: Observable<any> = this._searchResultsStateService.getCards$();
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this._searchFormService.updateValidityWhenFormValueChanges();
        this.cardTypes = this._filtersStateService.getTypesValue().map((type: any) => type.name);
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
    }
}
