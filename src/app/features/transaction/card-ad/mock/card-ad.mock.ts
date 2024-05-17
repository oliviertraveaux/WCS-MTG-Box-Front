import { CardRarity } from '../../../../shared/collection/enums/card-rarity.enum';
import { CardQuality } from '../../../../shared/collection/enums/cardQuality';
import { CardAdInfo } from '../models/card-ad.info';

const CARD_AD_1: CardAdInfo = {
    cardId: 10,
    name: 'Sol Ring',
    frenchName: 'Anneau solaire',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=532602&type=card',
    frenchImageUrl:
        'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=533235&type=card',
    setName: 'Forgotten Realms Commander',
    setAbbreviation: 'AFC',
    rarity: CardRarity.mythicRare,
    artist: 'john doe',
    text: "Landfall — Whenever a land enters the battlefield under your control, you may have Cosi's Ravager deal 1 damage to target player or planeswalker.",
    userCard: {
        userId: 3,
        userName: 'Romain',
        quality: CardQuality.good,
        language: 'French',
        userCardId: 45,
        department: 31,
        city: 'Toulouse',
        hasAnOffer: false,
    },
};

export default { CARD_AD_1 };
