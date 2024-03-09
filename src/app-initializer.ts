import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Filters } from './app/shared/filter/models/filters.interface';
import { FiltersStateService } from './app/shared/filter/services/filters-states.service';
import { FiltersService } from './app/shared/filter/services/filters.service';

export function initializeAppFactory(
    httpClient: HttpClient,
    filtersService: FiltersService = inject(FiltersService),
    filterStatesService: FiltersStateService = inject(FiltersStateService)
): () => Observable<Filters> {
    return () =>
        filtersService.getFilters().pipe(
            tap((data) => {
                filterStatesService.setFilters(data);
            })
        );
}
