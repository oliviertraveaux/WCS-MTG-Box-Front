import { CardRarity } from '../../../../shared/collection/enums/card-rarity.enum';
import { ForeignName } from './card-api-foreign-name.model';

export interface ApiCard {
    cardIdApi: string;
    name: string;
    foreignNames: ForeignName[];
    imageUrl: string;
    manaCost: number;
    rarity: CardRarity;
    set: string;
    setName: string;
    artist: string;
    text: string;
}
