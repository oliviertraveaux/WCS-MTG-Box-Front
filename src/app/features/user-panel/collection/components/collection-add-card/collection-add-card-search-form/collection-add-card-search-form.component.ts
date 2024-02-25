import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    CARD_COLORS,
    GetLanguageAbbreviationPipe,
    getSearchResultTextPipe,
    RequestStatus,
    SetFilter,
} from '@shared';
import { map, Observable, startWith } from 'rxjs';
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
    ],
    templateUrl: './collection-add-card-search-form.component.html',
})
export class CollectionAddCardSearchFormComponent implements OnInit {
    private _searchFormService = inject(CollectionAddCardSearchFormService);
    private _searchResultsService = inject(CollectionAddCardSearchResultsService);
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);

    protected readonly CARD_COLORS = CARD_COLORS;
    protected readonly RequestStatus = RequestStatus;

    searchForm!: FormGroup;
    cardTypes: string[] = [];
    cardRarities: BasicFilter[] = [];
    cardLanguages: BasicFilter[] = [];
    cardsSets: SetFilter[] = [];
    filteredCardsSets!: Observable<SetFilter[]> | undefined;
    filteredCardTypes!: Observable<string[]> | undefined;
    isFormValid!: boolean;
    cards$: Observable<any> = this._searchResultsStateService.getCards$();
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this.isFormValid = this.searchForm.valid && this.searchForm.dirty;
        this._searchFormService.updateValidityWhenFormValueChanges();
        this._activatedRoute.data.subscribe((response: any) => {
            this.cardTypes = response.filters.types.map((type: any) => type.name);
            this.cardRarities = response.filters.rarities;
            this.cardLanguages = response.filters.languages;
            this.cardsSets = response.filters.sets;
        });

        this.searchForm.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.isFormValid = this.searchForm.valid && this.searchForm.dirty;
        });

        this.filteredCardTypes = this._searchFormService.searchForm.get('type')?.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef),
            startWith(''),
            map((value: string) => this._filterTypes(value || ''))
        );
        this.filteredCardsSets = this._searchFormService.searchForm.get('set')?.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef),
            startWith(''),
            map((value: string) => this._filterSets(value || ''))
        );
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        this._searchResultsService.searchCards(searchQuery);
    }

    reset() {
        this._searchFormService.reset();
    }

    private _filterTypes(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.cardTypes.filter((option: string) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    private _filterSets(value: string): SetFilter[] {
        const filterValue = value.toLowerCase();

        return this.cardsSets.filter((option: SetFilter) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }
}
