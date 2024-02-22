import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filters } from '../models/filters.interface';
import { FilterRepository } from '../repositories/filter.repository';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    private filterRepository = inject(FilterRepository);

    public getFilters(): Observable<Filters> {
        const result = this.filterRepository.getFilters();
        console.log('result', result);
        return result;
    }
}
