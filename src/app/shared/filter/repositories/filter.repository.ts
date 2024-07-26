import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../backend-endpoints';
import { Filters } from '../models/filters.interface';

@Injectable({
    providedIn: 'root',
})
export class FilterRepository {
    private readonly http = inject(HttpClient);

    public getFilters(): Observable<Filters> {
        const apiUrl = `${ENVIRONMENT.apiFilterConfigurationUrl}`;

        return this.http.get<Filters>(apiUrl, {
            withCredentials: true,
        });
    }
}
