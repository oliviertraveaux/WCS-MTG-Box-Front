import { CardRarity } from '../../../shared/collection/enums/card-rarity.enum';
import { UserCard } from '../../../shared/collection/models/user-card.model';

export interface HomeCardSearchResults {
    HomeCardSearchResults: HomeCardSearchResult[];
}

export interface HomeCardSearchResult {
    cardId: string;
    name: string;
    frenchName: string;
    imageUrl: string;
    frenchImageUrl: string;
    setName: string;
    setNameAbbreviation: string;
    rarity: CardRarity;
    UserCardsOnMarket: UserCardOnMarket[];
}

export interface UserCardOnMarket {
    userCard: UserCard;
    localisation: string;
    hasAnOffer: boolean;
}
