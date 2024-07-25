import { CardRarity } from '../../../shared/collection/enums/card-rarity.enum';
import { CardQuality } from '../../../shared/collection/enums/cardQuality';

export interface HomeCardSearchResult {
    cardId: number;
    name: string;
    frenchName: string;
    imageUrl: string;
    frenchImageUrl: string;
    setName: string;
    setAbbreviation: string;
    rarity: CardRarity;
    artist: string;
    text: string;
    userCardsOnMarket: UserCardOnMarket[];
}

export interface UserCardOnMarket {
    userId: number;
    userName: string;
    quality: CardQuality;
    language: string;
    userCardId: number;
    city: string;
    department: number;
    hasAnOffer: boolean;
}
