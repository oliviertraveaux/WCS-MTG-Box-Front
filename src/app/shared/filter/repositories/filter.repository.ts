import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../env';
import { Filters } from '../models/filters.interface';

@Injectable({
    providedIn: 'root',
})
export class FilterRepository {
    private http = inject(HttpClient);

    public getFilters(): Observable<Filters> {
        const apiUrl = `${ENVIRONMENT.apiFilterConfiurationUrl}`;
        console.log('apiUrl', apiUrl);

        return this.http.get<Filters>(apiUrl);
    }
}
