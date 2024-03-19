import { inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ReconnectUserService } from './app/features/auth/shared/services/reconnect-user.service';
import { Filters } from './app/shared/filter/models/filters.interface';
import { FiltersStateService } from './app/shared/filter/services/filters-states.service';
import { FiltersService } from './app/shared/filter/services/filters.service';

export function initializeAppFilters(
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

export function initializeAppUserInfo(
    reconnectUserService = inject(ReconnectUserService)
): () => Observable<boolean> {
    return () => {
        reconnectUserService.getUserInfo();
        return of(true);
    };
}
