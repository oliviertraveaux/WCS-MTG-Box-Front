import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Filters } from '../models/filters.interface';
import { FilterService } from '../services/filter.service';

export const filtersResolver: ResolveFn<Observable<Filters>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const filterService = inject(FilterService);
    return filterService.getFilters();
};
