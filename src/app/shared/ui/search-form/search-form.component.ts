import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
        MatCheckboxModule,
    ],
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _destroyRef = inject(DestroyRef);

    @Input({ required: true }) searchForm!: FormGroup;
    @Input() cardTypes: string[] = [];
    @Input() cardRarities: BasicFilter[] = [];
    @Input() cardLanguages: BasicFilter[] = [];
    @Input() cardSets: SetFilter[] = [];
    @Input() cards$: Observable<ApiCard[] | UserCard[]> = of([]);
    @Input() status$!: Observable<RequestStatus>;
    @Input() hasLanguage: boolean = false;
    @Input() hasColor: boolean = false;
    @Input() hasRarity: boolean = false;
    @Input() hasManaCost: boolean = false;
    @Input() hasType: boolean = false;
    @Input() hasSet: boolean = false;
    @Input() hasText: boolean = false;
    @Input() hasArtist: boolean = false;
    @Input() hasLocation: boolean = false;
    @Input() hasRecentlyConnected: boolean = false;

    @Output() resetParams = new EventEmitter();
    @Output() searchCards = new EventEmitter();

    protected readonly CARD_COLORS = CARD_COLORS;
    protected readonly RequestStatus = RequestStatus;
    readonly isDesktop = this._breakpointObserverService.isDesktop;
    readonly isTablet = this._breakpointObserverService.isTablet;

    filteredCardsSets!: Observable<SetFilter[]> | undefined;
    filteredCardTypes!: Observable<string[]> | undefined;
    isFormValid!: Observable<boolean>;
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

        this.searchForm
            .get('name')
            ?.valueChanges.pipe(
                takeUntilDestroyed(this._destroyRef),
                tap(() => {
                    if (this.searchForm.get('name')?.value && this.searchForm.get('name')?.valid) {
                        this.searchForm.get('language')?.enable();
                    }
                })
            )
            .subscribe();

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

        this.isFormValid = this.searchForm.valueChanges.pipe(
            startWith(false),
            map(() => this.searchForm.valid && this.searchForm.dirty)
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
