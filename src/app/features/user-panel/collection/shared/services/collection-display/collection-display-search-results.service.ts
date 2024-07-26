import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, take, tap } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { CollectionCardsStateService } from '../../../../../../shared/collection/services/collection-cards-state.service';
import { CollectionCardsService } from '../../../../../../shared/collection/services/collection-cards.service';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { SnackbarStatus } from '../../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from './collection-display-search-results-states.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionDisplaySearchResultsService {
    private _searchCardsStatesService = inject(CollectionDisplaySearchResultsStatesService);
    private _collectionCardsStatesService = inject(CollectionCardsStateService);
    private _collectionCardsService = inject(CollectionCardsService);
    private _userInfoId = inject(UserInfoStatesService).getUserInfo().id;
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);

    init() {
        this._searchCardsStatesService.setCards(this._collectionCardsStatesService.getCardsValue());
    }

    searchCards(searchQuery: SearchQuery) {
        this._searchCardsStatesService.setCards([]);
        this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.loading);
        this.getCards(searchQuery).subscribe((userCards) => {
            this._searchCardsStatesService.setCards(userCards);
            this._searchCardsStatesService.setSearchRequestStatus(RequestStatus.success);
        });
    }

    deleteCard(userCardId: number): Observable<void> {
        return this._collectionCardsService
            .deleteCard(userCardId)
            .pipe(tap(() => this.handleDeleteResponse()));
    }

    deleteCards(userCardIdList: number[]): Observable<void> {
        return this._collectionCardsService
            .deleteCards(userCardIdList)
            .pipe(tap(() => this.handleDeleteResponse()));
    }

    private handleDeleteResponse() {
        this._collectionCardsService
            .getCollectionCards$(this._userInfoId)
            .pipe(take(1))
            .subscribe({
                next: () => this.handleDeleteSuccess(),
                error: () => this.handleDeleteError(),
            });
    }

    private handleDeleteSuccess() {
        this.init();
        this._alertService.openSnackBar(
            this._translate.instant('Toasts.confirm-delete-success'),
            SnackbarStatus.success
        );
    }

    private handleDeleteError() {
        this._alertService.openSnackBar(
            this._translate.instant('Toasts.confirm-delete-fail'),
            SnackbarStatus.error
        );
    }
    private getCards(searchQuery: SearchQuery): Observable<UserCard[]> {
        let filteredCards: UserCard[] = [];
        filteredCards = this._collectionCardsStatesService
            .getCardsValue()
            .filter((card) => this.isMatchingFilter(searchQuery, card));
        return of(filteredCards);
    }

    private isMatchingFilter(searchQuery: SearchQuery, card: UserCard) {
        let result = true;
        if (searchQuery.language) {
            result =
                result &&
                card.userInfo.languageName!.toLowerCase() === searchQuery.language.toLowerCase();
        }
        if (searchQuery.name) {
            result = result && this.matchLanguageName(searchQuery.name, card);
        }
        if (searchQuery.set) {
            result =
                result &&
                card.cardInfo.setAbbreviation.toLowerCase() === searchQuery.set.toLowerCase();
        }
        if (searchQuery.rarity) {
            result =
                result && card.cardInfo.rarity.toLowerCase() === searchQuery.rarity.toLowerCase();
        }
        return result;
    }

    private matchLanguageName(searchQueryName: string, card: UserCard): boolean {
        if (card.userInfo.languageName === 'French') {
            return card.cardInfo.frenchName.toLowerCase().includes(searchQueryName.toLowerCase());
        }
        return card.cardInfo.name.toLowerCase().includes(searchQueryName.toLowerCase());
    }

    resetSelection() {
        this._searchCardsStatesService.setSelectedCards([]);
    }
}
