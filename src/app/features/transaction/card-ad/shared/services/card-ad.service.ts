import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { OfferRepositoryService } from '../../../../../shared/offer/repository/offer.repository.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { CardAdInfo } from '../../models/card-ad.info';
import { CardAdRepositoryService } from '../repositories/card-ad.repository.service';
import { CardAdStatesService } from './card-ad-states.service';

@Injectable({
    providedIn: 'root',
})
export class CardAdService {
    private cardAdRepositoryService = inject(CardAdRepositoryService);
    private offerRepositoryService = inject(OfferRepositoryService);
    private cardAdStatesService = inject(CardAdStatesService);
    private _alertService = inject(AlertService);
    private _translate = inject(TranslateService);

    getCardAd(id: number): Observable<CardAdInfo> {
        return this.cardAdRepositoryService.getCardAd(id);
    }

    getCardAdOffers(id: number): void {
        this.cardAdStatesService.setIsLoading(true);
        this.offerRepositoryService.getCardAdOffers(id).subscribe({
            next: (offers) => {
                this.cardAdStatesService.setCardAdOffer(offers);
                this.cardAdStatesService.setIsLoading(false);
            },
            error: (err) => {
                this.cardAdStatesService.setIsLoading(false);
                this._alertService.openSnackBar(
                    this._translate.instant('home.toast.search-cards-error'),
                    SnackbarStatus.error
                );
            },
        });
    }
}
