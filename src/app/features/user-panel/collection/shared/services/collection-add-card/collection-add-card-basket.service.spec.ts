import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CardRarity } from '../../../../../../shared/collection/enums/card-rarity.enum';
import { CardQuality } from '../../../../../../shared/collection/enums/cardQuality';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { BasicFilter } from '../../../../../../shared/filter/models/basic-filter.interface';
import { SearchFormAddCardCollectionService } from '../../../../../../shared/services/search-form/search-form-add-card-collection.service';
import { UserInfoStatesService } from '../../../../../../shared/user/services/user-info-states.service';
import { ForeignName } from '../../../models/card-api-foreign-name.model';
import { ApiCard } from '../../../models/card-api.model';
import { CollectionAddCardRepository } from '../../repositories/collection-add-card.repository';
import { CollectionAddCardBasketStatesService } from './collection-add-card-basket-states.service';
import { CollectionAddCardBasketService } from './collection-add-card-basket.service';

describe('CollectionAddCardBasketService', () => {
    let cardBasketService: CollectionAddCardBasketService;
    let cardBasketStateServiceMock: Partial<CollectionAddCardBasketStatesService>;
    let userInfosIdMock: Partial<UserInfoStatesService>;
    let searchFormServiceMock: Partial<SearchFormAddCardCollectionService>;
    let collectionAddCardRepositoryMock: Partial<CollectionAddCardRepository>;

    beforeEach(() => {
        cardBasketStateServiceMock = {
            getCardBasketValue: jest.fn(),
            setCardBasket: jest.fn(),
        };
        userInfosIdMock = {
            getUserInfo: jest.fn().mockReturnValue({ id: 1 }),
        };
        searchFormServiceMock = {
            languageControl: { name: 'English', id: 1 } as BasicFilter,
        };
        collectionAddCardRepositoryMock = {
            saveCards: jest.fn(),
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CollectionAddCardBasketService,
                {
                    provide: CollectionAddCardBasketStatesService,
                    useValue: cardBasketStateServiceMock,
                },
                {
                    provide: UserInfoStatesService,
                    useValue: userInfosIdMock,
                },
                {
                    provide: SearchFormAddCardCollectionService,
                    useValue: searchFormServiceMock,
                },
                {
                    provide: CollectionAddCardRepository,
                    useValue: collectionAddCardRepositoryMock,
                },
            ],
        });

        cardBasketService = TestBed.inject(CollectionAddCardBasketService);
        userInfosIdMock = TestBed.inject(UserInfoStatesService);
        searchFormServiceMock = TestBed.inject(SearchFormAddCardCollectionService);
        collectionAddCardRepositoryMock = TestBed.inject(CollectionAddCardRepository);
    });

    describe('updateCardBasket', () => {
        it('should update the card basket', () => {
            const initialCard: UserCard = {
                cardInfo: {
                    uniqueId: '123',
                    name: 'original',
                },
            } as UserCard;

            const updatedCard: UserCard = {
                cardInfo: {
                    uniqueId: '123',
                    name: 'updated',
                },
            } as UserCard;

            cardBasketStateServiceMock.getCardBasketValue = jest
                .fn()
                .mockReturnValue([initialCard]);
            cardBasketService.updateCardBasket(updatedCard);

            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith([updatedCard]);
        });
        it('should not update the card basket if the card is not found', () => {
            const initialCard: UserCard = {
                cardInfo: {
                    uniqueId: '123',
                    name: 'original',
                },
            } as UserCard;

            const updatedCard: UserCard = {
                cardInfo: {
                    uniqueId: '456',
                    name: 'updated',
                },
            } as UserCard;

            cardBasketStateServiceMock.getCardBasketValue = jest
                .fn()
                .mockReturnValue([initialCard]);
            cardBasketService.updateCardBasket(updatedCard);

            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith([initialCard]);
        });
    });
    describe('fromSearchResultToCardBasket', () => {
        it('should return a UserCard from an ApiCard', () => {
            userInfosIdMock.getUserInfo = jest.fn().mockReturnValue({ id: 1 });

            const apiCard: ApiCard = {
                cardIdApi: '123',
                name: 'name',
                foreignNames: [
                    {
                        language: 'French',
                        name: 'frenchName',
                        imageUrl: 'frenchImageUrl',
                    },
                ] as ForeignName[],
                imageUrl: 'imageUrl',
                manaCost: 1,
                rarity: CardRarity.common,
                set: 'set',
                setName: 'setName',
                text: 'text',
                artist: 'artist',
            };

            const result: UserCard = cardBasketService.fromSearchResultToCardBasket(apiCard);
            const expected = {
                cardInfo: {
                    uniqueId: result.cardInfo.uniqueId,
                    apiCardId: apiCard.cardIdApi,
                    name: apiCard.name,
                    frenchName: apiCard.foreignNames[0].name,
                    imageUrl: apiCard.imageUrl,
                    frenchImageUrl: apiCard.foreignNames[0].imageUrl,
                    manaCost: apiCard.manaCost,
                    rarity: CardRarity.common,
                    setAbbreviation: apiCard.set,
                    setName: apiCard.setName,
                    text: apiCard.text,
                    artist: apiCard.artist,
                },
                userInfo: {
                    userId: userInfosIdMock.getUserInfo().id,
                    qualityName: CardQuality.excellent,
                    qualityId: 3,
                    languageName: searchFormServiceMock?.languageControl?.name,
                    languageId: searchFormServiceMock?.languageControl?.id,
                },
            };
            expect(result).toEqual(expected);
            expect(result.cardInfo.uniqueId?.toString().length).toBe(36);
        });
    });
    describe('fromCardBasketToCollection', () => {
        it('should return a UserCard[] from the card basket', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                        name: 'name',
                    },
                    userInfo: {
                        qualityId: 3,
                        languageId: 1,
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            const result = cardBasketService.fromCardBasketToCollection();
            const expected = [
                {
                    cardInfo: {
                        name: 'name',
                    },
                    userInfo: {},
                },
            ] as UserCard[];
            expect(result).toEqual(expected);
        });
    });
    describe('addCardsToCardBasket', () => {
        it('should add cards to the card basket', () => {
            const cardBasket: UserCard[] = [] as UserCard[];

            const cardsToAdd: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '456',
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            cardBasketService.addCardsToCardBasket(cardsToAdd);
            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith([
                ...cardBasket,
                ...cardsToAdd,
            ]);
        });
    });
    describe('removeCardFromCardBasket', () => {
        it('should remove a card from the card basket', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            cardBasketService.removeCardFromCardBasket('123');
            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith([]);
        });
        it('should not remove a card from the card basket if the card is not found', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            cardBasketService.removeCardFromCardBasket('456');
            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith(cardBasket);
        });
    });
    describe('isCardBasketSavable', () => {
        it('should return true if the card basket is savable', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                    userInfo: {
                        qualityName: CardQuality.excellent,
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            const result = cardBasketService.isCardBasketSavable();
            expect(result).toBe(true);
        });
        it('should return false if the card basket is not savable', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                    userInfo: {},
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            const result = cardBasketService.isCardBasketSavable();
            expect(result).toBe(false);
        });
    });
    describe('isCardBasketEmpty', () => {
        it('should return true if the card basket is empty', () => {
            const cardBasket: UserCard[] = [] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            const result = cardBasketService.isCardBasketEmpty();
            expect(result).toBe(true);
        });
        it('should return false if the card basket is not empty', () => {
            const cardBasket: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                },
            ] as UserCard[];

            cardBasketStateServiceMock.getCardBasketValue = jest.fn().mockReturnValue(cardBasket);
            const result = cardBasketService.isCardBasketEmpty();
            expect(result).toBe(false);
        });
    });
    describe('emptyCardBasket', () => {
        it('should empty the card basket', () => {
            cardBasketService.emptyCardBasket();
            expect(cardBasketStateServiceMock.setCardBasket).toHaveBeenCalledWith([]);
        });
    });
    describe('saveCardCollection', () => {
        it('should save the card collection', () => {
            const userCards: UserCard[] = [
                {
                    cardInfo: {
                        uniqueId: '123',
                    },
                },
            ] as UserCard[];

            cardBasketService.saveCardCollection(userCards);
            expect(collectionAddCardRepositoryMock.saveCards).toHaveBeenCalled();
        });
    });
});
