import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Offer } from '../../../../shared/offer/models/offer.model';
import { BreakpointObserverService } from '../../../../shared/services/breakpoint-observer.service';
import { CardAdOfferDesktopComponent } from '../../../transaction/offer/components/card-ad-offer/card-ad-offer-desktop/card-ad-offer-desktop.component';
import { CardAdOfferMobileComponent } from '../../../transaction/offer/components/card-ad-offer/card-ad-offer-mobile/card-ad-offer-mobile.component';

@Component({
    selector: 'offer-details-modal',
    standalone: true,
    imports: [
        MatDialogModule,
        CardAdOfferDesktopComponent,
        CommonModule,
        CardAdOfferMobileComponent,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
    ],
    templateUrl: './offer-details-modal.component.html',
    styleUrls: ['./offer-details-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDetailsModalComponent {
    public readonly isDesktop = inject(BreakpointObserverService).isDesktop;
    public data: { offer: Offer } = inject(MAT_DIALOG_DATA);
    constructor(public dialogRef: MatDialogRef<OfferDetailsModalComponent>) {}

    onClose() {
        this.dialogRef.close();
    }
}
