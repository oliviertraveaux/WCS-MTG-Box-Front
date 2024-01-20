import { CardQualityEnum } from '@shared';
import { CardApi } from '../../../features/collection/models/card-api.model';

export interface Card extends CardApi {
    uniqueId: string;
    quality: CardQualityEnum | undefined;
}
