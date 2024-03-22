import { CardRarity } from '../enums/card-rarity.enum';
import { CardQuality } from '../enums/cardQuality';

export interface UserCard {
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
        userCardId?: number;
        qualityId?: number;
        qualityName?: CardQuality;
        languageId?: number;
        languageName?: string;
    };
}
