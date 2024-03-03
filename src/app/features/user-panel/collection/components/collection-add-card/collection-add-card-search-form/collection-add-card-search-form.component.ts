import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
    BasicFilter,
    GetLanguageAbbreviationPipe,
    getSearchResultTextPipe,
    RequestStatus,
    SetFilter,
} from '@shared';
import { Observable } from 'rxjs';
import { SearchFormComponent } from '../../../../../../shared/ui/search-form/search-form.component';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionAddCardSearchFormService } from '../../../shared/services/collection-add-card-search-form.service';
import { CollectionAddCardResultsStatesService } from '../../../shared/services/collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultsService } from '../../../shared/services/collection-add-card-search-results.service';

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
})
export class CollectionAddCardSearchFormComponent implements OnInit {
    private _searchFormService = inject(CollectionAddCardSearchFormService);
    private _searchResultsService = inject(CollectionAddCardSearchResultsService);
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);
    private _activatedRoute = inject(ActivatedRoute);

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
        this._activatedRoute.data.subscribe((response: any) => {
            this.cardTypes = response.filters.types.map((type: any) => type.name);
            this.cardRarities = response.filters.rarities;
            this.cardLanguages = response.filters.languages;
            this.cardSets = response.filters.sets;
        });
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuery);
    }

    reset() {
        this._searchFormService.reset();
    }
}
