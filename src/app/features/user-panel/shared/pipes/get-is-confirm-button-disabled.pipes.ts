import { Pipe, PipeTransform } from '@angular/core';
import { OfferStatus } from '../../../../shared/offer/enums/offer-status.enum';

@Pipe({
    standalone: true,
    name: 'getIsConfirmButtonDisabled',
})
export class GetIsConfirmButtonDisabledPipe implements PipeTransform {
    transform(offerStatus: OfferStatus): boolean {
        switch (offerStatus) {
            case OfferStatus.accepted:
                return false;
            case OfferStatus.pending:
                return true;
            default:
                return true;
        }
    }
}
