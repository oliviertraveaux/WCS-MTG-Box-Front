import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchQuery } from '../../../features/user-panel/collection/models/search-query.model';
import { SearchFormService } from './search-form.service';

@Injectable()
export class SearchFormHomeService extends SearchFormService {
    addHomeFilters() {
        this.searchForm.addControl('location', new FormControl(''));
        this.searchForm.addControl('recentlyConnected', new FormControl(''));
    }

    get locationControl(): string {
        return this.searchForm.get('location')?.value;
    }

    get recentlyConnectedControl(): string {
        return this.searchForm.get('recentlyConnected')?.value;
    }

    override getSearch(): SearchQuery {
        let requestParams: SearchQuery = {};
        for (let control of Object.keys(this.searchForm.controls)) {
            const value = this.searchForm.get(control)?.value;
            if (value !== null && value !== '' && value !== false) {
                // @ts-ignore
                requestParams[control] = control === 'language' ? value.name : value;
            }
        }
        return requestParams;
    }

    override reset(): void {
        super.reset();
        this.searchForm.get('location')?.patchValue(null);
        this.searchForm.get('recentlyConnected')?.patchValue(null);
    }
}
