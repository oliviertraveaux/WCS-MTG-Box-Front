import { OfferBase } from './offer-base.model';
import { OfferWantedUserCard } from './offer-wanted-user-card.model';

export interface OfferFullWantedCard extends OfferBase {
    wantedUserCard: OfferWantedUserCard;
}
