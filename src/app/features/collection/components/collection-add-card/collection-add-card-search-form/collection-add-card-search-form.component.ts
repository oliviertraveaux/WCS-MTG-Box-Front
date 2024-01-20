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
import { CARD_COLORS, CardRarity, LANGUAGES } from '@shared';
import { map, Observable, startWith } from 'rxjs';
import { SearchQuery } from '../../../models/search-querry.model';
import { CollectionAddCardSearchFormService } from '../../../shared/services/collection-add-card-search-form.service';
import { CollectionAddCardResultsStatesService } from '../../../shared/services/collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultsService } from '../../../shared/services/collection-add-card-search-results.service';

@Component({
    selector: 'app-collection-search-form',
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
    ],
    templateUrl: './collection-add-card-search-form.component.html',
})
export class CollectionAddCardSearchFormComponent implements OnInit {
    private _searchFormService = inject(CollectionAddCardSearchFormService);
    private _searchResultsService = inject(CollectionAddCardSearchResultsService);
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);
    private _destroyRef = inject(DestroyRef);

    protected readonly CARD_COLORS = CARD_COLORS;
    protected readonly CardRarity = CardRarity;
    protected readonly Object = Object;
    protected readonly LANGUAGES = LANGUAGES;

    searchForm!: FormGroup;
    cardTypes!: string[];
    filteredCardTypes!: Observable<string[]> | undefined;
    isFormValid!: boolean;

    ngOnInit(): void {
        this.searchForm = this._searchFormService.searchForm;
        this.isFormValid = this.searchForm.valid && this.searchForm.dirty;
        this._searchFormService.updateNameValidityWhenFormValueChanges();
        this._searchResultsService.readCardTypes();

        this.searchForm.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.isFormValid = this.searchForm.valid && this.searchForm.dirty;
        });

        this._searchResultsStateService.getCardTypes().subscribe((types) => {
            this.cardTypes = types;
            this.filteredCardTypes = this._searchFormService.searchForm
                .get('type')
                ?.valueChanges.pipe(
                    startWith(''),
                    map((value: string) => this._filter(value || ''))
                );
        });
    }

    search() {
        const searchQuery: SearchQuery = this._searchFormService.getSearch();
        console.log('searchQuerry', searchQuery);
        this._searchResultsService.searchCards(searchQuery);
    }

    reset() {
        this._searchFormService.reset();
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cardTypes.filter((option) => option.toLowerCase().includes(filterValue));
    }
}
