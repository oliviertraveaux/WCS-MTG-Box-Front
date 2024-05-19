import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetQualityAbbreviationPipe } from '../../../../../../shared/collection/pipes/get-quality-abbreviation.pipe';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';
import { CardAdInfo } from '../../../../card-ad/models/card-ad.info';

@Component({
    selector: 'app-offer-create-info-bar',
    standalone: true,
    imports: [CommonModule, GetQualityAbbreviationPipe, RouterLink],
    templateUrl: './offer-create-info-bar.component.html',
})
export class OfferCreateInfoBarComponent {
    @Input({ required: true }) cardAd!: CardAdInfo | null;
    @Input({ required: true }) cardOwner!: UserInfo | null;

    public link = `card-ad/${this.cardAd?.cardId}`;
}
