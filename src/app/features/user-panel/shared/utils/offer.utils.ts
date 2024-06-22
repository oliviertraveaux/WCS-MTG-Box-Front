import { UserCard } from '../../../../shared/collection/models/user-card.model';
import { OfferFullWantedCard } from '../../../../shared/offer/models/offer-full-wanted-card.model';
import { Offer } from '../../../../shared/offer/models/offer.model';
import { UserInfo } from '../../../../shared/user/models/user-info.interface';
import { UserCardOnMarket } from '../../../home/models/home-search-results.model';
import { CardAdInfo } from '../../../transaction/card-ad/models/card-ad-info';

export const fromOfferFullWantedCardToOffer = (offerFull: OfferFullWantedCard): Offer => {
    const { wantedUserCard, ...rest } = offerFull;
    const offer: Offer = {
        ...rest,
        wantedUserCardId: Number(wantedUserCard.cardInfo.uniqueId),
    };
    return offer;
};

export const fromUserCardToAdCardInfo = (userCard: UserCard, userInfo: UserInfo): CardAdInfo => {
    return {
        name: userCard.cardInfo.name,
        frenchName: userCard.cardInfo.frenchName,
        imageUrl: userCard.cardInfo.imageUrl,
        frenchImageUrl: userCard.cardInfo.frenchImageUrl,
        setName: userCard.cardInfo.setName,
        setAbbreviation: userCard.cardInfo.setAbbreviation,
        rarity: userCard.cardInfo.rarity,
        artist: userCard.cardInfo.artist,
        text: userCard.cardInfo.text,
        userCard: {
            userId: userCard.userInfo.userId,
            userName: userInfo.username,
            city: userInfo.city,
            qualityName: userCard.userInfo.qualityName,
            languageName: userCard.userInfo.languageName,
            department: userInfo.department,
        } as unknown as UserCardOnMarket,
    } as CardAdInfo;
};
