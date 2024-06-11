import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GetQualityAbbreviationPipe } from '../../../../../../shared/collection/pipes/get-quality-abbreviation.pipe';
import { UserInfo } from '../../../../../../shared/user/models/user-info.interface';
import { CardAdCardInfoComponent } from '../../../../card-ad/components/card-ad-card-info/card-ad-card-info.component';
import { CardAdInfo } from '../../../../card-ad/models/card-ad-info';

@Component({
    selector: 'app-offer-create-info-bar',
    standalone: true,
    imports: [CommonModule, GetQualityAbbreviationPipe, RouterLink, TranslateModule],
    templateUrl: './offer-create-info-bar.component.html',
    styleUrls: ['./offer-create-info-bar.component.scss'],
})
export class OfferCreateInfoBarComponent {
    private _dialog = inject(MatDialog);
    @Input({ required: true }) cardAd!: CardAdInfo | null;
    @Input({ required: true }) cardOwner!: UserInfo | null;

    openCardAdInfoDialog(): void {
        let dialogRef = this._dialog.open(CardAdCardInfoComponent, {
            width: '50%',
        });
        let instance = dialogRef.componentInstance;
        instance.cardAdInfo = this.cardAd!;
    }
}
