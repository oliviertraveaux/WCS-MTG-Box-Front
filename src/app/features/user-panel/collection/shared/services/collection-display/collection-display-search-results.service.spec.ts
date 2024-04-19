import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { CollectionCardsStateService } from '../../../../../../shared/collection/services/collection-cards-state.service';
import { CollectionCardsService } from '../../../../../../shared/collection/services/collection-cards.service';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { SnackbarStatus } from '../../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionDisplaySearchResultsStatesService } from './collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from './collection-display-search-results.service';

describe('CollectionAddCardBasketService', () => {
    let collectionDisplaySearchResultsServiceMock: CollectionDisplaySearchResultsService;
    let searchCardsStatesServiceMock: Partial<CollectionDisplaySearchResultsStatesService>;
    let collectionCardsStatesServiceMock: CollectionCardsStateService;
    let collectionCardsService: Partial<CollectionCardsService>;
    let userInfosIdMock: Partial<UserInfoStatesService>;
    let alertServiceMock: Partial<AlertService>;
    let translateMock: Partial<TranslateService>;

    beforeEach(() => {
        searchCardsStatesServiceMock = {
            setCards: jest.fn(),
            setSearchRequestStatus: jest.fn(),
        };
        userInfosIdMock = {
            getUserInfo: jest.fn().mockReturnValue({ id: 123 }),
        };
        collectionCardsService = {
            deleteCard: jest.fn(),
            getCollectionCards: jest.fn(),
        };
        alertServiceMock = {
            openSnackBar: jest.fn(),
        };
        translateMock = {
            instant: jest.fn(),
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CollectionDisplaySearchResultsService,
                CollectionCardsStateService,
                {
                    provide: CollectionDisplaySearchResultsStatesService,
                    useValue: searchCardsStatesServiceMock,
                },
                {
                    provide: CollectionCardsService,
                    useValue: collectionCardsService,
                },
                {
                    provide: UserInfoStatesService,
                    useValue: userInfosIdMock,
                },
                {
                    provide: AlertService,
                    useValue: alertServiceMock,
                },
                {
                    provide: TranslateService,
                    useValue: translateMock,
                },
            ],
        });

        collectionDisplaySearchResultsServiceMock = TestBed.inject(
            CollectionDisplaySearchResultsService
        );
        searchCardsStatesServiceMock = TestBed.inject(CollectionDisplaySearchResultsStatesService);
        collectionCardsStatesServiceMock = TestBed.inject(CollectionCardsStateService);
        collectionCardsService = TestBed.inject(CollectionCardsService);
        userInfosIdMock = TestBed.inject(UserInfoStatesService);
        alertServiceMock = TestBed.inject(AlertService);
        translateMock = TestBed.inject(TranslateService);
    });

    describe('init', () => {
        it('should set cards', () => {
            const cards = [
                { userInfo: { languageName: 'English' }, cardInfo: { name: 'Card1' } },
            ] as UserCard[];
            collectionCardsStatesServiceMock.getCardsValue = jest.fn().mockReturnValue(cards);
            collectionDisplaySearchResultsServiceMock.init();

            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith(cards);
        });
    });
    describe('searchCards', () => {
        it('should set cards and search request status', () => {
            const cards = [
                { userInfo: { languageName: 'English' }, cardInfo: { name: 'Card1' } },
            ] as UserCard[];
            const searchQuery: SearchQuery = { language: 'English' };
            collectionCardsStatesServiceMock.getCardsValue = jest.fn().mockReturnValue(cards);
            collectionDisplaySearchResultsServiceMock['getCards'] = jest
                .fn()
                .mockReturnValue(of(cards));
            collectionDisplaySearchResultsServiceMock.searchCards(searchQuery);

            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith([]);
            expect(searchCardsStatesServiceMock.setSearchRequestStatus).toHaveBeenCalledWith(
                RequestStatus.loading
            );
            expect(collectionDisplaySearchResultsServiceMock['getCards']).toHaveBeenCalledWith(
                searchQuery
            );
            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith(cards);
            expect(searchCardsStatesServiceMock.setSearchRequestStatus).toHaveBeenCalledWith(
                RequestStatus.success
            );
        });
    });
    describe('deleteCard', () => {
        it('should delete card and open success snackbar', () => {
            collectionCardsService.deleteCard = jest.fn().mockReturnValue(of({}));
            collectionCardsService.getCollectionCards = jest.fn().mockReturnValue(of({}));
            translateMock.instant = jest.fn().mockReturnValue('Toasts.confirm-delete-success');
            collectionDisplaySearchResultsServiceMock.deleteCard(1).subscribe();

            expect(collectionCardsService.deleteCard).toHaveBeenCalledWith(1);
            expect(collectionCardsService.getCollectionCards).toHaveBeenCalledWith(123);
            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalled();
            expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith(
                translateMock.instant('Toasts.confirm-delete-success'),
                SnackbarStatus.success
            );
        });
        it('should delete card and open error snackbar', () => {
            collectionCardsService.deleteCard = jest.fn().mockReturnValue(of({}));
            collectionCardsService.getCollectionCards = jest
                .fn()
                .mockReturnValue(throwError(() => new Error('Failure')));
            translateMock.instant = jest.fn().mockReturnValue('Toasts.confirm-delete-fail');
            collectionDisplaySearchResultsServiceMock.deleteCard(1).subscribe();

            expect(collectionCardsService.deleteCard).toHaveBeenCalledWith(1);
            expect(collectionCardsService.getCollectionCards).toHaveBeenCalledWith(123);
            expect(searchCardsStatesServiceMock.setCards).not.toHaveBeenCalled();
            expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith(
                translateMock.instant('Toasts.confirm-delete-fail'),
                SnackbarStatus.error
            );
        });
    });
    describe('deleteCards', () => {
        it('should delete cards and open success snackbar', () => {
            collectionCardsService.deleteCards = jest.fn().mockReturnValue(of({}));
            collectionCardsService.getCollectionCards = jest.fn().mockReturnValue(of({}));
            translateMock.instant = jest.fn().mockReturnValue('Toasts.confirm-delete-success');
            collectionDisplaySearchResultsServiceMock.deleteCards([1, 2]).subscribe();

            expect(collectionCardsService.deleteCards).toHaveBeenCalledWith([1, 2]);
            expect(collectionCardsService.getCollectionCards).toHaveBeenCalledWith(123);
            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalled();
            expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith(
                translateMock.instant('Toasts.confirm-delete-success'),
                SnackbarStatus.success
            );
        });
        it('should delete cards and open error snackbar', () => {
            collectionCardsService.deleteCards = jest.fn().mockReturnValue(of({}));
            collectionCardsService.getCollectionCards = jest
                .fn()
                .mockReturnValue(throwError(() => new Error('Failure')));
            translateMock.instant = jest.fn().mockReturnValue('Toasts.confirm-delete-fail');
            collectionDisplaySearchResultsServiceMock.deleteCards([1, 2]).subscribe();

            expect(collectionCardsService.deleteCards).toHaveBeenCalledWith([1, 2]);
            expect(collectionCardsService.getCollectionCards).toHaveBeenCalledWith(123);
            expect(searchCardsStatesServiceMock.setCards).not.toHaveBeenCalled();
            expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith(
                translateMock.instant('Toasts.confirm-delete-fail'),
                SnackbarStatus.error
            );
        });
    });
    describe('resetSelection', () => {
        it('should reset selection', () => {
            searchCardsStatesServiceMock.setSelectedCards = jest.fn();
            collectionDisplaySearchResultsServiceMock.resetSelection();

            expect(searchCardsStatesServiceMock.setSelectedCards).toHaveBeenCalledWith([]);
        });
    });
});
