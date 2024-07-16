import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestStatus } from '../../../../shared/enums/request-status.enum';
import { SnackbarStatus } from '../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../shared/services/alert.service';
import { SearchQuery } from '../../../user-panel/collection/models/search-query.model';
import { HomeSearchRepository } from '../repositories/home-search.repository';
import { HomeSearchResultsStatesService } from './home-search-results-states.service';
import {Observable} from "rxjs";
import {HomeCardSearchResult} from "../../models/home-search-results.model";

@Injectable()
export class HomeSearchResultsService {
    private _homeRepository = inject(HomeSearchRepository);
    private _homeSearchResultsStatesService = inject(HomeSearchResultsStatesService);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);

    searchCards(searchQuery: SearchQuery): void {
        this._homeSearchResultsStatesService.setHomeCards([]);
        this._homeSearchResultsStatesService.setSearchRequestStatus(RequestStatus.loading);
        this._homeRepository.getCards(searchQuery).subscribe({
            next: (searchCards) => {
                this._homeSearchResultsStatesService.setHomeCards(searchCards);
                this._homeSearchResultsStatesService.setSearchRequestStatus(RequestStatus.success);
            },
            error: (err) => {
                console.error('home search error', err);
                this._homeSearchResultsStatesService.setSearchRequestStatus(RequestStatus.error);
                this._alertService.openSnackBar(
                    this._translate.instant('home.toast.search-cards-error'),
                    SnackbarStatus.error
                );
            },
        });
    }

  getLastTenCards(): Observable<HomeCardSearchResult[]> {
    return this._homeRepository.getLastTenCards();
  }



}
