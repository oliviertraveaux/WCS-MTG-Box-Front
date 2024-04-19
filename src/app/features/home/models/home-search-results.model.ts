import { UserCard } from '../../../shared/collection/models/user-card.model';

export interface HomeSearchResults {
    HomeCardResults: HomeCardResult[];
}

export interface HomeCardResult {
    userCardsOnMarket: UserCardOnMarket[];
}

export interface UserCardOnMarket {
    userCard: UserCard;
    city: string;
    hasAnOffer: boolean;
}
