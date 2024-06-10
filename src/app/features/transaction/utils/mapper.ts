import { UserCard } from '../../../shared/collection/models/user-card.model';
import { CardAdInfo } from '../card-ad/models/card-ad-info';

export function userCardToCardAdInfo(usercard: UserCard): CardAdInfo {
    return {
        cardId: usercard.cardInfo.uniqueId as number,
        name: usercard.cardInfo.name,
        frenchName: usercard.cardInfo.frenchName,
        imageUrl: usercard.cardInfo.imageUrl,
        frenchImageUrl: usercard.cardInfo.frenchImageUrl,
        setName: usercard.cardInfo.setName,
        setAbbreviation: usercard.cardInfo.setAbbreviation,
        rarity: usercard.cardInfo.rarity,
        artist: usercard.cardInfo.artist,
        text: usercard.cardInfo.text,
        userCard: {
            userId: usercard.userInfo.userId,
            userName: '',
            quality: usercard.userInfo.qualityName!,
            language: usercard.userInfo.languageName!,
            userCardId: usercard.userInfo.userCardId!,
            city: '',
            department: 0,
            hasAnOffer: false,
        },
    };
}
