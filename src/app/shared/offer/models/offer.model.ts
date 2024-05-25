import { UserCard } from '../../collection/models/user-card.model';
import { OfferStatus } from '../enums/offer-status.enum';

export interface Offer {
    id: number;
    wantedUserCardId: number;
    userId: number;
    userName: string;
    city: string;
    department: number;
    status: OfferStatus;
    createdDate: Date;
    acceptedDate: Date | null;
    userCards: UserCard[];
}
