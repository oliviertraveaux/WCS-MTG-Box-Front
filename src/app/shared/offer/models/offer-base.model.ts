import { UserCard } from '../../collection/models/user-card.model';
import { OfferStatus } from '../enums/offer-status.enum';

export interface OfferBase {
    id: number;
    userId: number;
    userName: string;
    city: string;
    department: number;
    status: OfferStatus;
    createdDate: Date;
    lastModificationDate: Date;
    userCards: UserCard[];
}
