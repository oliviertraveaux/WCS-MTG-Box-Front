import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { GetQualityClassPipe } from '../../../../../../shared/collection/pipes/get-quality.pipe';
import { GetRarityClassPipe } from '../../../../../../shared/collection/pipes/get-rarity-class.pipe';
import { Offer } from '../../../../../../shared/offer/models/offer.model';

@Component({
    selector: 'app-card-ad-offer-mobile',
    standalone: true,
    imports: [
        CommonModule,
        NgOptimizedImage,
        MatButtonModule,
        TranslateModule,
        MatIconModule,
        GetRarityClassPipe,
        MatListModule,
        GetQualityClassPipe,
    ],
    templateUrl: './card-ad-offer-mobile.component.html',
    styleUrls: ['./card-ad-offer-mobile.component.scss'],
    animations: [
        trigger('changeCard', [
            state('moveRight', style({ transform: 'translateX(0%)' })),
            state('moveLeft', style({ transform: 'translateX(0%)' })),
            transition('void => moveRight', [
                style({ transform: 'translateX(-100%)' }),
                animate('300ms', style({ transform: 'translateX(0%)' })),
            ]),
            transition('void => moveLeft', [
                style({ transform: 'translateX(100%)' }),
                animate('300ms', style({ transform: 'translateX(0%)' })),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdOfferMobileComponent {
    @Input() offerCards!: Offer;
    cards!: UserCard[];
    card!: UserCard;
    cardIndex: number = 0;
    moveRight: boolean = true;

    ngOnInit() {
        this.cards = this.offerCards.userCards;
    }

    onShowPreviousCard() {
        if (this.cardIndex > 0) {
            this.cardIndex--;
        } else this.cardIndex = this.cards.length - 1;
        this.moveRight = false;
    }

    onShowNextCard() {
        if (this.cardIndex < this.cards.length - 1) {
            this.cardIndex++;
        } else this.cardIndex = 0;
        this.moveRight = true;
    }
}
