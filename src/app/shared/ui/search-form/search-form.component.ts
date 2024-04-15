import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { distinctUntilChanged, map, Observable, of, startWith, tap } from 'rxjs';
import { ApiCard } from '../../../features/user-panel/collection/models/card-api.model';
import { CARD_COLORS } from '../../collection/constants/card-colors.const';
import { UserCard } from '../../collection/models/user-card.model';
import { GetLanguageAbbreviationPipe } from '../../collection/pipes/get-language-abbreviation.pipe';
import { getSearchResultTextPipe } from '../../collection/pipes/get-search-result-text.pipe';
import { RequestStatus } from '../../enums/request-status.enum';
import { BasicFilter } from '../../filter/models/basic-filter.interface';
import { SetFilter } from '../../filter/models/set-filter.interface';
import { BreakpointObserverService } from '../../services/breakpoint-observer.service';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [
        CommonModule,
        GetLanguageAbbreviationPipe,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
        getSearchResultTextPipe,
    ],
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    @Input({ required: true }) searchForm!: FormGroup;
    @Input() cardTypes: string[] = [];
    @Input() cardRarities: BasicFilter[] = [];
    @Input() cardLanguages: BasicFilter[] = [];
    @Input() cardSets: SetFilter[] = [];
    @Input() cards$: Observable<ApiCard[] | UserCard[]> = of([]);
    @Input() status$!: Observable<RequestStatus>;
    @Input() hasLanguage: boolean = true;
    @Input() hasColor: boolean = true;
    @Input() hasRarity: boolean = true;
    @Input() hasManaCost: boolean = true;
    @Input() hasType: boolean = true;
    @Input() hasSet: boolean = true;
    @Input() hasText: boolean = true;
    @Input() hasArtist: boolean = true;

    @Output() resetParams = new EventEmitter();
    @Output() searchCards = new EventEmitter();

    protected readonly CARD_COLORS = CARD_COLORS;
    protected readonly RequestStatus = RequestStatus;
    readonly isDesktop = this._breakpointObserverService.isDesktop;
    readonly isTablet = this._breakpointObserverService.isTablet;

    filteredCardsSets!: Observable<SetFilter[]> | undefined;
    filteredCardTypes!: Observable<string[]> | undefined;
    isFormValid!: boolean;
    moreFilters: boolean = false;

    ngOnInit(): void {
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

        this._breakpointObserverService.isTablet
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                distinctUntilChanged(),
                tap((isTablet) => (!isTablet ? this.switchToMobileView() : null))
            )
            .subscribe();

        this.isFormValid = this.searchForm.valid && this.searchForm.dirty;

        this.searchForm.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.isFormValid = this.searchForm.valid && this.searchForm.dirty;
        });

        this.filteredCardTypes = this.searchForm.get('type')?.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef),
            startWith(''),
            map((value: string) => this._filterTypes(value || ''))
        );
        this.filteredCardsSets = this.searchForm.get('set')?.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef),
            startWith(''),
            map((value: string) => this._filterSets(value || ''))
        );
    }

    search() {
        this.searchCards.emit();
    }

    reset() {
        this.resetParams.emit();
    }

    switchFilterView() {
        this.moreFilters = !this.moreFilters;
        this.resetParams.emit();
    }

    switchToMobileView() {
        this.moreFilters = true;
        this.resetParams.emit();
    }

    private _filterTypes(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.cardTypes.filter((option: string) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    private _filterSets(value: string): SetFilter[] {
        const filterValue = value.toLowerCase();

        return this.cardSets.filter((option: SetFilter) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }
}
