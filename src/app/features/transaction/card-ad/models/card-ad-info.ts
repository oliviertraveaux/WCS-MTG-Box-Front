import { CardRarity } from '../../../../shared/collection/enums/card-rarity.enum';
import { UserCardOnMarket } from '../../../home/models/home-search-results.model';

export interface CardAdInfo {
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
    userCard: UserCardOnMarket;
}
