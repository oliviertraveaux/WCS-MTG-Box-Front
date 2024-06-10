import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { Offer } from '../../../../../shared/offer/models/offer.model';
import { CardAdCardInfoComponent } from '../../components/card-ad-card-info/card-ad-card-info.component';
import { CardAdOngoingOffersComponent } from '../../components/card-ad-ongoing-offers/card-ad-ongoing-offers.component';
import { CardAdInfo } from '../../models/card-ad-info';
import { CardAdStatesService } from '../../shared/services/card-ad-states.service';
import { CardAdService } from '../../shared/services/card-ad.service';

@Component({
    selector: 'app-card-ad-page',
    standalone: true,
    imports: [
        CommonModule,
        CardAdCardInfoComponent,
        MatButtonModule,
        TranslateModule,
        MatProgressSpinnerModule,
        CardAdOngoingOffersComponent,
    ],
    templateUrl: './card-ad-page.component.html',
    styleUrls: ['./card-ad-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdPageComponent {
    private _cardAdService = inject(CardAdService);
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);
    private _cardAdStatesService = inject(CardAdStatesService);
    isNotfound: boolean = false;

    cardAd$!: Observable<CardAdInfo>;
    cardAdOffers$: Observable<Offer[]> = this._cardAdStatesService.getCardAdOffer$();
    isLoading$: Observable<boolean> = this._cardAdStatesService.getIsLoading$();
    ngOnInit() {
        const id = this._route.snapshot.paramMap.get('id')!;
        this.cardAd$ = this._cardAdService.getCardAd(parseInt(id)).pipe(
            tap({
                error: () =>
                    this._router.navigate(['page-not-found'], {
                        skipLocationChange: true,
                    }),
            })
        );

        this._cardAdService.getCardAdOffers(parseInt(id));
    }

    onMakeAnOffer() {
        this._router.navigate(['make-offer'], { relativeTo: this._route });
    }
}
