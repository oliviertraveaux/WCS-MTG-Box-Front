import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardAdInfo } from '../../models/card-ad.info';
import { CardAdRepositoryService } from '../repositories/card-ad.repository.service';

@Injectable({
    providedIn: 'root',
})
export class CardAdService {
    cardAdRepositoryService = inject(CardAdRepositoryService);

    getCardAd(id: number): Observable<CardAdInfo> {
        return this.cardAdRepositoryService.getCardAd(id);
    }
}
