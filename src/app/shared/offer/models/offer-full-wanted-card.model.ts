import { UserCard } from '../../collection/models/user-card.model';
import { OfferBase } from './offer-base.model';

export interface OfferFullWantedCard extends OfferBase {
    wantedUserCard: UserCard;
}
