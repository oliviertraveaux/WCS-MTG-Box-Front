import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CardAdCardInfoComponent } from '../../../transaction/card-ad/components/card-ad-card-info/card-ad-card-info.component';
import { CardAdInfo } from '../../../transaction/card-ad/models/card-ad-info';
import { CardAdOfferDesktopComponent } from '../../../transaction/offer/components/card-ad-offer/card-ad-offer-desktop/card-ad-offer-desktop.component';
import { CardAdOfferMobileComponent } from '../../../transaction/offer/components/card-ad-offer/card-ad-offer-mobile/card-ad-offer-mobile.component';

@Component({
    selector: 'app-offer-wanted-card-modal',
    standalone: true,
    imports: [
        CommonModule,
        CardAdOfferDesktopComponent,
        CardAdOfferMobileComponent,
        MatIconModule,
        MatDialogModule,
        CardAdCardInfoComponent,
        TranslateModule,
    ],
    templateUrl: './offer-wanted-card-modal.component.html',
    styleUrls: ['./offer-wanted-card-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferWantedCardModalComponent {

  private readonly dialogRef = inject( MatDialogRef<OfferWantedCardModalComponent>)

    @Input() cardAdInfo!: CardAdInfo;

    onClose() {
        this.dialogRef.close();
    }
}
