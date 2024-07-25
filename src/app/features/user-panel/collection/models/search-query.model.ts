import { CardRarity } from '../../../../shared/collection/enums/card-rarity.enum';
import { CardColor } from '../../../../shared/collection/models/card-color.model';

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
    location?: number | string;
    recentlyConnected?: boolean;
}
