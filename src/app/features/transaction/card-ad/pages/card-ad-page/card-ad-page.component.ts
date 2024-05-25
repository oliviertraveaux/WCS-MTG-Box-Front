import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { Offer } from '../../../../../shared/offer/models/offer.model';
import { CardAdInfoComponent } from '../../components/card-ad-info/card-ad-info.component';
import { CardAdOngoingOffersComponent } from '../../components/card-ad-ongoing-offers/card-ad-ongoing-offers.component';
import { CardAdInfo } from '../../models/card-ad.info';
import { CardAdStatesService } from '../../shared/services/card-ad-states.service';
import { CardAdService } from '../../shared/services/card-ad.service';

@Component({
    selector: 'app-card-ad-page',
    standalone: true,
    imports: [
        CommonModule,
        CardAdInfoComponent,
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
    cardAdService = inject(CardAdService);
    cardAdStatesService = inject(CardAdStatesService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    isNotfound: boolean = false;

    cardAd$!: Observable<CardAdInfo>;
    cardAdOffers$: Observable<Offer[]> = this.cardAdStatesService.getCardAdOffer$();
    isLoading$: Observable<boolean> = this.cardAdStatesService.getIsLoading$();
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.cardAd$ = this.cardAdService.getCardAd(parseInt(id)).pipe(
            tap({
                error: () =>
                    this.router.navigate(['page-not-found'], {
                        skipLocationChange: true,
                    }),
            })
        );

        this.cardAdService.getCardAdOffers(parseInt(id));
    }

    onMakeAnOffer() {
        console.log('make an offer');
    }
}
