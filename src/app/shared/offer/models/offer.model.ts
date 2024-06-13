import { OfferBase } from './offer-base.model';

export interface Offer extends OfferBase {
    wantedUserCardId: number;
}
