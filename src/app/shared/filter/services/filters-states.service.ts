import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BasicFilter } from '../models/basic-filter.interface';
import { Filters } from '../models/filters.interface';
import { QualityFilter } from '../models/quality-filter.interface';
import { SetFilter } from '../models/set-filter.interface';

@Injectable({
    providedIn: 'root',
})
export class FiltersStateService {
    private _filters$ = new BehaviorSubject<Filters>({} as Filters);

    getFilters(): Observable<Filters> {
        return this._filters$;
    }
    getFiltersValue(): Filters {
        return this._filters$.getValue();
    }

    setFilters(filters: Filters): void {
        this._filters$.next(filters);
    }

    getLanguages(): Observable<BasicFilter[]> {
        return this._filters$.pipe(map((filters) => filters.languages));
    }

    getLanguagesValue(): BasicFilter[] {
        return this._filters$.getValue().languages;
    }

    getTypes(): Observable<string[]> {
        return this._filters$.pipe(map((filters) => filters.types));
    }

    getTypesValue(): string[] {
        return this._filters$.getValue().types;
    }

    getRarities(): Observable<BasicFilter[]> {
        return this._filters$.pipe(map((filters) => filters.rarities));
    }

    getRaritiesValue(): BasicFilter[] {
        return this._filters$.getValue().rarities;
    }

    getQualities(): Observable<QualityFilter[]> {
        return this._filters$.pipe(map((filters) => filters.qualities));
    }

    getQualitiesValue(): QualityFilter[] {
        return this._filters$.getValue().qualities;
    }

    getSets(): Observable<SetFilter[]> {
        return this._filters$.pipe(map((filters) => filters.sets));
    }

    getSetsValue(): SetFilter[] {
        return this._filters$.getValue().sets;
    }

    getCardTypes(): Observable<string[]> {
        return this._filters$.pipe(map((filters) => filters.types));
    }

    getCardTypesValue(): string[] {
        return this._filters$.getValue().types;
    }
}
