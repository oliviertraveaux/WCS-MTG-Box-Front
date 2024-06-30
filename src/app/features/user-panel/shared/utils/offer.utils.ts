import { OfferFullWantedCard } from '../../../../shared/offer/models/offer-full-wanted-card.model';
import { OfferWantedUserCard } from '../../../../shared/offer/models/offer-wanted-user-card.model';
import { Offer } from '../../../../shared/offer/models/offer.model';
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

export const fromUserCardToAdCardInfo = (userCard: OfferWantedUserCard): CardAdInfo => {
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
            userName: userCard.userInfo.userName,
            city: userCard.userInfo.city,
            quality: userCard.userInfo.qualityName,
            language: userCard.userInfo.languageName,
            department: userCard.userInfo.department,
        } as unknown as UserCardOnMarket,
    } as CardAdInfo;
};
