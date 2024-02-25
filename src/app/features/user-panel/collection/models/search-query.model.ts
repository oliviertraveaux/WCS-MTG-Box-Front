import { CardColor, CardRarity } from '@shared';

export interface SearchQuery {
    name?: string;
    language?: string;
    set?: string;
    cmc?: number | string;
    rarity?: CardRarity | string;
    type?: string;
    colors?: CardColor | string;
    text?: string;
    artist?: string;
}
