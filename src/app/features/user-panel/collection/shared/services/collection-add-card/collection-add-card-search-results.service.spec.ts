import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { ApiCard } from '../../../models/card-api.model';
import { SearchQuery } from '../../../models/search-query.model';
import { CollectionAddCardRepository } from '../../repositories/collection-add-card.repository';
import { CollectionAddCardResultsStatesService } from './collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultsService } from './collection-add-card-search-results.service';

describe('CollectionAddCardSearchResultsService', () => {
    let collectionAddCardSearchResultsServiceMock: CollectionAddCardSearchResultsService;
    let collectionAddCardRepositoryMock: CollectionAddCardRepository;
    let searchCardsStatesServiceMock: Partial<CollectionAddCardResultsStatesService>;

    beforeEach(() => {
        searchCardsStatesServiceMock = {
            setCards: jest.fn(),
            setSearchRequestStatus: jest.fn(),
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CollectionAddCardSearchResultsService,
                CollectionAddCardRepository,
                {
                    provide: CollectionAddCardResultsStatesService,
                    useValue: searchCardsStatesServiceMock,
                },
            ],
        });

        collectionAddCardSearchResultsServiceMock = TestBed.inject(
            CollectionAddCardSearchResultsService
        );
        searchCardsStatesServiceMock = TestBed.inject(CollectionAddCardResultsStatesService);
        collectionAddCardRepositoryMock = TestBed.inject(CollectionAddCardRepository);
    });

    describe('searchCards', () => {
        it('should set cards and search request status', () => {
            const cards = [{ cardIdApi: '1', name: 'Card 1' }] as ApiCard[];
            const searchQuery: SearchQuery = { language: 'English' };
            collectionAddCardRepositoryMock.getCards = jest.fn().mockReturnValue(of(cards));
            collectionAddCardSearchResultsServiceMock.searchCards(searchQuery);

            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith([]);
            expect(searchCardsStatesServiceMock.setSearchRequestStatus).toHaveBeenCalledWith(
                RequestStatus.loading
            );
            expect(collectionAddCardRepositoryMock.getCards).toHaveBeenCalledWith(searchQuery);
            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith(cards);
            expect(searchCardsStatesServiceMock.setSearchRequestStatus).toHaveBeenCalledWith(
                RequestStatus.success
            );
        });
    });
    describe('reset', () => {
        it('should reset cards', () => {
            searchCardsStatesServiceMock.setCards = jest.fn();
            collectionAddCardSearchResultsServiceMock.reset();

            expect(searchCardsStatesServiceMock.setCards).toHaveBeenCalledWith([]);
        });
    });
});
