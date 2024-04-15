import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filters } from '../models/filters.interface';
import { FilterRepository } from '../repositories/filter.repository';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    private readonly _filterRepository = inject(FilterRepository);

    public getFilters(): Observable<Filters> {
        return this._filterRepository.getFilters();
    }
}
