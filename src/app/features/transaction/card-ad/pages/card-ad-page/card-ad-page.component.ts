import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { CardAdInfoComponent } from '../../components/card-ad-info/card-ad-info.component';
import { CardAdInfo } from '../../models/card-ad.info';
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
    ],
    templateUrl: './card-ad-page.component.html',
    styleUrls: ['./card-ad-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAdPageComponent {
    cardAdService = inject(CardAdService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    isNotfound: boolean = false;

    cardAd$!: Observable<CardAdInfo>;

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
    }

    onMakeAnOffer() {
        console.log('make an offer');
    }
}
