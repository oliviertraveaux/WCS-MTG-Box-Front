import { CardRarity } from '../../collection/enums/card-rarity.enum';
import { CardQuality } from '../../collection/enums/cardQuality';

export interface OfferWantedUserCard {
    cardInfo: {
        uniqueId?: string | number;
        apiCardId: string;
        name: string;
        frenchName: string;
        imageUrl: string;
        frenchImageUrl: string;
        manaCost: number;
        rarity: CardRarity;
        setAbbreviation: string;
        setName: string;
        text: string;
        artist: string;
    };
    userInfo: {
        userId: number;
        userCardId: number;
        userName: string;
        city: string;
        department: number;
        qualityName: CardQuality;
        languageName: string;
    };
}
