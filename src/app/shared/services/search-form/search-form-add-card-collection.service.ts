import { Injectable } from '@angular/core';
import { SearchQuery } from '../../../features/user-panel/collection/models/search-query.model';
import { SearchFormService } from './search-form.service';

@Injectable({
    providedIn: 'root',
})
export class SearchFormAddCardCollectionService extends SearchFormService {
    override getSearch(): SearchQuery {
        let requestParams: SearchQuery = {};
        for (let control of Object.keys(this.searchForm.controls)) {
            const value = this.searchForm.get(control)?.value;
            if (value !== null && value !== '' && value.name !== 'English') {
                // @ts-ignore
                requestParams[control] = control === 'language' ? value.name : value;
            }
        }
        return requestParams;
    }
}
