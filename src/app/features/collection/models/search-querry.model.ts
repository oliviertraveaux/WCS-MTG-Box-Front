import { CardColor, CardRarity } from '@shared';

export interface SearchQuery {
    name?: string;
    language?: string;
    set?: string;
    cmc?: number;
    rarity?: CardRarity;
    type?: string;
    colors?: CardColor;
    text?: string;
    artist?: string;
}
