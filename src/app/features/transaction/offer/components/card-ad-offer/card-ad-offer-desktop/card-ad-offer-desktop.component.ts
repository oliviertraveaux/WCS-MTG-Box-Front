import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { Offer } from '../../../../../../shared/offer/models/offer.model';
import { CardAdCardInfoComponent } from '../../../../card-ad/components/card-ad-card-info/card-ad-card-info.component';
import { userCardToCardAdInfo } from '../../../../utils/mapper';

@Component({
    selector: 'app-card-ad-offer-desktop',
    standalone: true,
    imports: [CommonModule, CardAdCardInfoComponent, NgOptimizedImage],
    templateUrl: './card-ad-offer-desktop.component.html',
    styleUrls: ['./card-ad-offer-desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdOfferDesktopComponent {
    @Input() offerCards!: Offer;
    cards!: UserCard[];
    card!: UserCard;
    cardIndex: number = 0;

    ngOnInit() {
        this.cards = this.offerCards.userCards;
        this.card = this.cards[this.cardIndex];
    }

    protected readonly userCardToCardAd = userCardToCardAdInfo;

    showCardInfo(i: number) {
        this.cardIndex = i;
        this.card = this.cards[i];
    }
}
